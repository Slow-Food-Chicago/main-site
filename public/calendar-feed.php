<?php
/**
 * Same-origin proxy for the public Google Calendar iCal feed.
 *
 * Google's .ics endpoint does not send CORS headers, so browsers cannot fetch it
 * directly. The site requests this script instead (same origin), and it fetches
 * the feed server-side, expands recurring events (RRULE), and filters to all
 * events occurring within the next two months.
 *
 * Only https://calendar.google.com/calendar/ical/*.ics URLs are allowed, so this
 * cannot be abused as an open proxy.
 */

$url = isset($_GET['url']) ? (string) $_GET['url'] : '';
$parts = parse_url($url);

if (
    !$parts ||
    ($parts['scheme'] ?? '') !== 'https' ||
    ($parts['host'] ?? '') !== 'calendar.google.com' ||
    isset($parts['port']) ||
    strpos($parts['path'] ?? '', '/calendar/ical/') !== 0 ||
    substr($parts['path'], -4) !== '.ics'
) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Invalid calendar feed URL';
    exit;
}

$body = false;
$status = 0;

if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: text/calendar, text/plain, */*'],
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => ['timeout' => 10, 'follow_location' => 1, 'max_redirects' => 3, 'ignore_errors' => true],
    ]);
    $body = @file_get_contents($url, false, $context);
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
}

if ($body === false || $status !== 200 || strpos($body, 'BEGIN:VCALENDAR') === false) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Could not fetch calendar feed';
    exit;
}

/**
 * Parse an ICS date property line (e.g. DTSTART;TZID=America/Chicago:20261020T100000).
 *
 * @return array{dt: DateTimeImmutable, isAllDay: bool, tz: DateTimeZone, isUtc: bool}|null
 */
function sfc_parse_ics_date_prop(string $line, DateTimeZone $defaultTz): ?array
{
    $colonPos = strpos($line, ':');
    if ($colonPos === false) {
        return null;
    }
    $meta = substr($line, 0, $colonPos);
    $val = trim(substr($line, $colonPos + 1));

    $tz = $defaultTz;
    if (preg_match('/TZID=([^;:]+)/i', $meta, $m)) {
        try {
            $tz = new DateTimeZone($m[1]);
        } catch (Exception $e) {
            $tz = $defaultTz;
        }
    }

    if (stripos($meta, 'VALUE=DATE') !== false || preg_match('/^\d{8}$/', $val)) {
        $dt = DateTimeImmutable::createFromFormat('!Ymd', substr($val, 0, 8), $tz);
        if (!$dt) {
            return null;
        }
        return ['dt' => $dt, 'isAllDay' => true, 'tz' => $tz, 'isUtc' => false];
    }

    $isUtc = substr($val, -1) === 'Z';
    if ($isUtc) {
        $utcTz = new DateTimeZone('UTC');
        $dt = DateTimeImmutable::createFromFormat('Ymd\THis\Z', $val, $utcTz);
        if (!$dt) {
            return null;
        }
        return ['dt' => $dt, 'isAllDay' => false, 'tz' => $utcTz, 'isUtc' => true];
    }

    $dt = DateTimeImmutable::createFromFormat('Ymd\THis', substr($val, 0, 15), $tz);
    if (!$dt) {
        return null;
    }
    return ['dt' => $dt, 'isAllDay' => false, 'tz' => $tz, 'isUtc' => false];
}

/**
 * Format a DateTimeImmutable back into an ICS property line.
 */
function sfc_format_ics_date_prop(string $propName, DateTimeImmutable $dt, bool $isAllDay, bool $isUtc, DateTimeZone $tz): string
{
    if ($isAllDay) {
        return $propName . ';VALUE=DATE:' . $dt->setTimezone($tz)->format('Ymd');
    }
    if ($isUtc) {
        return $propName . ':' . $dt->setTimezone(new DateTimeZone('UTC'))->format('Ymd\THis\Z');
    }
    return $propName . ';TZID=' . $tz->getName() . ':' . $dt->setTimezone($tz)->format('Ymd\THis');
}

