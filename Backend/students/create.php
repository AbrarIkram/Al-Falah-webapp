<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['full_name', 'grade', 'index_no', 'year_of_joining']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO students
        (serial_no, full_name, grade, index_no, permanent_address,
         grama_sevaka_division, date_of_batch, gender, permanent_disease,
         eligible_aswesuma, permanent_disease_note, year_of_joining, batch_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
")->execute([
    $body['serial_no']              ?? null,
    $body['full_name'],
    $body['grade'],
    $body['index_no'],
    $body['permanent_address']      ?? null,
    $body['grama_sevaka_division']  ?? null,
    $body['date_of_batch']          ?? null,
    $body['gender']                 ?? null,
    $body['permanent_disease']      ?? 0,
    $body['eligible_aswesuma']      ?? 0,
    $body['permanent_disease_note'] ?? null,
    $body['year_of_joining'],
    $body['batch_id']               ?? null,
]);

$id = (int)$pdo->lastInsertId();
log_audit($pdo, $body['user_id'] ?? 0, 'CREATE_STUDENT', 'students', $id, null, $body);
send_success(['student_id' => $id], 'Student created');
