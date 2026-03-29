<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

if (empty($_GET['student_id'])) send_error('student_id is required');

$pdo  = get_db();
$stmt = $pdo->prepare("SELECT * FROM siblings WHERE student_id = ? ORDER BY sibling_id");
$stmt->execute([$_GET['student_id']]);
send_success($stmt->fetchAll());
