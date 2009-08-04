<?php
	if(isset($_POST['type']) && isset($_POST['prix'])) {
		$type = $_POST['type'];
		$prix = $_POST['prix'];
		if($prix == 0) {
			$prix = 10000000;
		}
		if($type == 'all') {
			$all = true;
		}
		else {
			$all = false;
		}
		$element = array('all', 'piscine', 'patinoire', 'bobsleigh', 'rampe de saut a ski', 'cinema');
		//check les données
		if(inarray($type, $element) && is_numeric($prix)) {
			$db->open();
			if($all) {
				$result = list_attraction_all($db, $prix);
			}
			else {
				$result = list_attraction($db, $prix, $type);
			}
			$db->close();
			$page = $template->Open("view/resultattraction.html");
			while($resultat = mysql_fetch_assoc($result)) {
				$debut = "$resultat[heure_debut]:$resultat[minute_debut]";
				$fin = "$resultat[heure_fin]:$resultat[minute_fin]";
				
				
				$template->addSession($page, "resultat");
				$template->setVar($page, "resultat.nom" , $resultat[nom]);
				$template->setVar($page, "resultat.capa" , $resultat[capacite]);
				$template->setVar($page, "resultat.prix" , $resultat[prix]);
				$template->setVar($page, "resultat.operateur" , $resultat[nomop]);
				$template->setVar($page, "resultat.ouverture" , $debut);
				$template->setVar($page, "resultat.fermeture" , $fin);
				
				$template->closeSession($page, "resultat");
			}
		}
		else {
			$page = $template->Open("view/attraction.html");
		}
	}
	else {
		$page = $template->Open("view/attraction.html");
	}	

?>


