<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['student_id']);

$pdo  = get_db();
$cols = ['name','nic_no','mobile_no','whatsapp_no','single_mother','status','income_sources','job'];
$sets = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['student_id'];
$pdo->prepare("UPDATE mothers SET " . implode(', ', $sets) . " WHERE student_id = ?")->execute($params);
send_success(null, 'Mother updated');
