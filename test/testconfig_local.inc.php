<?php

if (file_exists('../vendor/autoload.php')) {
    require('../vendor/autoload.php');
} else {
    require('../../../autoload.php');
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

define('KAART_TESTDIRECTORY', realpath('./tmp/'));
define('KAART_SERVER_HOSTNAME', $_ENV['KAART_LOCAL_SERVER_HOSTNAME']);
define('KAART_SERVER_PATH', $_ENV['KAART_LOCAL_SERVER_PATH']);
define('KAART_SERVER_PORT', $_ENV['KAART_LOCAL_SERVER_PORT']);
define('KAART_SERVER_PROTOCOL', $_ENV['KAART_LOCAL_SERVER_PROTOCOL']);

