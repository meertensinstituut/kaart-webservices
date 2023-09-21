<?php

require('../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

use Meertens\Kaart\Kaart as Kaart;

check_oude_files('./tmp');

$kaart = new Kaart();
$kaart->setPixelWidth(intval($_REQUEST['mapsize']));
if (isset($_REQUEST['frequency']) && $_REQUEST['frequency'] == 1) {
    $kaart->setMapType('frequency');
}

$kloekenummers = array();

if (isset($_REQUEST['kloekes'])) {

    foreach ($_REQUEST['kloekes'] as $key => $kloekestring) {
        $ruwe_kloekenummers = preg_split('/[ \t\n\r,]+/', trim($_REQUEST['kloekes'][$key]), -1, PREG_SPLIT_NO_EMPTY);
        $kloekenummers[$key] = array_map('kloeke_old2new', $ruwe_kloekenummers);
        if (!empty($kloekenummers[$key])) {
            $kaart->addData($kloekenummers[$key]);
        } else {
            continue;
        }
        $legenda = trim($_REQUEST['legenda'][$key]);

        if (!empty($legenda)) {
            $kaart->setLegend($legenda);
        }
        $symbol = trim($_REQUEST['symbol'][$key]);
        if ($symbol != 'default') {
            $kaart->setSymbol($symbol);
        }
        $color = trim($_REQUEST['color'][$key]);
        if ($color != 'default') {
            $kaart->setOutlinedColor($color, 'black');
        }
    }
}

$kaartnaam = 'kaart' . md5(uniqid('')) . '.gif';
$kaart->saveAsFile('./tmp/' . $kaartnaam, 'gif');
$ongeldige_kloekecodes = join(', ', $kaart->getInvalidKloekeCodes());

echo '<img height="' . $kaart->getPixelHeight() . '" width="' . $kaart->getPixelWidth() . '" src="tmp/' . $kaartnaam . '">';
if (!empty($ongeldige_kloekecodes)) {
    echo "<p style=\"margin-top:50px;\"><span style=\"color:red;\">Ongeldige Kloekecodes:</span>" . htmlspecialchars($ongeldige_kloekecodes) . "</p>";
}

/**
 * Deze functie gooit 1 maal per uur files die ouder zijn dan 6 uur weg
 */
function check_oude_files($directory)
{

    $nu = time();

    if (file_exists($directory . DIRECTORY_SEPARATOR . 'timestamp')) {
        $tijd = filemtime($directory . DIRECTORY_SEPARATOR . 'timestamp');
        // korter dan 1 uur geleden de directory schoongemaakt
        if (($nu - $tijd) < 3600) {
            return;
        }
    } else {
        touch($directory . DIRECTORY_SEPARATOR . 'timestamp');
    }

    $dir = opendir($directory);
    while (false !== ($file = readdir($dir))) {
        if (is_file($directory . DIRECTORY_SEPARATOR . $file)) {
            if ($file == '.gitignore') {
                continue;
            }
            $tijd = filemtime($directory . DIRECTORY_SEPARATOR . $file);
            if (($nu - $tijd) > 21600) {
                unlink($directory . DIRECTORY_SEPARATOR . $file);
            }
        }
    }
    closedir($dir);

    touch($directory . DIRECTORY_SEPARATOR . 'timestamp');
}

/**
 * Kloekenummer omzetten naar nieuw format voorzover mogelijk
 */
function kloeke_old2new($kloekenummer)
{

    // spaties er uit
    $kloekenummer = str_replace(' ', '', $kloekenummer);
    // sterretje of x op het eind moet q worden
    $kloekenummer = str_replace(array('*', 'x'), 'q', $kloekenummer);
    // voorloopnullen indien nodig
    $match = preg_match('/(\d+)/', $kloekenummer, $matches);
    if ($match) {
        if (strlen($matches[1]) < 3) {
            $getal = str_pad($matches[1], 3, '0', STR_PAD_LEFT);
            $kloekenummer = str_replace($matches[1], $getal, $kloekenummer);
        }
    }
    // als er geen letter achteraan staat moet er een p achter
    if (strlen($kloekenummer) == 4) {
        $kloekenummer .= 'p';
    }

    return $kloekenummer;
}

?>
