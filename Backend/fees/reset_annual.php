<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['academic_year', 'user_id']);

$pdo  = get_db();
$stmt = $pdo->prepare("CALL reset_annual_fees(?, ?)");
$stmt->execute([$body['academic_year'], $body['user_id']]);

$result = $stmt->fetch();
send_success($result, 'Annual fees reset successfully');
