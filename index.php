<?php
//les lib
include("lib/template.class.php");
//include("lib/date_util.php");
include("lib/mysql_connexion.class.php");
//les paramètres
include("lib/param.php");

//inclus les model
include("model/priority.model.php");
include("model/category.model.php");
include("model/task.model.php");

//charge le desgin html
$template = new VTemplate();
$fichier = $template->Open("design.html");

//crée objet connection pour les controllers
$db = new Connection($db_server, $db_user, $db_mdp, $db_name);





//ici on inclus la page qu'il faut
$_page = array ('accueil' => 'viewTask.php',
				'addtask' => 'addTask.php',
				'charts'  => 'charts.php' );
				   

				   
if(isset($_GET['page'])) {
	$temp = $_GET['page'];
	
}
else {
	$temp = 'accueil';
	
}

include("controler/$_page[$temp]");	


//si on a une tâche à effectué on affiche pas le design, la sortie est pour l'appel ajax
if(!isset($_GET['task'])) {
	$template->Display($fichier); //affichage du résultat
}



?>
