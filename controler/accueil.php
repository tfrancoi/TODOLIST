<?php

$db->open();
$result = list_task_all($db, $ORDER_NAME);
$db->close();
while($resultat = mysql_fetch_assoc($result)) {
	echo $resultat[name];
	echo $resultat[deadline];
	
}
$page = $template->Open("view/accueil.html");






?>
