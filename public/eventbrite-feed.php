<?php
/**
 * Same-origin proxy for a public Eventbrite organizer's upcoming events.
 *
 * Eventbrite's public API no longer lists events by organizer and its pages send
 * no CORS headers. The organizer profile page embeds its events as JSON
 * (__NEXT_DATA__), so we fetch the page server-side and return just the
 * `upcomingEvents` array as JSON.
 *
 * Usage: eventbrite-feed.php?organizer=22780790031
 * Only numeric organizer ids are accepted, so this cannot be used as an open proxy.
 */

header('Content-Type: application/json; charset=utf-8');

$organizer = isset($_GET['organizer']) ? (string) $_GET['organizer'] : '';
if (!preg_match('/^\d{5,20}$/', $organizer)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid organizer id']);
    exit;
}

$url = 'https://www.eventbrite.com/o/' . $organizer;
$ua = 'Mozilla/5.0 (compatible; SlowFoodChicagoSite/1.0)';
$html = false;
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
        CURLOPT_USERAGENT => $ua,
        CURLOPT_ENCODING => '',
    ]);
    $html = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => ['timeout' => 15, 'header' => "User-Agent: $ua\r\n", 'ignore_errors' => true],
    ]);
    $html = @file_get_contents($url, false, $context);
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
}

$events = null;
if (
    $html !== false &&
    $status === 200 &&
    preg_match('#<script id="__NEXT_DATA__"[^>]*>(.*?)</script>#s', $html, $m)
) {
    $data = json_decode($m[1], true);
    if (isset($data['props']['pageProps']['upcomingEvents']) && is_array($data['props']['pageProps']['upcomingEvents'])) {
        $events = $data['props']['pageProps']['upcomingEvents'];
    }
}

if ($events === null) {
    http_response_code(502);
    echo json_encode(['error' => 'Could not read Eventbrite events']);
    exit;
}

header('Cache-Control: public, max-age=300');
echo json_encode($events);
