<?php
//les lib
include("lib/template.class.php");
//include("lib/date_util.php");
include("lib/mysql_connexion.class.php");
//les paramètres
include("lib/param.php");

//inclus les modèles
//include("model/sejour_logement.model.php");
//include("model/attraction.model.php");
//include("model/accident.model.php");
//include("model/piste.model.php");
include("model/priority.model.php");
include("model/category.model.php");
include("model/task.model.php");
$template = new VTemplate();
$fichier = $template->Open("design.html");


$db = new Connection($db_server, $db_user, $db_mdp, $db_name);





//ici on inclus la page qu'il faut
$_page = array ('accueil' => 'accueil.php',
				'addtask' => 'addtask.php');
				   
$_js = array('addtask' => 'addTask.js');
				   
if(isset($_GET['page'])) {
	$temp = $_GET['page'];
	include("controler/$_page[$temp]");	
	$template->addSession($fichier, "inc");
	$template->setVar($fichier, "inc.include" ,"\"js/$_js[$temp]\"");
	$template->closeSession($fichier, "inc");
}
else {
	include("controler/accueil.php");
}


if(!isset($page)) {
	$page = "cette page n'existe pas";	
}

/*

$template->addSession($fichier, "corps");
$template->Parse($fichier, "corps.main" , $page);
$template->closeSession($fichier, "corps");*/

if(!isset($_GET['task'])) {
	$template->Display($fichier); //affichage du résultat
}



?>
