<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

$pdo  = get_db();
$cols = ['name','job','phone_number','address'];
$sets = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['teacher_id'];
$pdo->prepare("UPDATE teacher_spouse SET " . implode(', ', $sets) . " WHERE teacher_id = ?")->execute($params);
send_success(null, 'Spouse updated');
