<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

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

$pdo    = get_db();
$prev   = $pdo->prepare("SELECT * FROM teachers WHERE teacher_id = ?");
$prev->execute([$body['teacher_id']]);
$old = $prev->fetch();
if (!$old) send_error('Teacher not found', 404);

$sets = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['teacher_id'];
$pdo->prepare("UPDATE teachers SET " . implode(', ', $sets) . " WHERE teacher_id = ?")->execute($params);

log_audit($pdo, $body['user_id'] ?? 0, 'UPDATE_TEACHER', 'teachers', $body['teacher_id'], $old, $body);
send_success(null, 'Teacher updated');
