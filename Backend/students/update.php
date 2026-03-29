<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo  = get_db();
$prev = $pdo->prepare("SELECT * FROM students WHERE student_id = ?");
$prev->execute([$body['student_id']]);
$old  = $prev->fetch();
if (!$old) send_error('Student not found', 404);

$cols   = ['serial_no','full_name','grade','index_no','permanent_address',
           'grama_sevaka_division','date_of_batch','gender','permanent_disease',
           'eligible_aswesuma','permanent_disease_note','year_of_joining','batch_id','is_alumni'];
$sets   = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['student_id'];
$pdo->prepare("UPDATE students SET " . implode(', ', $sets) . " WHERE student_id = ?")->execute($params);

log_audit($pdo, $body['user_id'] ?? 0, 'UPDATE_STUDENT', 'students', $body['student_id'], $old, $body);
send_success(null, 'Student updated');
