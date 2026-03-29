<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('GET');

$pdo    = get_db();
$where  = ['1=1'];
$params = [];

if (!empty($_GET['user_id'])) {
    $where[]  = 'a.user_id = ?';
    $params[] = $_GET['user_id'];
}
if (!empty($_GET['action'])) {
    $where[]  = 'a.action LIKE ?';
    $params[] = '%' . $_GET['action'] . '%';
}
if (!empty($_GET['target_table'])) {
    $where[]  = 'a.target_table = ?';
    $params[] = $_GET['target_table'];
}
if (!empty($_GET['target_id'])) {
    $where[]  = 'a.target_id = ?';
    $params[] = $_GET['target_id'];
}
if (!empty($_GET['date_from'])) {
    $where[]  = 'a.created_at >= ?';
    $params[] = $_GET['date_from'];
}
if (!empty($_GET['date_to'])) {
    $where[]  = 'a.created_at <= ?';
    $params[] = $_GET['date_to'];
}

$limit  = min((int)($_GET['limit']  ?? 100), 500);
$offset = (int)($_GET['offset'] ?? 0);

$stmt = $pdo->prepare("
    SELECT a.audit_id, a.action, a.target_table, a.target_id,
           a.old_value, a.new_value, a.ip_address, a.created_at,
           u.username
    FROM user_audit_log a
    LEFT JOIN users u ON u.user_id = a.user_id
    WHERE " . implode(' AND ', $where) . "
    ORDER BY a.created_at DESC
    LIMIT $limit OFFSET $offset
");
$stmt->execute($params);
send_success($stmt->fetchAll());
