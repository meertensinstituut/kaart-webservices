<?php

if (file_exists('../vendor/autoload.php')) {
    require('../vendor/autoload.php');
} else {
    require('../../../autoload.php');
}
define('KAART_TESTDIRECTORY', realpath('./tmp/'));
define('KAART_SERVER_HOSTNAME', 'localhost');
define('KAART_SERVER_PATH', '/');
define('KAART_SERVER_PORT', 8088);

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();
