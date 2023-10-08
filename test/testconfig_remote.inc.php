<?php

if (file_exists('../vendor/autoload.php')) {
    require('../vendor/autoload.php');
} else {
    require('../../../autoload.php');
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

define('KAART_TESTDIRECTORY', realpath('./tmp/'));
define('KAART_SERVER_HOSTNAME', 'kaart.meertens.knaw.nl');
define('KAART_SERVER_PATH', '/');
define('KAART_SERVER_PORT', 443);
define('KAART_SERVER_PROTOCOL', 'https');

