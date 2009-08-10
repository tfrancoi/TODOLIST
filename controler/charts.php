<?php
	if(isset($_GET['task']) && $_GET['task'] == "datechart") {
		
		$db->open();
		$result = nb_task_by_date($db);
		$db->close();
		
		$out = array();
		while($resultat = mysql_fetch_assoc($result)) {
			$rec = array();
			$rec[] = $resultat[da];
			$rec[] = $resultat[nb];			
			$out[] = $rec;
			
			
		}
		
		$file = fopen("file" , "a+");
		fputs($file, "Texte à écrire");
		fclose($file);
		
		echo '{success: true, rows:'.json_encode($out).'}';
	}


?>
