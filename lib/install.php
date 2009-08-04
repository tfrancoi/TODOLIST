<?php

	$main = true;
	include("param.php");
	include("mysql_connexion.class.php");
	include("table.php");
	include("contrainte.php");
	include("data.php");
		
	$create = "CREATE DATABASE `ski`";
	$use = "USE `ski`";
	

	$db = new Connection($db_server, $db_user, $db_mdp, $db_name);
	$db->open();
	$db->query($create);
	
	
	echo "<p>";
	foreach($table as $key=>$value) {
		echo "creation de la base $key <br />";
		$db->query($value);
	}	
	echo "</p>";
	
	$db->query($use);
	
	echo "<p>";
	foreach($contrainte as $key => $value) {
		echo "application de la contrainte $key <br />";
		$db->query($value);
	}
	echo "</p>";
	create_data($db);
	
	
	$db->close(); 
?>
