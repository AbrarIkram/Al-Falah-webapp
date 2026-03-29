<?php
require_once '../config/db.php';
require_once '../config/helpers.php';
require_method('POST');

// Token invalidation handled client-side.
// Insert blacklist logic here if using JWT.
send_success(null, 'Logged out');
