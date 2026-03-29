<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

if (empty($_GET['student_id'])) send_error('student_id is required');

$pdo  = get_db();
$stmt = $pdo->prepare("
    SELECT s.*, b.name AS batch_name
    FROM students s
    LEFT JOIN batch_options b ON b.id = s.batch_id
    WHERE s.student_id = ?
");
$stmt->execute([$_GET['student_id']]);
$student = $stmt->fetch();
if (!$student) send_error('Student not found', 404);

$one = function(string $sql, int $id) use ($pdo) {
    $s = $pdo->prepare($sql); $s->execute([$id]); return $s->fetch() ?: null;
};
$many = function(string $sql, int $id) use ($pdo) {
    $s = $pdo->prepare($sql); $s->execute([$id]); return $s->fetchAll();
};

$sid = $student['student_id'];
$student['father']   = $one("SELECT * FROM fathers   WHERE student_id = ?", $sid);
$student['mother']   = $one("SELECT * FROM mothers   WHERE student_id = ?", $sid);
$student['guardian'] = $one("SELECT * FROM guardians WHERE student_id = ?", $sid);
$student['siblings'] = $many("SELECT * FROM siblings  WHERE student_id = ? ORDER BY sibling_id", $sid);

send_success($student);
