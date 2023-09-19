<?php
//echo '<pre>';
//print_r($_SERVER);
//echo '</pre>';
//die;
use Meertens\Kaart\Kaart as Kaart;
use Meertens\Kaart\REST\RequestParser as RequestParser;

require('../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->safeLoad();
if (is_dir('../../coords')) {
    $_ENV['KAART_CUSTOM_INCLUDE_PATHS'] = array(realpath('../../coords'));
}

$requestparser = new RequestParser();

if ($requestparser->error) {
    REST::error(400, $requestparser->getError());
    exit;
}

$parameters = $requestparser->getParameters();

if (empty($parameters)) {
    $kaart_url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    echo REST::html_start('Kaart REST service documentation');
    echo str_replace('##KAART_URL##', $kaart_url, file_get_contents('RESTdocumentation.html'));
    echo REST::html_end();
    exit;
}

if (isset($parameters['possibleparts'])) {
    /** @var $kaart Kaart_DutchLanguageArea */
    if (! isset($parameters['type'])) {
        $kaart = new Kaart('dutchlanguagearea');
    } else {
        $kaart = new Kaart($parameters['type']);
    }
    $possibleparts = $kaart->getPossibleParts();
    if (is_null($possibleparts)) {
        $possibleparts = array();
    }
    $data = json_encode($possibleparts);
    header('Content-type: application/json');
    echo $data;
    exit;    
}

if (isset($parameters['possiblemunicipalities']) || isset($parameters['possibleareas'])) {
    /** @var $kaart Kaart_Choropleth */
    if (isset($parameters['possiblemunicipalities']) && ! isset($parameters['type'])) {
        $kaart = new Kaart('gemeentes');
    } else {
        $kaart = new Kaart($parameters['type']);
    }
    if (isset($parameters['possiblemunicipalities'])) {
        $possibleareas = $kaart->getPossibleMunicipalities();
    } else {
        $possibleareas = $kaart->getPossibleAreas();
    }
    if (is_null($possibleareas)) {
        $possibleareas = array();
    }
    $data = json_encode($possibleareas);
    header('Content-type: application/json');
    echo $data;
    exit;    
}

if (isset($parameters['possibleplacemarks'])) {
    /** @var $kaart Kaart_DutchLanguageArea */
    if (! isset($parameters['type'])) {
        $kaart = new Kaart('dutchlanguagearea');
    } else {
        $kaart = new Kaart($parameters['type']);
    }
    if (isset($parameters['complete'])) {
        $placemarksparam = 'complete';
    } else {
        $placemarksparam = NULL;
    }
    $possibleplacemarks = $kaart->getPossiblePlacemarks($placemarksparam);
    if (is_null($possibleplacemarks)) {
        $possibleplacemarks = array();
    }
    $data = json_encode($possibleplacemarks);
    header('Content-type: application/json');
    echo $data;
    exit;    
}

if (isset($parameters['pathsfile'])) {
  $kaart = new Kaart($parameters['type'], $parameters['pathsfile']);
} else {
  $kaart = new Kaart($parameters['type']);
}

if (! isset($parameters['data'])) { $parameters['data'] = array(); }

Meertens\Kaart\REST\WebService::createMap($kaart, $parameters['type'], $parameters['data'], $parameters);

if (isset($parameters['imagemap'])) {
    // so that imagemap=1 returns a partial imagemap when links and/or tooltips are set and interactive is not set
    // and a complete imagemap when links and/or tooltips are not set
    if (! isset($parameters['links']) && ! isset($parameters['tooltips']) && ! isset($parameters['linkhighlightedonly'])) {
        $kaart->setInteractive(TRUE);
    }
    // Goes nowhere, but this is needed to create the imagemap
    $kaart->fetch($parameters['format']);
    header('Content-type: text/html');
    echo $kaart->getImagemap();
} elseif (isset($parameters['base64'])) {
    header('Content-type: text/plain');
    echo base64_encode($kaart->fetch($parameters['format']));
} else {
    $kaart->show($parameters['format']);
}

