<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO guardians (student_id, full_name, nic_no, mobile_no, whatsapp_no, job, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        full_name   = VALUES(full_name),
        nic_no      = VALUES(nic_no),
        mobile_no   = VALUES(mobile_no),
        whatsapp_no = VALUES(whatsapp_no),
        job         = VALUES(job),
        status      = VALUES(status)
")->execute([
    $body['student_id'],
    $body['full_name']   ?? null,
    $body['nic_no']      ?? null,
    $body['mobile_no']   ?? null,
    $body['whatsapp_no'] ?? null,
    $body['job']         ?? null,
    $body['status']      ?? null,
]);

log_audit($pdo, $body['user_id'] ?? 0, 'UPSERT_GUARDIAN', 'guardians', $body['student_id'], null, $body);
send_success(null, 'Guardian record saved');
