<?php
if(isset($_GET['task']) && $_GET['task'] == "infotask")  {
	
	$re = array();
	$db->open();
	$result = list_task_all($db, $ORDER_NAME);
	$db->close();
	while($resultat = mysql_fetch_assoc($result)) {
		$rec = array();
		$rec[] = $resultat[id];
		$rec[] = $resultat[name];
		$rec[] = $resultat[category];
		$rec[] = $resultat[color];
		$rec[] = $resultat[priority];
		$rec[] = $resultat[deadline];
		$rec[] = $resultat[lateness];
		$rec[] = $resultat[ordre];
		$rec[] = $resultat[done];
		$re[] = $rec;
		
		
	}
	
	echo '{success: true, rows:'.json_encode($re).'}';
	

}

else if(isset($_GET['task']) && $_GET['task'] == "updatetask")  {
	$id = $_GET['id'];
	$field = $_GET['field'];
	$value = $_GET['value'];
	
	$db->open();
	update_task($db, $field, $value, $id);
	$db->close();
	

	echo '{success : true}';
}



?>
