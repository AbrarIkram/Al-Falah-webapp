<?php
require_once '../config/db.php';
require_once '../config/helpers.php';

/**
 * Generic CRUD handler for all *_options tables.
 * Each settings file just calls: handle_options('table_name');
 *
 * GET              → list all options
 * POST { name }    → create new option
 * POST { delete_id } → delete option by id
 */
function handle_options(string $table): void {
    $allowed = [
        'batch_options',
        'grade_options',
        'gsd_options',
        'occupation_options',
        'edu_qualification_options',
        'income_source_options',
        'teacher_service_options',
        'teacher_subject_options',
        'teacher_edu_qualification_options',
        'teacher_professional_qualification_options',
        'teacher_grade_options',
        'teacher_designation_options',
        'teacher_first_school_options',
    ];

    if (!in_array($table, $allowed)) send_error('Unknown options table', 400);

    $pdo    = get_db();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT id, name FROM `$table` ORDER BY name");
        send_success($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $body = get_json_body();

        // DELETE
        if (!empty($body['delete_id'])) {
            $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
            $stmt->execute([$body['delete_id']]);
            if ($stmt->rowCount() === 0) send_error('Record not found', 404);
            send_success(null, 'Option deleted');
        }

        // CREATE
        require_fields($body, ['name']);
        $name = trim($body['name']);
        if ($name === '') send_error('name cannot be empty');

        $stmt = $pdo->prepare("INSERT INTO `$table` (name) VALUES (?)");
        $stmt->execute([$name]);
        send_success(['id' => (int)$pdo->lastInsertId()], 'Option created');
    }

    send_error('Method not allowed', 405);
}
