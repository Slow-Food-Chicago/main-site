<?php
/**
 * Same-origin proxy and parser for public Google Calendar iCal feeds.
 *
 * Google's .ics endpoint does not send CORS headers, so browsers cannot fetch it
 * directly. The site requests this script instead (same origin), and it fetches
 * the feed server-side, expands recurring events (RRULE), and returns the complete
 * list of events as JSON (or raw .ics if requested via format=ics).
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
        CURLOPT_TIMEOUT => 15,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; SlowFoodChicagoSite/1.0)',
        CURLOPT_HTTPHEADER => ['Accept: text/calendar, text/plain, */*'],
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => [
            'timeout' => 15,
            'follow_location' => 1,
            'max_redirects' => 3,
            'ignore_errors' => true,
            'header' => "User-Agent: Mozilla/5.0 (compatible; SlowFoodChicagoSite/1.0)\r\nAccept: text/calendar, text/plain, */*\r\n",
        ],
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

// If caller explicitly requested raw ICS, return it directly
if (isset($_GET['format']) && $_GET['format'] === 'ics') {
    header('Content-Type: text/calendar; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    echo $body;
    exit;
}

/**
 * Unescape special characters in ICS strings.
 */
function sfc_unescape_ics_text(string $text): string
{
    $text = str_replace(['\\n', '\\N'], "\n", $text);
    $text = str_replace('\\,', ',', $text);
    $text = str_replace('\\;', ';', $text);
    $text = str_replace('\\\\', '\\', $text);
    return $text;
}

/**
 * Determine category from event title and description.
 */
function sfc_infer_category(string $title, string $desc): string
{
    $combined = strtolower($title . ' ' . strip_tags($desc));
    if (
        strpos($combined, 'garden') !== false ||
        strpos($combined, 'preserve') !== false ||
        strpos($combined, 'harvest') !== false ||
        strpos($combined, 'compost') !== false
    ) {
        return 'garden';
    }
    if (
        strpos($combined, 'meeting') !== false ||
        strpos($combined, 'committee') !== false ||
        strpos($combined, 'council') !== false ||
        strpos($combined, 'board') !== false
    ) {
        return 'meeting';
    }
    if (
        strpos($combined, 'workshop') !== false ||
        strpos($combined, 'class') !== false ||
        strpos($combined, 'seed saving') !== false ||
        strpos($combined, 'bake') !== false
    ) {
        return 'workshop';
    }
    if (
        strpos($combined, 'swap') !== false ||
        strpos($combined, 'potluck') !== false ||
        strpos($combined, 'tasting') !== false ||
        strpos($combined, 'dinner') !== false ||
        strpos($combined, 'celebration') !== false
    ) {
        return 'gathering';
    }
    return 'other';
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
 * Parse all events from VCALENDAR data, expanding RRULE recurring events across
 * a generous multi-year window and returning all events (past, current, future).
 *
 * @return array<int, array{id: string, title: string, description: ?string, location: ?string, startDate: string, endDate: string, isAllDay: bool, category: string, url: ?string}>
 */
function sfc_parse_all_events(string $ics): array
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
    // Expand recurring events across a generous multi-year window
    $recurrencePastLimit = $now->modify('-1 year');
    $recurrenceFutureLimit = $now->modify('+2 years');

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
            } elseif (preg_match('/^RECURRENCE-ID(?:;[^:]*)?:/i', $l)) {
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

    $dayMap = ['SU' => 0, 'MO' => 1, 'TU' => 2, 'WE' => 3, 'TH' => 4, 'FR' => 5, 'SA' => 6];
    $events = [];

    // Helper to format DateTimeImmutable as ISO string
    $formatDateIso = function (DateTimeImmutable $dt, bool $allDay, DateTimeZone $tz): string {
        if ($allDay) {
            return $dt->setTimezone($tz)->format('Y-m-d');
        }
        return $dt->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d\TH:i:s\Z');
    };

    foreach ($rawEvents as $idx => $evLines) {
        $dtStartInfo = null;
        $dtEndInfo = null;
        $rruleStr = null;
        $uid = '';
        $summary = '';
        $description = '';
        $location = '';
        $urlProp = '';
        $status = '';
        $exdates = [];

        foreach ($evLines as $l) {
            $colonPos = strpos($l, ':');
            if ($colonPos === false) {
                continue;
            }
            $fullKey = substr($l, 0, $colonPos);
            $keyPart = strtoupper(trim(explode(';', $fullKey)[0]));
            $val = substr($l, $colonPos + 1);

            if ($keyPart === 'DTSTART') {
                $dtStartInfo = sfc_parse_ics_date_prop($l, $calTz);
            } elseif ($keyPart === 'DTEND') {
                $dtEndInfo = sfc_parse_ics_date_prop($l, $calTz);
            } elseif ($keyPart === 'RRULE') {
                $rruleStr = trim($val);
            } elseif ($keyPart === 'EXDATE') {
                $meta = $fullKey;
                $vals = explode(',', $val);
                foreach ($vals as $v) {
                    $parsedEx = sfc_parse_ics_date_prop($meta . ':' . trim($v), $calTz);
                    if ($parsedEx) {
                        $exdates[$parsedEx['dt']->getTimestamp()] = true;
                    }
                }
            } elseif ($keyPart === 'UID') {
                $uid = trim($val);
            } elseif ($keyPart === 'SUMMARY') {
                $summary = sfc_unescape_ics_text(trim($val));
            } elseif ($keyPart === 'DESCRIPTION') {
                $description = sfc_unescape_ics_text(trim($val));
            } elseif ($keyPart === 'LOCATION') {
                $location = sfc_unescape_ics_text(trim($val));
            } elseif ($keyPart === 'URL') {
                $urlProp = trim($val);
            } elseif ($keyPart === 'STATUS') {
                $status = strtoupper(trim($val));
            }
        }

        if ($status === 'CANCELLED' || !$dtStartInfo) {
            continue;
        }

        if ($uid === '') {
            $uid = 'event-' . $idx;
        }
        if ($summary === '') {
            $summary = 'Slow Food Chicago Event';
        }

        $startDt = $dtStartInfo['dt'];
        $isAllDay = $dtStartInfo['isAllDay'];
        $evTz = $dtStartInfo['tz'];

        if ($dtEndInfo) {
            $endDt = $dtEndInfo['dt'];
        } else {
            $endDt = $isAllDay ? $startDt->modify('+1 day') : $startDt->modify('+1 hour');
        }

        $durationSeconds = max(0, $endDt->getTimestamp() - $startDt->getTimestamp());

        // Non-recurring events: Return EVERYTHING (no cutoff!)
        if ($rruleStr === null) {
            $events[] = [
                'id' => $uid . '-' . $startDt->getTimestamp(),
                'title' => $summary,
                'description' => $description !== '' ? $description : null,
                'location' => $location !== '' ? $location : null,
                'startDate' => $formatDateIso($startDt, $isAllDay, $evTz),
                'endDate' => $formatDateIso($endDt, $isAllDay, $evTz),
                'isAllDay' => $isAllDay,
                'category' => sfc_infer_category($summary, $description),
                'url' => $urlProp !== '' ? $urlProp : null,
            ];
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
                if ($cursor > $recurrenceFutureLimit) {
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
                if ($currentWeekStart > $recurrenceFutureLimit) {
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
                    if ($candidate > $recurrenceFutureLimit) {
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
                if ($firstOfMonth > $recurrenceFutureLimit) {
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
                if ($candidate > $recurrenceFutureLimit) {
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
                if ($cursor > $recurrenceFutureLimit) {
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
            if ($occEnd < $recurrencePastLimit || $occStart > $recurrenceFutureLimit) {
                continue;
            }

            $events[] = [
                'id' => $uid . '-' . $occTs,
                'title' => $summary,
                'description' => $description !== '' ? $description : null,
                'location' => $location !== '' ? $location : null,
                'startDate' => $formatDateIso($occStart, $isAllDay, $evTz),
                'endDate' => $formatDateIso($occEnd, $isAllDay, $evTz),
                'isAllDay' => $isAllDay,
                'category' => sfc_infer_category($summary, $description),
                'url' => $urlProp !== '' ? $urlProp : null,
            ];
        }
    }

    usort($events, function ($a, $b) {
        return strcmp($a['startDate'], $b['startDate']);
    });

    return $events;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo json_encode(sfc_parse_all_events($body));
