<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['username', 'password', 'role']);

if (!in_array($body['role'], ['admin', 'teacher', 'staff'])) {
    send_error('Invalid role. Must be admin, teacher, or staff');
}

$pdo  = get_db();
$hash = password_hash($body['password'], PASSWORD_BCRYPT);
$pdo->prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)")
    ->execute([$body['username'], $hash, $body['role']]);

$id = (int)$pdo->lastInsertId();
log_audit($pdo, $body['created_by'] ?? 0, 'CREATE_USER', 'users', $id);
send_success(['user_id' => $id], 'User created');
