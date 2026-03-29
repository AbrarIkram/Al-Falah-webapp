<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("DELETE FROM teacher_spouse WHERE teacher_id = ?");
$stmt->execute([$body['teacher_id']]);
if ($stmt->rowCount() === 0) send_error('Spouse record not found', 404);
send_success(null, 'Spouse record deleted');
