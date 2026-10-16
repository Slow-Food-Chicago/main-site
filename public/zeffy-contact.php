<?php
/**
 * Handles the footer "Subscribe to Updates" form by creating/updating a contact
 * in Zeffy (PUT https://api.zeffy.com/api/v1/contacts).
 *
 * Expects a JSON POST body: { "email": "...", "first_name": "...", "last_name": "..." }
 * Responds with JSON: { "ok": true } or { "ok": false, "error": "..." }.
 *
 * The Zeffy API token is a secret and must NOT be committed. Provide it either as the
 * ZEFFY_API_TOKEN environment variable, or in a file one directory ABOVE the web root
 * named zeffy-config.php that returns the token:
 *
 *     <?php return 'your-secret-token';
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Load the API token (env var first, then config file outside the web root)
$token = getenv('ZEFFY_API_TOKEN') ?: '';
if ($token === '') {
    $configFile = dirname(__DIR__) . '/zeffy-config.php';
    if (is_readable($configFile)) {
        $token = (string) include $configFile;
    }
}
if ($token === '') {
    error_log('zeffy-contact.php: ZEFFY_API_TOKEN is not configured');
    respond(500, ['ok' => false, 'error' => 'Subscription is not configured']);
}

// Parse + validate input
$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}

$email = trim((string) ($input['email'] ?? ''));
$firstName = trim((string) ($input['first_name'] ?? ''));
$lastName = trim((string) ($input['last_name'] ?? ''));

if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'Please enter a valid email address']);
}
if (strlen($firstName) > 100 || strlen($lastName) > 100) {
    respond(400, ['ok' => false, 'error' => 'Name is too long']);
}

$payload = ['email' => $email];
if ($firstName !== '') {
    $payload['first_name'] = $firstName;
}
if ($lastName !== '') {
    $payload['last_name'] = $lastName;
}

// Create/update the contact in Zeffy
$ch = curl_init('https://api.zeffy.com/api/v1/contacts');
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => 'PUT',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
]);
$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    // Log details server-side only; never leak the upstream response to the client
    error_log(sprintf('zeffy-contact.php: Zeffy API failed (status %d) %s %s', $status, $curlError, (string) $response));
    respond(502, ['ok' => false, 'error' => 'Could not complete your subscription. Please try again later.']);
}

respond(200, ['ok' => true]);