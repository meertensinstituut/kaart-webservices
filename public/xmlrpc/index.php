<?php

//  Copyright (C) 2006-2007 Meertens Instituut / KNAW
// 
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
// 
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
// 
//  You should have received a copy of the GNU General Public License along
//  with this program; if not, write to the Free Software Foundation, Inc.,
//  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

/**
 * @package    Kaart
 * @subpackage xml-rpc
 * @author     Jan Pieter Kunst <jan.pieter.kunst@meertens.knaw.nl>
 * @copyright  2006-2007 Meertens Instituut / KNAW
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt GNU GPL version 2
 */

use Meertens\Kaart\Kaart as Kaart;
use Meertens\Kaart\REST\Webservice as Webservice;
require('../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->safeLoad();

// Check for no valid XML-RPC request (URL called in browser by end-user)
$request_headers = apache_request_headers();
if (!isset($request_headers['Content-Type']) || $request_headers['Content-Type'] != 'text/xml') {
    describeMethods2HTML();
    exit();
}


$createmap_sig = array(
    array($GLOBALS['XML_RPC_Base64'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Array']),
    array(
        $GLOBALS['XML_RPC_Base64'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_Struct']
    ),
    array($GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Array']),
    array($GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_Struct']),
    array($GLOBALS['XML_RPC_Base64'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Struct']),
    array(
        $GLOBALS['XML_RPC_Base64'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Struct'], $GLOBALS['XML_RPC_Struct']
    ),
    array($GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Struct']),
    array($GLOBALS['XML_RPC_Array'], $GLOBALS['XML_RPC_String'], $GLOBALS['XML_RPC_Struct'], $GLOBALS['XML_RPC_Struct'])
);
$createmap_doc = file_get_contents('kaart_createmap_docstring.html');
$getpossibleparts_sig = array(array($GLOBALS['XML_RPC_Array']));
$named_parts_sig = array(array($GLOBALS['XML_RPC_Struct']));
$getpossibleareas_sig = array(array($GLOBALS['XML_RPC_Struct'], $GLOBALS['XML_RPC_String']));

$getpossibleparts_doc = "Returns an array with possible named parts for the basemap of the Dutch language area.";
$getpossibleplacemarks_doc = "Returns an array with possible placemarks for the basemap of the Dutch language area.";
$getpossiblemunicipalities_doc = "Returns an array with possible municipalities for maps of type 'municipalities.";

$dispatches = array(
    'kaart.createmap' => array(
        'function' => 'createmap',
        'signature' => $createmap_sig,
        'docstring' => $createmap_doc
    )
,
    'kaart.getpossibleparts' => array(
        'function' => 'getPossibleParts',
        'signature' => $getpossibleparts_sig,
        'docstring' => $getpossibleparts_doc
    ),
    'kaart.getpossibleplacemarks' => array(
        'function' => 'getPossiblePlacemarks',
        'signature' => $named_parts_sig,
        'docstring' => $getpossibleplacemarks_doc
    ),
    'kaart.getpossiblemunicipalities' => array(
        'function' => 'getPossibleMunicipalities',
        'signature' => $named_parts_sig,
        'docstring' => $getpossiblemunicipalities_doc
    ),
    'kaart.getpossibleareas' => array(
        'function' => 'getPossibleAreas',
        'signature' => $getpossibleareas_sig,
        'docstring' => $getpossiblemunicipalities_doc
    )

);

$kaart_allowed_maptypes = array('dutchlanguagearea', 'municipalities', 'gemeentes', 'corop', 'provincies', 'provinces');
$kaart_allowed_additional_data = array('provincies', 'provinces', 'corop', 'daan_blok_1969');

new XML_RPC_Server($dispatches, 1, 1);

/**
 * Create a map from an incoming XML-RPC message
 *
 * @param $msg XML_RPC_Message
 *
 * @return XML_RPC_Response
 */
function createmap($msg)
{
    global $kaart_allowed_maptypes, $kaart_allowed_additional_data;

    $mapformat = XML_RPC_decode($msg->getParam(0));
    $data = XML_RPC_decode($msg->getParam(1));
    $parameters = array();

    $n = $msg->getNumParams();
    if ($n == 3) {
        $parameters = XML_RPC_decode($msg->getParam(2));
    }
    $parameters['data'] = $data;
    if (array_key_exists('type', $parameters)
        && in_array(
            $parameters['type'], $kaart_allowed_maptypes
        )
    ) {
        $type = $parameters['type'];
    } else {
        $type = 'dutchlanguagearea';
    }

    $k = new Kaart($type);

    Webservice::createMap($k, $type, $data, $parameters);

    $mapfile = $k->fetch($mapformat);

    if (in_array($mapformat, array('gif', 'jpeg', 'png')) && array_key_exists('imagemap', $parameters)) {
        $mapval = new XML_RPC_Value($mapfile, $GLOBALS['XML_RPC_Base64']);
        $imagemapval = new XML_RPC_Value($k->getImagemap(), $GLOBALS['XML_RPC_String']);
        $val = new XML_RPC_Value(array($mapval, $imagemapval), $GLOBALS['XML_RPC_Array']);
    } elseif ($mapformat == 'json') {
        $val = new XML_RPC_Value($mapfile, $GLOBALS['XML_RPC_String']);
    } else {
        $val = new XML_RPC_Value($mapfile, $GLOBALS['XML_RPC_Base64']);
    }

    return new XML_RPC_Response($val);
}

/**
 * Return possible parts of the map as an XML-RPC response
 *
 * @return XML_RPC_Response
 */
function getPossibleParts()
{

    /** @var $k Kaart_DutchlanguageArea */
    $k = new Kaart();
    $parts = $k->getPossibleParts();

    $xmlrpc_array = array();
    foreach ($parts as $part) {
        $xmlrpc_array[] = new XML_RPC_Value($part, $GLOBALS['XML_RPC_String']);
    }
    $val = new XML_RPC_Value($xmlrpc_array, $GLOBALS['XML_RPC_Array']);

    return new XML_RPC_Response($val);
}


/**
 * Return possible parts of the map as an XML-RPC response
 *
 * @return XML_RPC_Response
 */
function getPossiblePlacemarks()
{

    /** @var $k Kaart_DutchlanguageArea */
    $k = new Kaart();
    $placemarks = $k->getPossiblePlacemarks();

    $xmlrpc_array = array();
    foreach ($placemarks as $kloeke => $name) {
        $xmlrpc_array[$kloeke] = new XML_RPC_Value($name, $GLOBALS['XML_RPC_String']);
    }
    $val = new XML_RPC_Value($xmlrpc_array, $GLOBALS['XML_RPC_Struct']);

    return new XML_RPC_Response($val);
}


/**
 * Return possible municipalities as an XML-RPC response
 *
 * @return XML_RPC_Response
 */
function getPossibleMunicipalities()
{

    /** @var $k Kaart_Choropleth */
    $k = new Kaart('gemeentes');
    $municipalities = $k->getPossibleMunicipalities();

    $xmlrpc_array = array();
    foreach ($municipalities as $code => $name) {
        $xmlrpc_array[$code] = new XML_RPC_Value($name, $GLOBALS['XML_RPC_String']);
    }
    $val = new XML_RPC_Value($xmlrpc_array, $GLOBALS['XML_RPC_Struct']);

    return new XML_RPC_Response($val);
}


/**
 * Return possible municipalities as an XML-RPC response
 *
 * @param $msg XML_RPC_Message
 *
 * @return XML_RPC_Response
 */
function getPossibleAreas($msg)
{
    $type = XML_RPC_decode($msg->getParam(0));
    if (in_array($type, array('municipalities', 'gemeentes', 'corop'))) {
        /** @var $k Kaart_Choropleth */
        $k = new Kaart($type);
        $areas = $k->getPossibleAreas();
        $xmlrpc_array = array();
        foreach ($areas as $code => $name) {
            $xmlrpc_array[$code] = new XML_RPC_Value($name, $GLOBALS['XML_RPC_String']);
        }
        $val = new XML_RPC_Value($xmlrpc_array, $GLOBALS['XML_RPC_Struct']);
        return new XML_RPC_Response($val);
    } else {
        return new XML_RPC_Response(0, $GLOBALS['XML_RPC_erruser'], 'Wrong maptype for this method');
    }

}


/**
 * HTML-ized output from the output of the system.describeMethods method
 *
 * Uses the Smarty templating system
 */
function describeMethods2HTML()
{
    if (isset($_SERVER['HTTP_X_FORWARDED_SCHEME'])) {
        $scheme = $_SERVER['HTTP_X_FORWARDED_SCHEME'];
    } else {
        $scheme = $_SERVER['REQUEST_SCHEME'];
    }
    $client = new XML_RPC_Client($_SERVER['REQUEST_URI'], $scheme . '://' . $_SERVER['SERVER_NAME']);
    $client->setDebug(0);
    $msg = new XML_RPC_Message('system.describeMethods');
    $result = $client->send($msg);
    $methods = XML_RPC_Decode($result->value());
    $smarty = new Smarty;
    $smarty->template_dir = '.';
    $smarty->compile_dir = '/tmp';
    $smarty->assign('titel', 'Kaart XML-RPC Server');
    $smarty->assign('methods', $methods);


    $smarty->display('describemethods.tpl');
}

