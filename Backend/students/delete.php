<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM students WHERE student_id = ?");
$stmt->execute([$body['student_id']]);
if ($stmt->rowCount() === 0) send_error('Student not found', 404);

log_audit($pdo, $body['user_id'] ?? 0, 'DELETE_STUDENT', 'students', $body['student_id']);
send_success(null, 'Student deleted');
