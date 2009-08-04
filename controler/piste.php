<?php
	function afficher($template, $erreur) {
		$page = $template->Open("view/piste.html");
		$template->addSession($page, "erreur");
		$template->setVar($page, "erreur.error" , $erreur);
		$template->closeSession($page, "erreur");
		return $page;
	}
	
	function chemin_entre_remonte($db, $depart, $arrive) {
		$matrice = matrice_remonte($db);
		$poids = 1;
		$list = find_path($matrice, $arrive, array(), 0, $depart, $depart);
		foreach($list as $key => $value) {
			echo "$value ";
		}
		$string = "";
		foreach($list as $key => $value) {
			$string .= "$value ";
		}
		return $string;
	}
	
	function find_path($matrice, $arrive, $list, $i, $noeud, $depart) {
		$adj = $matrice[$noeud];
		$chemin;
		$list[$i] = $noeud;
		//on évite de tourner en rond;
		if($noeud == $depart && count($list) > 1) {
			return array();
		}
		//si on est arrivé à destination
		if($noeud == $arrive) {
			return $list;
		}
		
		foreach($adj as $key => $value) {
			$chemin[$key] = find_path($matrice, $arrive, $list, $i+1, $key, $depart);
		}
		return min_list($chemin);
		
	}
	
	function min_list($array_list) {
		$leng = PHP_INT_MAX;
		$list = NULL;
		foreach($array_list as $key => $value) {
			if(count($value) <= $leng && count($value) > 0) {
				$leng = count($value);
				$list = $value;
			}
		}
		return $list;
	}
	
	
	
	


if(isset($_POST['depart']) && isset($_POST['arrive']) && isset($_POST['id_depart']) && isset($_POST['id_arrive'])) {
	$depart = $_POST['depart'];
	$id_depart = $_POST['id_depart'];
	$arrive = $_POST['arrive'];
	$id_arrive = $_POST['id_arrive'];
	if(is_numeric($id_depart) && is_numeric($id_arrive)) {
		$db->open();
		$a = (($depart == 'piste' && is_id_piste($db, $id_depart)) || ($depart == 'remontee' && is_id_remontee($db, $id_depart)));
		$b = (($arrive == 'piste' && is_id_piste($db, $id_arrive)) || ($arrive == 'remontee' && is_id_remontee($db, $id_arrive))); 
		if($a && $b) {
			//4 CAS
			if($depart == 'remontee' && $arrive == 'remontee') {
				$string = chemin_entre_remonte($db, $id_depart, $id_arrive);
				$erreur = "Emprunter les remontées dans cet ordre $string.";
			}
			else if($depart == 'piste' && $arrive == 'remontee') {
				$new_depart = pist_to_remonte($db, $id_depart);
				$string = chemin_entre_remonte($db, $new_depart, $id_arrive);
				$erreur = "Emprunter la piste $id_depart vers la remontée $new_depart <br />" .
				"puis emprunter les remontées dans cet ordre $string .";
			}
			else if($depart == 'remontee' && $arrive == 'piste') {
				$new_arrive = pist_from_remonte($db, $id_arrive);
				$string = chemin_entre_remonte($db, $id_depart, $new_arrive);
				$erreur = "Emprunter les remontées dans cet ordre $string. <br />".
				"Puis emprunter la remontée $new_arrive vers la piste $id_arrive.";
			}
			else {				
				$new_depart = pist_to_remonte($db, $id_depart);
				$new_arrive = pist_from_remonte($db, $id_arrive);
				$string = chemin_entre_remonte($db, $new_depart, $new_arrive);
				$erreur = "Emprunter la piste $id_depart vers la remontée $new_depart, <br />" .
				"puis emprunter les remontées dans cet ordre $string, <br /> ".
				"puis emprunter la remontée $new_arrive vers la piste $id_arrive.";
			}
			$page = afficher($template, $erreur);
		}
		else {
			$erreur = '<p class="error">Les id ne sont pas valides du tout</p>';
			$page = afficher($template, $erreur);
		}
		
		$db->close();
	}
	else {
		$erreur = '<p class="error">Les id ne sont pas valides</p>';
		$page = afficher($template, $erreur);
	}
	
}
else {
	$erreur = '';
	$page = afficher($template, $erreur);
}
?>
