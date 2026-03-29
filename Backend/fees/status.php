<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo = get_db();

if (!empty($_GET['student_id'])) {
    $stmt = $pdo->prepare("
        SELECT student_id, full_name, grade,
               ff_fee_paid, ff_fee_year,
               sdec_fee_paid, sdec_fee_year
        FROM students
        WHERE student_id = ? AND is_alumni = 0
    ");
    $stmt->execute([$_GET['student_id']]);
    $row = $stmt->fetch();
    if (!$row) send_error('Student not found or is alumni', 404);
    send_success($row);
}

// All active students fee overview
$stmt = $pdo->query("SELECT * FROM v_fee_status");
send_success($stmt->fetchAll());
