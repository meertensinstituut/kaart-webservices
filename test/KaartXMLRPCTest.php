<?php
use PHPUnit\Framework\TestCase;
echo "Testing XML-RPC services on " .  KAART_SERVER_HOSTNAME . KAART_SERVER_PATH . "\n";

class KaartXMLRPCTest extends TestCase
{
  /** @var XML_RPC_Client */
  private $_client;
  private $_kloekes;
  private $_postal_codes;
  private $_municipalities;
  private $_additional_kloekes;

  function setUp(): void
  {
    $this->_client = new XML_RPC_Client(KAART_SERVER_PATH . 'xmlrpc/', KAART_SERVER_HOSTNAME, KAART_SERVER_PORT);
    $this->_client->setDebug(0);
    $this->_kloekes = new XML_RPC_Value(array(
      new XML_RPC_Value('E017p', 'string'),
      new XML_RPC_Value('E031a', 'string'),
      new XML_RPC_Value('E038a', 'string'),
      new XML_RPC_Value('E051p', 'string'),
      new XML_RPC_Value('E067q', 'string'),
      new XML_RPC_Value('E079p', 'string'),
    ), 'array');
    $this->_additional_kloekes = new XML_RPC_Value(array(
      new XML_RPC_Value('K192p', 'string'),
      new XML_RPC_Value('K209p', 'string'),
      new XML_RPC_Value('K211p', 'string'),
    ), 'array');
    $this->_postal_codes = new XML_RPC_Value(array(
      new XML_RPC_Value('1053', 'string'),
      new XML_RPC_Value('3503', 'string'),
    ), 'array');
    $this->_municipalities = new XML_RPC_Value(array(
      'g_0534' => new XML_RPC_Value("#FFC513", 'string'),
      'g_0003' => new XML_RPC_Value("#FFEEAA", 'string')
    ), 'struct');
  }

  function tearDown(): void
  {
    unset($this->_client);
    unset($this->_kloekes);
    unset($this->_additional_kloekes);
  }

  private function _getComplexParams($type, $additionalparams = array())
  {

    $format = new XML_RPC_Value($type, 'string');
    $offset1 = new XML_RPC_Value(1, 'int');
    $name1 = new XML_RPC_Value('set 1', 'string');
    $symbol1 = new XML_RPC_Value('triangle', 'string');
    $color1 = new XML_RPC_Value('salmon', 'string');
    $struct1 = new XML_RPC_Value(array(
      'offset' => $offset1, 'name' => $name1, 'symbol' => $symbol1, 'color' => $color1, 'kloekecodes' => $this->_kloekes
    ), 'struct');
    $offset2 = new XML_RPC_Value(2, 'int');
    $name2 = new XML_RPC_Value('set 2', 'string');
    $symbol2 = new XML_RPC_Value('star', 'string');
    $struct2 = new XML_RPC_Value(array(
      'offset' => $offset2, 'name' => $name2, 'symbol' => $symbol2, 'kloekecodes' => $this->_additional_kloekes
    ), 'struct');
    $series = new XML_RPC_Value(array($struct1, $struct2), 'array');
    if (empty($additionalparams)) {
      $params = array($format, $series);
    } else {
      if (isset($additionalparams['drawlegend'])) {
        $additionalparams = new XML_RPC_Value(array('drawlegend' => new XML_RPC_Value((bool) $additionalparams['drawlegend'], 'boolean')), 'struct');
      }
      $params = array($format, $series, $additionalparams);
    }

    return $params;
  }

  private function _saveFile($filename, $data)
  {
    file_put_contents(KAART_TESTDIRECTORY . '/' . $filename, $data);
    return file_get_contents(KAART_TESTDIRECTORY . '/' . $filename);
  }

