<?php
function send_json(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function send_error(string $message, int $code = 400): void {
    send_json(['success' => false, 'error' => $message], $code);
}

function send_success($data = null, string $message = 'OK'): void {
    $res = ['success' => true, 'message' => $message];
    if ($data !== null) $res['data'] = $data;
    send_json($res);
}

function require_method(string $method): void {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        send_error('Method not allowed', 405);
    }
}

function get_json_body(): array {
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : [];
}

function require_fields(array $body, array $fields): void {
    foreach ($fields as $field) {
        if (!isset($body[$field]) || $body[$field] === '') {
            send_error("Field '$field' is required");
        }
    }
}

function log_audit(
    PDO     $pdo,
    int     $user_id,
    string  $action,
    ?string $table     = null,
    ?int    $target_id = null,
    mixed   $old       = null,
    mixed   $new       = null
): void {
    $pdo->prepare("
        INSERT INTO user_audit_log
            (user_id, action, target_table, target_id, old_value, new_value, ip_address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ")->execute([
        $user_id,
        $action,
        $table,
        $target_id,
        $old !== null ? json_encode($old) : null,
        $new !== null ? json_encode($new) : null,
        $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
}
