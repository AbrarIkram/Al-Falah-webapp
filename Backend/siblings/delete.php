<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['sibling_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM siblings WHERE sibling_id = ?");
$stmt->execute([$body['sibling_id']]);
if ($stmt->rowCount() === 0) send_error('Sibling not found', 404);
send_success(null, 'Sibling deleted');
