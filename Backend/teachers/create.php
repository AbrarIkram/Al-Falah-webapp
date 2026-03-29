<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['full_name']);

$cols = [
    'full_name','name_with_initial','nic_no','employee_number','wop_number',
    'teacher_service_class','first_appointment_date','first_appointed_school',
    'official_language','subject_of_appointment','salary_scale','salary_roll_number',
    'permanent_address','temporary_address','mobile_no','whatsapp_number',
    'email_address','education_qualification','grade','gender','married',
    'divorced','widow','designation','professional_qualification',
    'other_courses_of_study','other_qualifications','increment_date',
    'module_completed','module_completed_date','passport_no','passport_expiry_date',
    'license_no','license_expiry_date','admission_date_at_al_falah',
];

$params = [];
foreach ($cols as $c) $params[] = $body[$c] ?? null;

$placeholders = implode(', ', array_fill(0, count($cols), '?'));
$colList      = implode(', ', $cols);

$pdo = get_db();
$pdo->prepare("INSERT INTO teachers ($colList) VALUES ($placeholders)")->execute($params);

$id = (int)$pdo->lastInsertId();
log_audit($pdo, $body['user_id'] ?? 0, 'CREATE_TEACHER', 'teachers', $id, null, $body);
send_success(['teacher_id' => $id], 'Teacher created');
