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
	echo '{success:true, rows:'.json_encode($re).'}';
	

}




?>
