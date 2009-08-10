<?php

	function list_priority_all($db) {
		$sql = "SELECT * FROM priority ORDER BY ordre";
		return $db->query($sql);
			   
	}


?>
