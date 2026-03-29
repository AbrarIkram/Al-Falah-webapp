<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo    = get_db();
$where  = ['1=1'];
$params = [];

if (!empty($_GET['search'])) {
    $where[]  = '(full_name LIKE ? OR nic_no LIKE ? OR employee_number LIKE ?)';
    $q        = '%' . $_GET['search'] . '%';
    array_push($params, $q, $q, $q);
}
if (!empty($_GET['grade'])) {
    $where[]  = 'grade = ?';
    $params[] = $_GET['grade'];
}
if (!empty($_GET['gender'])) {
    $where[]  = 'gender = ?';
    $params[] = $_GET['gender'];
}

$stmt = $pdo->prepare("
    SELECT teacher_id, full_name, name_with_initial, nic_no, employee_number,
           grade, designation, mobile_no, email_address, gender
    FROM teachers
    WHERE " . implode(' AND ', $where) . "
    ORDER BY full_name
");
$stmt->execute($params);
send_success($stmt->fetchAll());
