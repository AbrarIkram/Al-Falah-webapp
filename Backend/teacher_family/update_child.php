<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['child_id']);

$pdo  = get_db();
$cols = ['name','age'];
$sets = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['child_id'];
$pdo->prepare("UPDATE teacher_children SET " . implode(', ', $sets) . " WHERE child_id = ?")->execute($params);
send_success(null, 'Child updated');
