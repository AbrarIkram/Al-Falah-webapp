<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo    = get_db();
$where  = ['s.is_alumni = 0'];
$params = [];

if (!empty($_GET['grade'])) {
    $where[]  = 's.grade = ?';
    $params[] = $_GET['grade'];
}
if (!empty($_GET['batch_id'])) {
    $where[]  = 's.batch_id = ?';
    $params[] = $_GET['batch_id'];
}
if (!empty($_GET['search'])) {
    $where[]  = '(s.full_name LIKE ? OR s.index_no LIKE ? OR s.serial_no LIKE ?)';
    $q        = '%' . $_GET['search'] . '%';
    array_push($params, $q, $q, $q);
}
if (isset($_GET['is_alumni'])) {
    $where  = array_filter($where, fn($w) => $w !== 's.is_alumni = 0');
    $where[]  = 's.is_alumni = ?';
    $params[] = (int)$_GET['is_alumni'];
}

$sql  = "SELECT s.student_id, s.serial_no, s.full_name, s.grade, s.index_no,
                s.gender, s.year_of_joining, s.is_alumni,
                s.ff_fee_paid, s.sdec_fee_paid,
                b.name AS batch_name
         FROM students s
         LEFT JOIN batch_options b ON b.id = s.batch_id
         WHERE " . implode(' AND ', $where) . "
         ORDER BY s.grade, s.full_name";

$stmt = $pdo->prepare($sql);
$stmt->execute(array_values($params));
send_success($stmt->fetchAll());
