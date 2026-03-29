<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['child_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM teacher_children WHERE child_id = ?");
$stmt->execute([$body['child_id']]);
if ($stmt->rowCount() === 0) send_error('Child not found', 404);
send_success(null, 'Child deleted');
