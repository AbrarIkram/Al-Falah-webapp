<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO teacher_spouse (teacher_id, name, job, phone_number, address)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        name         = VALUES(name),
        job          = VALUES(job),
        phone_number = VALUES(phone_number),
        address      = VALUES(address)
")->execute([
    $body['teacher_id'],
    $body['name']         ?? null,
    $body['job']          ?? null,
    $body['phone_number'] ?? null,
    $body['address']      ?? null,
]);

send_success(null, 'Spouse record saved');