  function testSimpleMap()
  {
    $filenaam = 'XMLRPCSimpleMap.png';
    $format = new XML_RPC_Value('png', 'string');
    $background = new XML_RPC_Value('daan_blok_1969', 'string');
    $extraparams = new XML_RPC_Value(array('background' => $background), 'struct');
    $params = array($format, $this->_kloekes, $extraparams);
    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = array(
        '2cda5506feda87d752afd7959b97a012',
        'e7abf4b2a4e5f19229667226756e0c82',
        '0b84582ffdc145c890b0026b081dd591'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testSimpleMapJSON()
  {

    $filenaam = 'XMLRPCSimpleMap.json';
    $format = new XML_RPC_Value('json', 'string');
    $type = new XML_RPC_Value('dutchlanguagearea', 'string');
    $extraparams = new XML_RPC_Value(array('type' => $type), 'struct');
    $params = array($format, new XML_RPC_Value(array(), 'struct'), $extraparams);
    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    // afrondingsverschilletjes met RD -> latlong lokaal en op server
    $expected = array(
        '6f7ec28792d01ff9735643fde27d488e',
        'f305c16e3d86599d606131f7993f45f2',
        '1a4873bc25cbc480813eada5e990f252'
        );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }


  function testInteractiveBitmap()
  {

    $filenaam = 'XMLRPCimagemapKloekes.html';
    $format = new XML_RPC_Value('png', 'string');
    $interactive = new XML_RPC_Value(TRUE, 'boolean');
    $imagemap = new XML_RPC_Value(TRUE, 'boolean');
    $extraparams = new XML_RPC_Value(array('interactive' => $interactive, 'imagemap' => $imagemap), 'struct');
    $params = array($format, $this->_kloekes, $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $resp_val = XML_RPC_Decode($response->value());
    $expected
      = '<area shape="rect" coords="205,110,211,116" title="Schoorl (E017p)" alt="Schoorl (E017p)" />
<area shape="rect" coords="236,106,242,112" title="Oostwoud (E031a)" alt="Oostwoud (E031a)" />
<area shape="rect" coords="244,110,250,116" title="Lutjebroek (E038a)" alt="Lutjebroek (E038a)" />
<area shape="rect" coords="221,121,227,127" title="Schermerhorn (E051p)" alt="Schermerhorn (E051p)" />
<area shape="rect" coords="213,132,219,138" title="Oost-Knollendam / West-Knollendam (E067q)" alt="Oost-Knollendam / West-Knollendam (E067q)" />
<area shape="rect" coords="204,137,210,143" title="Beverwijk (E079p)" alt="Beverwijk (E079p)" />
';
    $actual = $resp_val[1];
    file_put_contents(KAART_TESTDIRECTORY . '/' . $filenaam, $actual);
    $this->assertEquals($expected, $actual, "check file $filenaam");
  }

  function testComplexMapBitmap()
  {
    $filenaam = 'XMLRPCComplexMap.png';
    $msg = new XML_RPC_Message('kaart.createmap', $this->_getComplexParams('png'));
    $response = $this->_client->send($msg);
    $expected = array(
      '6173b3a1d52d23bbbbabada77e10804e',
      '28f862c4af0ae3ee442dc2cd71fe694a',
      'c68284b9f7359c14643e116c725d0411',
      'd29c6cc1af5531d748bbaa4287486277',
      '76db4e1f985b10447a51e276b6513d72',
        'bc298137efcda9e40512321cf7a81ef9'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testComplexMapBitmapWithoutLegend()
  {
    $filenaam = 'XMLRPCComplexMapWithoutLegend.png';
    $msg = new XML_RPC_Message('kaart.createmap', $this->_getComplexParams('png', array('drawlegend' => 0)));
    $response = $this->_client->send($msg);
    $expected = array(
      '90a93f07a55393a4cfbfb89d0c4a8f94',
        '673459022a776fc02583652ec3be2d38'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testComplexMapSVG()
  {
    $filenaam = 'XMLRPCComplexMap.svg';
    $msg = new XML_RPC_Message('kaart.createmap', $this->_getComplexParams('svg'));
    $response = $this->_client->send($msg);
    $expected = 'fc8676d015834ff96e66ab8364e8f816';
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertEquals($expected, $actual, "check file $filenaam");
  }


  function testComplexMapKML()
  {
    $filenaam = 'XMLRPCComplexMap.kml';
    $msg = new XML_RPC_Message('kaart.createmap', $this->_getComplexParams('kml'));
    $response = $this->_client->send($msg);
    $expected = '3967be2873090e44db4d73e545dc4383';
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertEquals($expected, $actual, "check file $filenaam");
  }

  function testComplexMapJSON()
  {
    $filenaam = 'XMLRPCComplexMap.json';
    $msg = new XML_RPC_Message('kaart.createmap', $this->_getComplexParams('json'));
    $response = $this->_client->send($msg);
    // afrondingsverschilletjes met RD -> latlong lokaal en op server
    $expected = array(
        '1a1e562c1492ea81fdc70c3e9432d731',
        'fef9a4c4e42cb30388bc40729c26af48',
        '4c51f7815dd821281f833dad6f90d7d3'
        );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testgetPossibleParts()
  {

    $msg = new XML_RPC_Message('kaart.getpossibleparts');
    $response = $this->_client->send($msg);
    $actual = join(',', XML_RPC_Decode($response->value()));
    $expected
      = 'nederland,vlaanderen,provincies_nederland,provincies_vlaanderen,rivieren_nederland,rivieren_vlaanderen,groningen,friesland,drente,overijssel,gelderland,utrecht,noord-holland,zuid-holland,zeeland,noord-brabant,limburg_nl,frans_vlaanderen,west-vlaanderen,oost-vlaanderen,antwerpen,brabant,limburg_be';

    $this->assertEquals($expected, $actual);
  }

  function testgetPossiblePlacemarks()
  {

    $msg = new XML_RPC_Message('kaart.getpossibleplacemarks');
    $response = $this->_client->send($msg);
    $placemarks = XML_RPC_Decode($response->value());
    $actual = $placemarks['A001a'];
    $expected = 'Baaiduinen / Baaidunen';

    $this->assertEquals($expected, $actual);
  }

  function testgetPossibleMunicipalities()
  {

    $msg = new XML_RPC_Message('kaart.getpossiblemunicipalities');
    $response = $this->_client->send($msg);
    $placemarks = XML_RPC_Decode($response->value());
    $actual = $placemarks['g_0003'];
    $expected = 'Appingedam';

    $this->assertEquals($expected, $actual);
  }


  function testgetPossibleAreas()
  {

    $type = new XML_RPC_Value('corop', 'string');
    $params = array($type);

    $msg = new XML_RPC_Message('kaart.getpossibleareas', $params);
    $response = $this->_client->send($msg);
    $placemarks = XML_RPC_Decode($response->value());
    $actual = $placemarks['corop_01'];
    $expected = 'Oost-Groningen';

    $this->assertEquals($expected, $actual);
  }

  function testgetPossibleAreasError()
  {

    $type = new XML_RPC_Value('dutchlanguagearea', 'string');
    $params = array($type);

    $msg = new XML_RPC_Message('kaart.getpossibleareas', $params);
    $response = $this->_client->send($msg);
    $actual = $response->faultString();
    $expected = 'Wrong maptype for this method';

    $this->assertEquals($expected, $actual);
  }


  function testMunicipalitiesMap()
  {

    $filenaam = 'XMLRPCMunicipalitiesMap.png';
    $format = new XML_RPC_Value('png', 'string');
    $type = new XML_RPC_Value('gemeentes', 'string');
    $extraparams = new XML_RPC_Value(array('type' => $type), 'struct');
    $params = array($format, $this->_municipalities, $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = array(
        '145abfc6b0736c6899467c630d74f839',
        '91308569348b922140c1a8ac5b8cb45f'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testImagemapMunicipalities()
  {

    $filenaam = 'XMLRPCimagemapMunicipalities.html';
    $format = new XML_RPC_Value('png', 'string');
    $interactive = new XML_RPC_Value(TRUE, 'boolean');
    $imagemap = new XML_RPC_Value(TRUE, 'boolean');
    $type = new XML_RPC_Value('gemeentes', 'string');
    $extraparams = new XML_RPC_Value(array(
      'interactive' => $interactive, 'imagemap' => $imagemap, 'type' => $type
    ), 'struct');
    $params = array($format, $this->_municipalities, $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $resp_val = XML_RPC_Decode($response->value());
    $expected = '7c25963e00c3ffba8b18e355d51cc6d4';
    $actual = md5($this->_saveFile($filenaam, $resp_val[1]));
    $this->assertEquals($expected, $actual, "check file $filenaam");
  }


  function testCoropMap()
  {
    $filenaam = 'XMLRPCCoropMap.png';
    $format = new XML_RPC_Value('png', 'string');
    $type = new XML_RPC_Value('corop', 'string');
    $extraparams = new XML_RPC_Value(array('type' => $type), 'struct');
    $params = array($format, new XML_RPC_Value(array(), 'struct'), $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = array(
        'afc8a05120c036fb2b7392b9879a6488',
        'cf36a1841866697978a0be61b9bcc847'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }


  function testProvincesMap()
  {
    $filenaam = 'XMLRPCProvincesMap.png';
    $format = new XML_RPC_Value('png', 'string');
    $type = new XML_RPC_Value('provincies', 'string');
    $extraparams = new XML_RPC_Value(array('type' => $type), 'struct');
    $params = array($format, new XML_RPC_Value(array(), 'struct'), $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = array(
        '4bd0e89f3ffda6eb21065c6ccc1717c6',
        'b01123d178ebff83d70cfce011ecf09b'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }


  function testsetAdditonalData()
  {
    $filenaam = 'XMLRPCAdditionaldata.png';
    $format = new XML_RPC_Value('png', 'string');
    $type = new XML_RPC_Value('gemeentes', 'string');
    $provincies = new XML_RPC_Value('provincies', 'string');
    $additionaldata = new XML_RPC_Value(array($provincies), 'array');
    $extraparams = new XML_RPC_Value(array('type' => $type, 'additionaldata' => $additionaldata), 'struct');
    $params = array($format, new XML_RPC_Value(array(), 'struct'), $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = array(
        '298e1f7db5b6c1d03c53dd07e47e2b23',
        '94f2c276aa2f01e27e60e64556146175'
    );
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertContains($actual, $expected, "check file $filenaam");
  }

  function testCreateMunicipalitiesSVGWithLinkNonInteractiveHighlightedOnly()
  {
    $filenaam = 'XMLRPCWithLinkNonInteractiveHighlightedOnly.svg';

    $format = new XML_RPC_Value('svg', 'string');
    $type = new XML_RPC_Value('gemeentes', 'string');
    $link = new XML_RPC_Value("http://www.example.com/?code=%s", 'string');

    $true = new XML_RPC_Value(TRUE, 'bool');
    $extraparams = new XML_RPC_Value(array('type' => $type, 'linkhighlightedonly' => $true, 'link' => $link), 'struct');
    $params = array($format, $this->_municipalities, $extraparams);

    $msg = new XML_RPC_Message('kaart.createmap', $params);
    $response = $this->_client->send($msg);
    $expected = '476d66cda9170be85b58d769b3215908';
    $actual = md5($this->_saveFile($filenaam, XML_RPC_Decode($response->value())));
    $this->assertEquals($expected, $actual, "check file $filenaam");
  }



}

