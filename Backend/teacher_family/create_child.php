<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

$body = get_json_body();
require_fields($body, ['teacher_id']);

$pdo = get_db();
$pdo->prepare("
    INSERT INTO teacher_children (teacher_id, name, age) VALUES (?, ?, ?)
")->execute([
    $body['teacher_id'],
    $body['name'] ?? null,
    $body['age']  ?? null,
]);

send_success(['child_id' => (int)$pdo->lastInsertId()], 'Child created');
