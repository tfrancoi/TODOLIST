<?php
	$ORDER_DEADLINE = "deadline";
	$ORDER_NAME = "name";
	$ORDER_CATEGORY = "category";

	function insert_task($db, $name, $lateness, $deadline, $priority, $category) {
		$sql = "INSERT INTO task (id, name, lateness, deadline, priority, category) VALUES ('', '$name', '$lateness', '$deadline', '$priority', '$category')";
		$db->query($sql);
		$id = $db->lastId();
		return $id;
	}
	
	function list_task_all($db, $order) {
		$sql = "SELECT * FROM task ORDER BY $order";
		return $db->query($sql);
			   
	}
?>
