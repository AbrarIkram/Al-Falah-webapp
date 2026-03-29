<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['user_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ?");
$stmt->execute([$body['user_id']]);
if ($stmt->rowCount() === 0) send_error('User not found', 404);

log_audit($pdo, $body['deleted_by'] ?? 0, 'DELETE_USER', 'users', $body['user_id']);
send_success(null, 'User deleted');
