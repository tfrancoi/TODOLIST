<?php

	function list_category_all($db) {
		$sql = "SELECT * FROM category ORDER BY name";
		return $db->query($sql);
			   
	}


?>
