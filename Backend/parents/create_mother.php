<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO mothers
        (student_id, name, nic_no, mobile_no, whatsapp_no, single_mother, status, income_sources, job)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        name           = VALUES(name),
        nic_no         = VALUES(nic_no),
        mobile_no      = VALUES(mobile_no),
        whatsapp_no    = VALUES(whatsapp_no),
        single_mother  = VALUES(single_mother),
        status         = VALUES(status),
        income_sources = VALUES(income_sources),
        job            = VALUES(job)
")->execute([
    $body['student_id'],
    $body['name']           ?? null,
    $body['nic_no']         ?? null,
    $body['mobile_no']      ?? null,
    $body['whatsapp_no']    ?? null,
    $body['single_mother']  ?? 0,
    $body['status']         ?? null,
    $body['income_sources'] ?? null,
    $body['job']            ?? null,
]);

log_audit($pdo, $body['user_id'] ?? 0, 'UPSERT_MOTHER', 'mothers', $body['student_id'], null, $body);
send_success(null, 'Mother record saved');
