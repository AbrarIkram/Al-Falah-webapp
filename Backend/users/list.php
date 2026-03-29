<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo  = get_db();
$stmt = $pdo->query("SELECT user_id, username, role, created_at FROM users ORDER BY username");
send_success($stmt->fetchAll());
