<?php
	function afficher($template, $erreur) {
		$page = $template->Open("view/accident.html");
		$template->addSession($page, "erreur");
		$template->setVar($page, "erreur.error" , $erreur);
		$template->closeSession($page, "erreur");
		return $page;
	}


	if(isset($_POST['heure']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['type'])) {
		$heure = $_POST['heure'];
		$nom = $_POST['nom'];
		$prenom = $_POST['prenom'];
		$type = $_POST['type'];
		if(isheure($heure)) {
			$time = timeToHeure($heure);
			
			$db->open();
			$result = find_touriste($db, $nom, $prenom);
			$resultat = mysql_fetch_assoc($result);
			if($resultat == false) {
				$erreur = '<p class="error">Le touriste n\'existe pas</p>';
				$page = afficher($template, $erreur);
			}
			else {
				$result =  find_secourist($db, $time[0], $time[1], $type);				
				$resultat1 = mysql_fetch_assoc($result);
								
				if($resultat1 == false) {
					$erreur = '<p class="error">Nous n\'avons pas trouvé de secouriste compétent présent sur le site. <br />
					L\'accident est malgré tout enregistré</p>';
					$page = afficher($template, $erreur);
					insert_accident($db, 'NULL', $resultat[id]);
				}
				else {
					insert_accident($db, $resultat1[id], $resultat[id]);
					$erreur = '<p class="error">Nous avons bien enregistré l\'accident. Le secouriste '. $resultat1[nom] .' va 
					venir sur les lieux !</p>';
					$page = afficher($template, $erreur);
				}
			}
			$db->close();
		} //on vérifie les données
		else {
			$erreur = '<p class="error">Le format de l\'heure est incorrect</p>';
			$page = afficher($template, $erreur);
		}
		
	}
	else {
		$erreur = '';
		$page = afficher($template, $erreur);
	}
?>

