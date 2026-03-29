<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

if (empty($_GET['teacher_id'])) send_error('teacher_id is required');

$pdo  = get_db();
$stmt = $pdo->prepare("SELECT * FROM teachers WHERE teacher_id = ?");
$stmt->execute([$_GET['teacher_id']]);
$teacher = $stmt->fetch();
if (!$teacher) send_error('Teacher not found', 404);

$tid = $teacher['teacher_id'];

$sp = $pdo->prepare("SELECT * FROM teacher_spouse WHERE teacher_id = ?");
$sp->execute([$tid]);
$teacher['spouse'] = $sp->fetch() ?: null;

$ch = $pdo->prepare("SELECT * FROM teacher_children WHERE teacher_id = ? ORDER BY child_id");
$ch->execute([$tid]);
$teacher['children'] = $ch->fetchAll();

send_success($teacher);
