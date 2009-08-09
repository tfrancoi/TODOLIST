<?php
	$ORDER_DEADLINE = "deadline";
	$ORDER_NAME = "name";
	$ORDER_CATEGORY = "category";
	$ORDER_PRIORITY = "ordre";

	function insert_task($db, $name, $lateness, $deadline, $priority, $category) {
		$sql = "INSERT INTO task (id, name, lateness, deadline, priority, category) VALUES ('', '$name', '$lateness', '$deadline', '$priority', '$category')";
		$db->query($sql);
		$id = $db->lastId();
		return $id;
	}
	
	function list_task_all($db, $order) {
		$sql = "SELECT done, task.id AS id, category.name AS category, priority.color AS color, priority.name AS priority, task.name AS name, ".
			   "deadline, lateness, ordre FROM task, category, priority ".
			   "WHERE category.id = task.category AND priority.id = task.priority ORDER BY $order";

		return $db->query($sql);
			   
	}
?>
