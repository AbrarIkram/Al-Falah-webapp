<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['sibling_id']);

$pdo  = get_db();
$cols = ['full_name','school','educational_qualification','nic_no','job','physically_disable'];
$sets = []; $params = [];
foreach ($cols as $c) {
    if (array_key_exists($c, $body)) { $sets[] = "$c = ?"; $params[] = $body[$c]; }
}
if (empty($sets)) send_error('No fields to update');

$params[] = $body['sibling_id'];
$pdo->prepare("UPDATE siblings SET " . implode(', ', $sets) . " WHERE sibling_id = ?")->execute($params);
send_success(null, 'Sibling updated');
