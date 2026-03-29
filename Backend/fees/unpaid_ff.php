<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo  = get_db();
$stmt = $pdo->query("SELECT * FROM v_unpaid_ff ORDER BY grade, full_name");
send_success($stmt->fetchAll());
