<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id', 'fee_type', 'academic_year', 'user_id']);

if (!in_array($body['fee_type'], ['FF', 'SDEC'])) {
    send_error('fee_type must be FF or SDEC');
}

$pdo  = get_db();
$stmt = $pdo->prepare("CALL mark_fee_paid(?, ?, ?, ?, ?)");
$stmt->execute([
    $body['student_id'],
    $body['fee_type'],
    $body['academic_year'],
    $body['user_id'],
    $body['notes'] ?? null,
]);

$result = $stmt->fetch();
send_success($result, 'Fee marked as paid');
