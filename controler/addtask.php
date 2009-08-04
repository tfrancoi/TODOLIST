<?php
	//echo "salut";
	if(isset($_GET['task']) && $_GET['task'] == "infonewtask") {
		$category = array();
		$priority = array();
		
		$db->open();
		$result = list_priority_all($db);
		$result_cat = list_category_all($db);
		$db->close();
		$page = $template->Open("view/addtask.html");
		while($resultat = mysql_fetch_assoc($result)) {
			$rec = array();
			$rec[] = $resultat[id];
			$rec[] = $resultat[name];
			$rec[] = $resultat[color];
			$priority[] = $rec;
		}
		
		while($resultat = mysql_fetch_assoc($result_cat)) {
			$rec = array();
			$rec[] = $resultat[id];
			$rec[] = $resultat[name];
			
			$category[] = $rec;
		}
		
		//print_r($priority);
		echo '{data_priority:'.json_encode($priority).', data_category:'.json_encode($category).'}';
	}
	
	if(isset($_GET['task']) && $_GET['task'] == "addtask") {
		
		if(isset($_POST['name']) && $_POST['name'] != '') {
			
			
			$name = $_POST['name'];
			if(isset($_POST['lateness']) AND $_POST['lateness'] == 'on') {
				$lateness = 1;
			}
			else {
				$lateness = 0;
			}
			
			
			$deadline = $_POST['deadline'];
			$priority = $_POST['priority'];
			$category = $_POST['category'];
			
			$db->open();
			insert_task($db, $name, $lateness, $deadline, $priority, $category);
			$db->close();
			echo '{success:true}';
		}
		else {
			echo '{success:false}';
		}
	}
	
	
	/*
	if(isset($_POST['name'])) {
			
			
	}
	
	*/

?>