/**
 * Filter VCALENDAR data to events occurring within the next two months,
 * expanding RRULE recurring events into individual VEVENT occurrences.
 */
function sfc_filter_ics_two_months(string $ics): string
{
    $unfolded = preg_replace("/\r\n[ \t]|\r[ \t]|\n[ \t]/", '', $ics);
    $lines = preg_split("/\r\n|\r|\n/", (string) $unfolded);

    $calTzName = 'America/Chicago';
    foreach ($lines as $line) {
        if (stripos($line, 'X-WR-TIMEZONE:') === 0) {
            $candidate = trim(substr($line, strlen('X-WR-TIMEZONE:')));
            if ($candidate !== '') {
                $calTzName = $candidate;
            }
            break;
        }
    }
    try {
        $calTz = new DateTimeZone($calTzName);
    } catch (Exception $e) {
        $calTz = new DateTimeZone('America/Chicago');
    }

    $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    $windowEnd = $now->modify('+2 months');

    $headerLines = [];
    $rawEvents = [];
    $inEvent = false;
    $currentLines = [];

    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '') {
            continue;
        }
        if ($trimmed === 'BEGIN:VEVENT') {
            $inEvent = true;
            $currentLines = [];
            continue;
        }
        if ($trimmed === 'END:VEVENT') {
            $inEvent = false;
            $rawEvents[] = $currentLines;
            $currentLines = [];
            continue;
        }
        if ($inEvent) {
            $currentLines[] = $line;
        } elseif ($trimmed !== 'END:VCALENDAR') {
            $headerLines[] = $line;
        }
    }

    // Track RECURRENCE-ID overrides so expanded RRULE instances do not duplicate modified occurrences
    $recurrenceOverrides = [];
    foreach ($rawEvents as $evLines) {
        $uid = '';
        $recIdTs = null;
        foreach ($evLines as $l) {
            if (stripos($l, 'UID:') === 0) {
                $uid = trim(substr($l, 4));
            } elseif ( preg_match('/^RECURRENCE-ID(?:;[^:]*)?:/i', $l)) {
                $parsed = sfc_parse_ics_date_prop($l, $calTz);
                if ($parsed) {
                    $recIdTs = $parsed['dt']->getTimestamp();
                }
            }
        }
        if ($uid !== '' && $recIdTs !== null) {
            $recurrenceOverrides[$uid][$recIdTs] = true;
        }
    }

    $outputEvents = [];
    $dayMap = ['SU' => 0, 'MO' => 1, 'TU' => 2, 'WE' => 3, 'TH' => 4, 'FR' => 5, 'SA' => 6];

    foreach ($rawEvents as $evLines) {
        $dtStartInfo = null;
        $dtEndInfo = null;
        $rruleStr = null;
        $uid = '';
        $status = '';
        $exdates = [];
        $otherLines = [];

        foreach ($evLines as $l) {
            if (preg_match('/^DTSTART(?:;[^:]*)?:/i', $l)) {
                $dtStartInfo = sfc_parse_ics_date_prop($l, $calTz);
            } elseif (preg_match('/^DTEND(?:;[^:]*)?:/i', $l)) {
                $dtEndInfo = sfc_parse_ics_date_prop($l, $calTz);
            } elseif (stripos($l, 'RRULE:') === 0) {
                $rruleStr = trim(substr($l, 6));
            } elseif (preg_match('/^EXDATE(?:;[^:]*)?:/i', $l)) {
                $colonPos = strpos($l, ':');
                $meta = substr($l, 0, (int) $colonPos);
                $vals = explode(',', substr($l, (int) $colonPos + 1));
                foreach ($vals as $v) {
                    $parsedEx = sfc_parse_ics_date_prop($meta . ':' . trim($v), $calTz);
                    if ($parsedEx) {
                        $exdates[$parsedEx['dt']->getTimestamp()] = true;
                    }
                }
            } else {
                if (stripos($l, 'UID:') === 0) {
                    $uid = trim(substr($l, 4));
                } elseif (stripos($l, 'STATUS:') === 0) {
                    $status = strtoupper(trim(substr($l, 7)));
                }
                $otherLines[] = $l;
            }
        }

        if ($status === 'CANCELLED' || !$dtStartInfo) {
            continue;
        }

        $startDt = $dtStartInfo['dt'];
        $isAllDay = $dtStartInfo['isAllDay'];
        $isUtc = $dtStartInfo['isUtc'];
        $evTz = $dtStartInfo['tz'];

        if ($dtEndInfo) {
            $endDt = $dtEndInfo['dt'];
        } else {
            $endDt = $isAllDay ? $startDt->modify('+1 day') : $startDt->modify('+1 hour');
        }

        $durationSeconds = max(0, $endDt->getTimestamp() - $startDt->getTimestamp());

        if ($rruleStr === null) {
            if ($endDt >= $now && $startDt <= $windowEnd) {
                $outputEvents[] = $evLines;
            }
            continue;
        }

        // Parse RRULE parameters
        $rruleParts = [];
        foreach (explode(';', $rruleStr) as $part) {
            $kv = explode('=', $part, 2);
            if (count($kv) === 2) {
                $rruleParts[strtoupper(trim($kv[0]))] = strtoupper(trim($kv[1]));
            }
        }

        $freq = $rruleParts['FREQ'] ?? '';
        $interval = isset($rruleParts['INTERVAL']) ? max(1, (int) $rruleParts['INTERVAL']) : 1;
        $maxCount = isset($rruleParts['COUNT']) ? (int) $rruleParts['COUNT'] : 1000;
        $untilDt = null;
        if (!empty($rruleParts['UNTIL'])) {
            $parsedUntil = sfc_parse_ics_date_prop('UNTIL:' . $rruleParts['UNTIL'], $evTz);
            if ($parsedUntil) {
                $untilDt = $parsedUntil['dt'];
            }
        }

        $localStart = $startDt->setTimezone($evTz);
        $occurrences = [];
        $count = 0;

        if ($freq === 'DAILY') {
            $cursor = $localStart;
            for ($step = 0; $step < 1000 && $count < $maxCount; $step++) {
                if ($untilDt && $cursor > $untilDt) {
                    break;
                }
                if ($cursor > $windowEnd) {
                    break;
                }
                $occurrences[] = $cursor;
                $count++;
                $cursor = $cursor->modify('+' . $interval . ' days');
            }
        } elseif ($freq === 'WEEKLY') {
            $byDays = [];
            if (!empty($rruleParts['BYDAY'])) {
                foreach (explode(',', $rruleParts['BYDAY']) as $dCode) {
                    $code = substr(trim($dCode), -2);
                    if (isset($dayMap[$code])) {
                        $byDays[] = $dayMap[$code];
                    }
                }
            }
            if (empty($byDays)) {
                $byDays[] = (int) $localStart->format('w');
            }
            sort($byDays);

            $startDow = (int) $localStart->format('w');
            $weekBase = $localStart->modify('-' . $startDow . ' days');

            for ($week = 0; $week < 500 && $count < $maxCount; $week++) {
                $currentWeekStart = $week === 0 ? $weekBase : $weekBase->modify('+' . ($week * $interval) . ' weeks');
                if ($currentWeekStart > $windowEnd) {
                    break;
                }
                foreach ($byDays as $dow) {
                    $candidate = $currentWeekStart->modify('+' . $dow . ' days');
                    if ($candidate < $localStart) {
                        continue;
                    }
                    if ($untilDt && $candidate > $untilDt) {
                        break 2;
                    }
                    $count++;
                    if ($count > $maxCount) {
                        break 2;
                    }
                    if ($candidate > $windowEnd) {
                        break 2;
                    }
                    $occurrences[] = $candidate;
                }
            }
        } elseif ($freq === 'MONTHLY') {
            $byDay = $rruleParts['BYDAY'] ?? '';
            $byMonthDay = isset($rruleParts['BYMONTHDAY']) ? (int) $rruleParts['BYMONTHDAY'] : null;

            for ($mStep = 0; $mStep < 240 && $count < $maxCount; $mStep++) {
                $firstOfMonth = $localStart->modify('first day of this month')->modify('+' . ($mStep * $interval) . ' months');
                if ($firstOfMonth > $windowEnd) {
                    break;
                }
                $year = (int) $firstOfMonth->format('Y');
                $month = (int) $firstOfMonth->format('m');
                $hour = (int) $localStart->format('H');
                $minute = (int) $localStart->format('i');
                $second = (int) $localStart->format('s');

                $candidate = null;
                if ($byDay !== '' && preg_match('/^(-?\d+)([A-Z]{2})$/', $byDay, $bm) && isset($dayMap[$bm[2]])) {
                    $nth = (int) $bm[1];
                    $targetDow = $dayMap[$bm[2]];
                    $daysInMonth = (int) $firstOfMonth->format('t');
                    $matchingDays = [];
                    for ($d = 1; $d <= $daysInMonth; $d++) {
                        $testDate = $firstOfMonth->setDate($year, $month, $d)->setTime($hour, $minute, $second);
                        if ((int) $testDate->format('w') === $targetDow) {
                            $matchingDays[] = $testDate;
                        }
                    }
                    if ($nth > 0 && isset($matchingDays[$nth - 1])) {
                        $candidate = $matchingDays[$nth - 1];
                    } elseif ($nth < 0 && isset($matchingDays[count($matchingDays) + $nth])) {
                        $candidate = $matchingDays[count($matchingDays) + $nth];
                    }
                } else {
                    $targetDay = $byMonthDay ?? (int) $localStart->format('j');
                    $daysInMonth = (int) $firstOfMonth->format('t');
                    if ($targetDay <= $daysInMonth) {
                        $candidate = $firstOfMonth->setDate($year, $month, $targetDay)->setTime($hour, $minute, $second);
                    }
                }

                if (!$candidate || $candidate < $localStart) {
                    continue;
                }
                if ($untilDt && $candidate > $untilDt) {
                    break;
                }
                $count++;
                if ($count > $maxCount) {
                    break;
                }
                if ($candidate > $windowEnd) {
                    break;
                }
                $occurrences[] = $candidate;
            }
        } elseif ($freq === 'YEARLY') {
            $cursor = $localStart;
            for ($yStep = 0; $yStep < 50 && $count < $maxCount; $yStep++) {
                if ($untilDt && $cursor > $untilDt) {
                    break;
                }
                if ($cursor > $windowEnd) {
                    break;
                }
                $occurrences[] = $cursor;
                $count++;
                $cursor = $cursor->modify('+' . $interval . ' years');
            }
        }

        foreach ($occurrences as $occStart) {
            $occTs = $occStart->getTimestamp();
            if (isset($exdates[$occTs]) || ($uid !== '' && isset($recurrenceOverrides[$uid][$occTs]))) {
                continue;
            }
            $occEnd = $occStart->modify('+' . $durationSeconds . ' seconds');
            if ($occEnd < $now || $occStart > $windowEnd) {
                continue;
            }

            $instanceLines = [];
            foreach ($otherLines as $ol) {
                if (stripos($ol, 'UID:') === 0 && $uid !== '') {
                    $instanceLines[] = 'UID:' . $uid . '-' . $occTs;
                } else {
                    $instanceLines[] = $ol;
                }
            }
            $instanceLines[] = sfc_format_ics_date_prop('DTSTART', $occStart, $isAllDay, $isUtc, $evTz);
            $instanceLines[] = sfc_format_ics_date_prop('DTEND', $occEnd, $isAllDay, $isUtc, $evTz);
            $outputEvents[] = $instanceLines;
        }
    }

    $out = $headerLines;
    foreach ($outputEvents as $evLines) {
        $out[] = 'BEGIN:VEVENT';
        foreach ($evLines as $el) {
            $out[] = $el;
        }
        $out[] = 'END:VEVENT';
    }
    $out[] = 'END:VCALENDAR';

    return implode("\r\n", $out) . "\r\n";
}

header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo sfc_filter_ics_two_months($body);
