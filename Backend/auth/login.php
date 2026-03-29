<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['username', 'password']);

$pdo  = get_db();
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
$stmt->execute([$body['username']]);
$user = $stmt->fetch();

if (!$user || !password_verify($body['password'], $user['password_hash'])) {
    send_error('Invalid username or password', 401);
}

// Simple token — replace with JWT in production
$token = bin2hex(random_bytes(32));

log_audit($pdo, $user['user_id'], 'LOGIN');

send_success([
    'token' => $token,
    'user'  => [
        'user_id'  => $user['user_id'],
        'username' => $user['username'],
        'role'     => $user['role'],
    ],
], 'Login successful');
