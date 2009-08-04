<?php
	if(isset($_POST['capacite']) && isset($_POST['date1']) && isset($_POST['date2'])) 
	{
		$capacite = $_POST['capacite'];
		$date_debut = $_POST['date1'];
		$date_fin = $_POST['date2'];
		if(is_numeric($capacite) && isdate($date_debut) && isdate($date_fin) && datecmp($date_debut, $date_fin) <= 0) {						
			$page = $template->Open("view/resultlogement1.html");		
			$template->addSession($page, "periode");
			$template->setVar($page, "periode.date1" , $date_debut);
			$template->setVar($page, "periode.date2" , $date_fin);
			$template->closeSession($page, "periode");	
			$db->open();
			$result = logement_libre($db, $capacite, $date_debut, $date_fin);
			while($resultat = mysql_fetch_assoc($result)) {
				$template->addSession($page, "resultat");
				$template->setVar($page, "resultat.id" , $resultat[id]);
				$template->setVar($page, "resultat.capa" , $resultat[capacite]);
				$template->setVar($page, "resultat.price" , $resultat[prix]);
				$template->setVar($page, "resultat.categorie" , $resultat[categorie]);
				$template->closeSession($page, "resultat");
			}
			
			$result = sejour_existant($db, $date_debut, $date_fin);
			while($resultat = mysql_fetch_assoc($result)) {
				$template->addSession($page, "resultat2");
				$template->setVar($page, "resultat2.id_sejour" , $resultat[sejid]);
				$template->setVar($page, "resultat2.id_logement" , $resultat[logid]);
				$template->setVar($page, "resultat2.capa" , $resultat[capacite]);
				$template->setVar($page, "resultat2.price" , $resultat[prix]);
				$template->setVar($page, "resultat2.categorie" , $resultat[categorie]);
				$template->setVar($page, "resultat2.debut" , $resultat[arrive]);
				$template->setVar($page, "resultat2.fin" , $resultat[depart]);
				$template->closeSession($page, "resultat2");
			}
			$db->close();
		}
		else {
			
			$page = $template->Open("view/logement.html");
			$erreur = '<p class="error">Formulaire mal remplit !</p>';
			
			$template->addSession($page, "erreur");
			$template->setVar($page, "erreur.error" , $erreur);
			$template->closeSession($page, "erreur");
			
		}
	}
	else if(isset($_POST['id']) && isset($_POST['date_debut']) && isset($_POST['date_fin'])) {
		$id = $_POST['id'];
		$date_debut = $_POST['date_debut'];
		$date_fin = $_POST['date_fin'];
		$nom = $_POST['nom'];
		$prenom = $_POST['prenom'];
		$sexe = $_POST['sexe'];
		$langue = $_POST['langue'];
		$naissance = $_POST['naissance'];
		$domicile = $_POST['domicile'];
		$preference = $_POST['pref'];
		$level = $_POST['niveau'];
		
		if(is_numeric($id) && isdate($date_debut) && isdate($date_fin) && datecmp($date_debut, $date_fin) <= 0) {
			$db->open();
			if(is_disponible($db, $id, $date_debut, $date_fin)) {
				$id = insert_sejour($db, $id, $date_debut, $date_fin);
				insert_touriste($db, $nom, $prenom, $langue, $domicile, $sexe, $preference, $level, $naissance, $id);
				
				$page = $template->Open("view/logement.html");
				$erreur = '<p class="error">Donnée bien introduites, séjour réservé !</p>';
			
				$template->addSession($page, "erreur");
				$template->setVar($page, "erreur.error" , $erreur);
				$template->closeSession($page, "erreur");
				
			}
			else {
				$page = $template->Open("view/logement.html");
				$erreur = '<p class="error">Impossible de réservé ce séjour !</p>';
			
				$template->addSession($page, "erreur");
				$template->setVar($page, "erreur.error" , $erreur);
				$template->closeSession($page, "erreur");
			}
			$db->close();
		}
		else {
			$page = $template->Open("view/logement.html");
			$erreur = '<p class="error">Donnée mal introduites</p>';
			
			$template->addSession($page, "erreur");
			$template->setVar($page, "erreur.error" , $erreur);
			$template->closeSession($page, "erreur");
		}
	}	
	else {
		$page = $template->Open("view/logement.html");
		$erreur = '';
		
		$template->addSession($page, "erreur");
		$template->setVar($page, "erreur.error" , $erreur);
		$template->closeSession($page, "erreur");
	}
?>






