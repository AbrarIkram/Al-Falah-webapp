<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['user_id', 'new_password']);

if (strlen($body['new_password']) < 6) {
    send_error('Password must be at least 6 characters');
}

$pdo  = get_db();
$hash = password_hash($body['new_password'], PASSWORD_BCRYPT);
$stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE user_id = ?");
$stmt->execute([$hash, $body['user_id']]);
if ($stmt->rowCount() === 0) send_error('User not found', 404);

log_audit($pdo, $body['reset_by'] ?? 0, 'RESET_PASSWORD', 'users', $body['user_id']);
send_success(null, 'Password reset successfully');
