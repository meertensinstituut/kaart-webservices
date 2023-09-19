<?php

function dumpdata($data, $destination = 'f', $die = FALSE) {
	
	if ($destination == 'f') {
		$fh = fopen('/tmp/dump' . date('Y-m-d') . '.txt', 'a+');
		ob_start();
	} else {
		echo '<pre>';
	}
	
	$a = debug_backtrace();
	print basename($a[0]['file']).":{$a[0]['line']}\n";
	if (is_array($data) || is_object($data)) {
		print_r($data);
	} else {
		var_dump($data);
	}
	if ($destination == 'f') {
		$text = ob_get_contents();
		fwrite($fh, $text);
		fclose($fh);
		ob_end_clean();
	} else {
		echo '</pre>';
	}

	if ($die) {
		die;
	}
}

?>