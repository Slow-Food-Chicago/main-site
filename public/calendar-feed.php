<?php
/**
 * Same-origin proxy for the public Google Calendar iCal feed.
 *
 * Google's .ics endpoint does not send CORS headers, so browsers cannot fetch it
 * directly. The site requests this script instead (same origin), and it fetches
 * the feed server-side.
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
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: text/calendar, text/plain, */*'],
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => ['timeout' => 10, 'follow_location' => 0, 'ignore_errors' => true],
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

header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo $body;
