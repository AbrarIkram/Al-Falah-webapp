<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['user_id']);

$pdo  = get_db();
$sets = []; $params = [];

if (!empty($body['username'])) {
    $sets[]   = 'username = ?';
    $params[] = $body['username'];
}
if (!empty($body['role'])) {
    if (!in_array($body['role'], ['admin', 'teacher', 'staff'])) {
        send_error('Invalid role. Must be admin, teacher, or staff');
    }
    $sets[]   = 'role = ?';
    $params[] = $body['role'];
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['user_id'];
$pdo->prepare("UPDATE users SET " . implode(', ', $sets) . " WHERE user_id = ?")->execute($params);

log_audit($pdo, $body['updated_by'] ?? 0, 'UPDATE_USER', 'users', $body['user_id']);
send_success(null, 'User updated');
