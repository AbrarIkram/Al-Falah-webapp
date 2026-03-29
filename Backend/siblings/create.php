<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO siblings
        (student_id, full_name, school, educational_qualification, nic_no, job, physically_disable)
    VALUES (?, ?, ?, ?, ?, ?, ?)
")->execute([
    $body['student_id'],
    $body['full_name']                 ?? null,
    $body['school']                    ?? null,
    $body['educational_qualification'] ?? null,
    $body['nic_no']                    ?? null,
    $body['job']                       ?? null,
    $body['physically_disable']        ?? 0,
]);

send_success(['sibling_id' => (int)$pdo->lastInsertId()], 'Sibling created');
