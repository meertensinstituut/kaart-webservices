<?php
use PHPUnit\Framework\TestCase;

echo "Testing REST services on " . KAART_SERVER_HOSTNAME .':' . KAART_SERVER_PORT . KAART_SERVER_PATH . "\n";

class KaartRESTTest extends TestCase
{

    private $_ch;
    private $_base_url;

    function setUp(): void
    {
        $this->_base_url = KAART_SERVER_PROTOCOL . '://' . KAART_SERVER_HOSTNAME .':' . KAART_SERVER_PORT . KAART_SERVER_PATH . 'rest/';
        $this->_ch = curl_init();
        curl_setopt($this->_ch, CURLOPT_RETURNTRANSFER, 1);
    }

    function tearDown(): void
    {
        curl_close($this->_ch);
    }

    private function _saveFile($filename, $data)
    {
        file_put_contents(KAART_TESTDIRECTORY . '/' . $filename, $data);
        return file_get_contents(KAART_TESTDIRECTORY . '/' . $filename);
    }

    private function _setupJSONRequest($url, $file)
    {
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_POST, 1);
        $json = file_get_contents($file);
        curl_setopt(
            $this->_ch, CURLOPT_HTTPHEADER, array('Content-type: application/json', 'Content-length: ' . strlen($json))
        );
        curl_setopt($this->_ch, CURLOPT_POSTFIELDS, $json);
    }

    function testGetBitmapMunicipalities()
    {
        $filenaam = 'RESTMunicipalities.png';
        $url = $this->_base_url . '?type=gemeentes&format=png';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array('ee1b6668ffa8a8dd7a96d5e3f23d2c48','3e7cf3664edccb874e4c96c3c49c2274');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateSimpleKloekeMap1()
    {
        $filenaam = 'RESTSimpleKloekeMap1.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&width=300';
        $this->_setupJSONRequest($url, './data/simplekloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '26a8eddfdec632470349e2cb9aa12964',
            'ed143bde5d4c69e286847ef0a89c47bb',
            '1de4ad95da49ffc2b7b7df88541d31ab'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateSimpleKloekeMap2()
    {
        $filenaam = 'RESTSimpleKloekeMap2.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&width=300';
        $this->_setupJSONRequest($url, './data/simplekloekelist_object_data.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '26a8eddfdec632470349e2cb9aa12964',
            'ed143bde5d4c69e286847ef0a89c47bb',
            '1de4ad95da49ffc2b7b7df88541d31ab'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateSimpleKloekeMapWithLink()
    {
        $filenaam = 'RESTSimpleKloekeMapWithLink.svg';
        $url = $this->_base_url
            . '?type=dutchlanguagearea&format=svg&width=300&link=http%3A%2F%2Fwww.example.com%2F%3Fcode%3D%25s';
        $this->_setupJSONRequest($url, './data/simplekloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = '42157a08fc023146f018348ac1905dcc';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testCreateSimpleKloekeMapWithBackground()
    {
        $filenaam = 'RESTSimpleKloekeMapBackground.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png';
        $this->_setupJSONRequest($url, './data/simplekloekelist_background.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '54607debcb56d2e42ca16d34da27c387',
            'fc2c3f7244c94bb128cec5b68cf5fd4d',
            '4c80f7618149fdade6ee365fa1899395',
            '05325c43fb81bf6e4d9281ad69e45a08'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreatePartialKloekeMap()
    {
        $filenaam = 'RESTPartialKloekeMap.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png';
        $this->_setupJSONRequest($url, './data/partialmap.json');
        $kaart = curl_exec($this->_ch);
        $expected = array('170736803227f7838035e04563a1995e','dd1abad986df92af29f095b8c56356be');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateFrequencyMap()
    {
        $filenaam = 'RESTFrequencyMap.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&maptype=frequency';
        $this->_setupJSONRequest($url, './data/frequencymap.json');
        $kaart = curl_exec($this->_ch);
        $expected = array('c02f01939545dbac5f68ea1907fbd8c0','27631531d3f7d57c2ae461143a409fec');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testRemoveDuplicates()
    {
        $filenaam = 'RESTRemoveDuplicates.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&removeduplicates=1';
        $this->_setupJSONRequest($url, './data/removeduplicates.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'f370b2290853e024a6c28ed3437371a0',
            'ebbb1050cd369983c351cce41e4606c9',
            '092ab2a8784de3a91965e7e794cf3acf',
            '815a18e9831d26af00aedc63ceec1f77',
            '2de60ecb01257ae9cd50d92915de2a9f',
            '0e2688b7a4ba9e41f6b7c1c29c1b9710'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testKeepDuplicates()
    {
        $filenaam = 'RESTKeepDuplicates.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png';
        $this->_setupJSONRequest($url, './data/removeduplicates.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '88512c03930d4488aec9c19921a3a5ae',
            '5e3a9f5096a2c8b9ebda657da0db02ba',
            'fa64a86efc5e3de2c9ccd6473ad606b2',
            '18bc2c5cdfa008dce8f0fc02caccbc29',
            '29b70f871ea006e89db86f9c3c8ac268',
            '53e59ee5b339a610c0d00e4b99daf153'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testInvalidJSON()
    {
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png';
        curl_setopt($this->_ch, CURLOPT_HEADER, 1);
        curl_setopt($this->_ch, CURLOPT_NOBODY, 1);
        $this->_setupJSONRequest($url, './data/simplekloekelist_syntax_error.json');
        $expected = array('HTTP/1.1 400', 'HTTP/2 400');
        $page = curl_exec($this->_ch);
        $assertion = False;
        foreach($expected as $str) {
            if (str_starts_with($page, $str)) {
                $assertion = True;
                break;
            }
        }
        $this->assertTrue($assertion);
    }


    function testCreateHighlightedMunicipalitiesMap()
    {
        $filenaam = 'RESTHighlightedMunicipalitiesMap.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&width=500';
        $this->_setupJSONRequest($url, './data/simplemunicipalitieslist.json');
        $kaart = curl_exec($this->_ch);
        $expected = array('10b9b11807c5156f76d6c264b4f77a25','726e97f7f9621d9ec32e67061acbf577');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateMunicipalitiesImagemapWithLinksNonInteractive()
    {
        $filenaam = 'RESTimagemapMunicipalitiesWithLinksNonInteractive.html';
        $url = $this->_base_url . '?type=gemeentes&format=png&imagemap=1';
        $this->_setupJSONRequest($url, './data/complexmunicipalitieslist.json');
        $kaart = curl_exec($this->_ch);
        $expected = '9ed3af5afec772ec48d2f582ef93fbf6';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testCreateMunicipalitiesImagemapWithLinksInteractive()
    {
        $filenaam = 'RESTimagemapMunicipalitiesWithLinksInteractive.html';
        $url = $this->_base_url . '?type=gemeentes&format=png&imagemap=1&interactive=1';
        $this->_setupJSONRequest($url, './data/complexmunicipalitieslist.json');
        $kaart = curl_exec($this->_ch);
        $expected = 'e80a29d5d91b76e9dade8e03206eca54';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }


    function testCreateMunicipalitiesImagemapWithLinkNonInteractiveHighlightedOnly()
    {
        $filenaam = 'RESTimagemapMunicipalitiesWithLinkNonInteractiveHighlightedOnly.html';
        $url = $this->_base_url . '?type=gemeentes&format=png&imagemap=1&linkhighlightedonly=1';
        $this->_setupJSONRequest($url, './data/complexmunicipalitieslist_link.json');
        $kaart = curl_exec($this->_ch);
        $expected = '506054c463c5337747b858cc77a63f1f';
        file_put_contents(KAART_TESTDIRECTORY . '/' . $filenaam, $kaart);
        $actual = md5(file_get_contents(KAART_TESTDIRECTORY . '/' . $filenaam));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }


    function testCreateMunicipalitiesSVGWithLinkNonInteractiveHighlightedOnly()
    {
        $filenaam = 'RESTMunicipalitiesWithLinkNonInteractiveHighlightedOnly.svg';
        $url = $this->_base_url . '?type=gemeentes&format=svg&&linkhighlightedonly=1';
        $this->_setupJSONRequest($url, './data/complexmunicipalitieslist_link.json');
        $kaart = curl_exec($this->_ch);
        $expected = '03de332d92fe528b4e5686573a2b6a5b';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }


    function testCreateMunicipalitiesImagemapWithTooltipsNonInteractive()
    {
        $filenaam = 'RESTMunicipalitiesImagemapWithTooltipsNonInteractive.html';
        $url = $this->_base_url . '?type=gemeentes&format=png&imagemap=1';
        $this->_setupJSONRequest($url, './data/tooltips.json');
        $kaart = curl_exec($this->_ch);
        $expected = '200cf01525513563088be1cfb36f327f';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testMunicipalitiesInteractiveSVG()
    {
        $filenaam = 'RESTMunicipalitiesInteractive.svg';
        $url = $this->_base_url . '?type=municipalities&interactive=1&format=svg';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = 'f22695fe3586977b5546e6c8505f75f9';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testCreateComplexKloekeMap()
    {
        $filenaam = 'RESTComplexKloekeMap.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&width=450';
        $this->_setupJSONRequest($url, './data/complexkloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '1e5207230c5472b0f45a1f10697f959f',
            '0f493b7a818e825c2e00a0890995e912',
            'b7dba8090b49a192d1de9c3871b9d1dd',
            'b7cf33e06663ced30565a2c9754ee77f',
            '81aba118add407f98dad54912b92903a'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateComplexKloekeMapWithoutLegend()
    {
        $filenaam = 'RESTComplexKloekeMapWithoutLegend.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&width=450&drawlegend=0';
        $this->_setupJSONRequest($url, './data/complexkloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'f900a7158c6b3ad944ae2aace154ee78',
            'a32666b35104de1d59d3c3e72377ca6d'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateComplexKloekeMapSVG()
    {
        $filenaam = 'RESTComplexKloekeMap.svg';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=svg&width=450';
        $this->_setupJSONRequest($url, './data/complexkloekelist2.json');
        $kaart = curl_exec($this->_ch);
        $expected = array('6a06cea79b131aebe5720222764928b5', '4e09bd73501ad2938f4c8041b447748d');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateComplexKloekeMapJSON()
    {
        $filenaam = 'RESTComplexKloekeMap.json';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&format=json';
        $this->_setupJSONRequest($url, './data/complexkloekelist.json');
        $kaart = curl_exec($this->_ch);
        // afrondingsverschilletjes met RD -> latlong lokaal en op server
        $expected = array(
            '171af9dd3d383eaae2c4be80d5167a0a',
            'cd7f52c666ba60e92395246620511d3b',
            '3ef1a82833aeb400e73009d9fe65c496'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateComplexKloekeMapKML()
    {
        $filenaam = 'RESTComplexKloekeMap.kml';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&format=kml';
        $this->_setupJSONRequest($url, './data/complexkloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = '4e8d6d8d6f25cfabe096246c56d339cf';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }


    function testConfiginJSON()
    {
        $filenaam = 'RESTconfiginJSON.png';
        $url = $this->_base_url;
        $this->_setupJSONRequest($url, './data/completemapconfig.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '21d5594a2d8c739d80b32d5d8fbdcfbb',
            '99a3e44d7597aa5cb2adcf10462d0f63',
            '156f2c21f90277be87ace226101cc8d8',
            'c03b18fdf6459e18e18a65d4c43ca40c',
            '5934fe24fba0d72757e66d8be3c8a695'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testGETstringPrimacy()
    {
        $filenaam = 'RESTGETstringPrimacy.svg';
        $url = $this->_base_url . '?format=svg&title=Komt+uit+GETstring';
        $this->_setupJSONRequest($url, './data/completemapconfig.json');
        $kaart = curl_exec($this->_ch);
        $expected = '478f163b72edc6866af3517e4cb245d4';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testImagemapMunicipalities()
    {
        $filenaam = 'RESTimagemapMunicipalities.html';
        $url = $this->_base_url . '?type=gemeentes&format=png&imagemap=1';
        $this->_setupJSONRequest($url, './data/simplemunicipalitieslist.json');
        $kaart = curl_exec($this->_ch);
        $expected = '27e43b180c01de7bc27e4bbbb15a7187';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testImagemapKloekes()
    {
        $filenaam = 'RESTimagemapKloekes.html';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&imagemap=1';
        $this->_setupJSONRequest($url, './data/simplekloekelist.json');
        $kaart = curl_exec($this->_ch);
        $expected = '9a49c9532ebb6d1695d99d81e94ccc8a';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testGetPossibleParts()
    {
        $filenaam = 'possibleparts.json';
        $url = $this->_base_url . '?possibleparts=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = 'c54b0d08411c55654b50fdbe1f06d81a';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");

        $filenaam = 'possibleparts_empty.json';
        $url = $this->_base_url . '?possibleparts=1&type=gemeentes';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = '[]';
        $actual = $this->_saveFile($filenaam, $kaart);
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testGetPossiblePlacemarks()
    {
        $filenaam = 'possibleplacemarks.json';
        $url = $this->_base_url . '?possibleplacemarks=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array('82c778a2a458287777cee07cde2f9af0', 'eb9c1627309ff4b96c9342dc40e1b791');
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testGetPossiblePlacemarksComplete()
    {
        $filenaam = 'possibleplacemarkscomplete.json';
        $url = $this->_base_url . '?possibleplacemarks=1&complete=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $expected = array(
            "kloekecode" => "A001a", "placename" => "Baaiduinen / Baaidunen", "rd_x" => "145102.30541305",
            "rd_y" => "599755.88683356", "lat" => "53.3851897037", "lng" => "5.23887188063"
        );
        $kaart = curl_exec($this->_ch);

        $this->_saveFile($filenaam, $kaart);
        $this->assertEquals($expected, json_decode($kaart, true)[0], "check file $filenaam");
    }


    function testGetPossibleMunicipalities()
    {
        $filenaam = 'possiblemunicipalities.json';
        $url = $this->_base_url . '?possiblemunicipalities=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = 'd1b6cc8773f9a13b24d77f5b894ea519';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testBase64Map()
    {
        $filenaam = 'RESTBase64Map.txt';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&width=300&base64=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '38ce6f2c72f002e21aa584f392494fc4',
            'e30541f8bc39519d72a5d97bece75ad0',
            '2fec57c832624b91adb16fe1ddccf402',
            '044ec46d53ebc18ea9b11377c98793d8'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testXSSAttack()
    {
        $filenaam = 'RESTXSSAttack.svg';
        $url = $this->_base_url
            . '?type=municipalities&format=svg&link=%22%3E%3C/a%3E%3C/g%3E%3C/g%3E%3Cg%20transform=%22scale%281000%29%22%3E%3Ctext%20x=%22100%22%20y=%2240%22%20fill=%22red%22%20transform=%22rotate%2830%2020,40%29%22%3EJAN%20PIETER!!!%3C/text%3E%3Cimage%20x=%2220%22%20y=%22200%22%20width=%22300%22%20height=%2280%22%20xlink:href=%22http://www.janpieterkunst.nl/jpk.jpg%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%287324,624118%29%20scale%281,-1%29%22%3E%3Cg%3E%3Ca%20xlink:href=%22';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = 'b97371ddf9650d30a648d94a64c1cb9d';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

    function testGetPossibleAreas()
    {
        $filenaam = 'possibleareas.json';
        $url = $this->_base_url . '?possibleareas=1&type=corop';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = '8af7136556368a5ee32336a9bf717611';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");

        $filenaam = 'possibleareas_provincies.json';
        $url = $this->_base_url . '?possibleareas=1&type=provincies';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = '752b4bf92f4cfb4940d577329f121403';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");

        $filenaam = 'possibleareas_empty.json';
        $url = $this->_base_url . '?possibleareas=1&type=dutchlanguagearea';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = '[]';
        $actual = $this->_saveFile($filenaam, $kaart);
        $this->assertEquals($expected, $actual, "check file $filenaam");

        $url = $this->_base_url . '?possibleareas=1';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HEADER, 1);
        curl_setopt($this->_ch, CURLOPT_NOBODY, 1);
        $expected = array('HTTP/1.1 400', 'HTTP/2 400');
        $page = curl_exec($this->_ch);
        $assertion = False;
        foreach($expected as $str) {
            if (str_starts_with($page, $str)) {
                $assertion = True;
                break;
            }
        }
        $this->assertTrue($assertion);
    }

    function testsetAdditionalAreasCorop()
    {
        $filenaam = 'RESTadditionaldataCorop.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&additionaldata=corop&width=800';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '212d1f7b23be380e73cd521d5f62be81',
            '73ad07a2fc507d1631821cc83baccc33'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testsetAdditionalAreasProvinces()
    {
        $filenaam = 'RESTadditionaldataProvinces.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&additionaldata=provinces&width=800';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'd347020e138ff9dc982ae2ddbbfd3ad0',
            '4054fa9f5b22232c1ac6863ec2daf23d'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testsetAdditionalAreasDialect()
    {
        $filenaam = 'RESTadditionaldataDialect.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&additionaldata=dialectareas&width=800';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'e67279b75674e50f81abd7f9e6f5439c',
            '926174fa6d748a54c5b35175a9687d99'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }


    function testsetBackgroundInAdditionalData()
    {
        $filenaam = 'RESTbackgroundinadditionaldata.png';
        $url = $this->_base_url . '?type=dutchlanguagearea&format=png&additionaldata=daan_blok_1969';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'cec74778b30813444e58bcb70cc8679b',
            'be8ee682dd28229c50abd13e28392508'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }


    function testHighlightedCorop()
    {
        $filenaam = 'RESTHighlightedCoropMap.png';
        $url = $this->_base_url . '?type=corop&format=png&width=500';
        $this->_setupJSONRequest($url, './data/simplecoroplist.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '717256d07cfbd3e57608895b070e50f0',
            'ec677365bb6f1f2652af7d1802c1d365'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCreateHighlightedMunicipalitiesNLFlandersMap()
    {
        $filenaam = 'RESTHighlightedMunicipalitiesNLFlandersMap.png';
        $url = $this->_base_url . '?type=municipalities_nl_flanders&format=png';
        $this->_setupJSONRequest($url, './data/simplemunicipalitieslist_nl_flanders.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '14c1ecdacf37c0691c537e66c5479358',
            '4f7e92d74cb20a750ec3d56778033c9a'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testVragenlijstenKaart()
    {
        $filenaam = 'RESTvragenlijstenkaart.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&width=600&additionaldata=corop';
        $this->_setupJSONRequest($url, './data/data_vragenlijsten.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '9fe05846c1e66c693d59fe4ca98df9a8',
            'f1a81c59f516e7e99c3418bd9f4a3162'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testOutlinedProvincie()
    {
        $filenaam = 'RESTOutlinedProvincie.png';
        $url = $this->_base_url . '?type=gemeentes&format=png&width=600&additionaldata=provincies';
        $this->_setupJSONRequest($url, './data/data_outlined_provincie.json');
        $kaart = curl_exec($this->_ch);
        $expected = array(
            'b3d34000384e586bca0ffa2b10973536',
            'c4b50746431fa4336050166cb23149c0'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testCSVFileUpload()
    {
        $filenaam = 'RESTuploadCSV.png';
        $url = $this->_base_url . '?type=dialectareas&format=png&width=400';
        $curlFile = new CURLFile('./data/dialectareas.csv', 'text/plain', './dialectareas.csv');
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_POST, 1);
        curl_setopt($this->_ch, CURLOPT_POSTFIELDS, [
            'file' => $curlFile,
        ]);
        curl_setopt(
            $this->_ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data')
        );
        $kaart = curl_exec($this->_ch);
        $expected = array(
            '03c78df355d7aa86f1b0eac0f6452289',
            '25f309665126c7a2a5ec42df9474944f'
        );
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertContains($actual, $expected, "check file $filenaam");
    }

    function testAlternatePathsfile()
    {
        // Ermelo en Nunspeet gecombineerd
        $filenaam = 'RESTAlternatePathsFile.svg';
        $url = $this->_base_url . '?type=municipalities&format=svg&interactive=1&pathsfile=municipalities_migmap.inc.php';
        curl_setopt($this->_ch, CURLOPT_URL, $url);
        curl_setopt($this->_ch, CURLOPT_HTTPGET, 1);
        $kaart = curl_exec($this->_ch);
        $expected = '604a15fba908e27f64b2e8f47b475613';
        $actual = md5($this->_saveFile($filenaam, $kaart));
        $this->assertEquals($expected, $actual, "check file $filenaam");
    }

}


