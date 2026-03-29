<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM teachers WHERE teacher_id = ?");
$stmt->execute([$body['teacher_id']]);
if ($stmt->rowCount() === 0) send_error('Teacher not found', 404);

log_audit($pdo, $body['user_id'] ?? 0, 'DELETE_TEACHER', 'teachers', $body['teacher_id']);
send_success(null, 'Teacher deleted');
