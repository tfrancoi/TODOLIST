<?php
	function isdate($string) {
		list($year, $month, $day) = split("-" , $string);
		return (is_numeric($year) && is_numeric($month) && is_numeric($day) && 
				strlen($year) == 4 && strlen($month) == 2 && strlen($day) == 2);
		
	}
	
	function datecmp($date1, $date2) {
		return strcmp($date1, $date2);
	}
	
	
	function isheure($time) {
		list($heure, $minute) = split(":" , $time);
		return (is_numeric($heure) && is_numeric($minute) && $heure <= 24 && $minute <= 59);
	}
	
	function timeToHeure($time) {
		list($heure, $minute) = split(":" , $time);
		return array($heure, $minute);
	}
	
	function inarray($element, $array) {
		foreach($array as $key => $value) {
			if($value == $element) {
				return true;
			}
		}
		return false;
	}

?>
