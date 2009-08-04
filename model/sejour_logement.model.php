<?php
	//retourne une ressource
	//qui contient tout les logements libres
	//selon la capacite durant la période voulue
	function logement_libre($db, $capacite, $debut, $fin) {
		$sql = "SELECT id, capacite, prix, categorie FROM logement ".
			   "WHERE ( ".
					"(SELECT COUNT(id_logement) FROM sejour) = 0 ". 
					"OR ".
					"id <> ALL(SELECT id_logement FROM sejour WHERE NOT id_logement IS NULL) ".
					"OR ".
					"id <> ALL(SELECT logement.id categorie FROM `sejour` ".
								"INNER JOIN logement ON sejour.id_logement = logement.id ".
								"WHERE arrive <= '$fin' && depart >= '$debut') ".				  
					") AND capacite >= '$capacite'";
		return $db->query($sql); 
	}
	
	function sejour_existant($db, $debut, $fin) {
		$sql = "SELECT sejour.id AS sejid, logement.id AS logid, arrive, depart, capacite, prix, categorie FROM `sejour` ".
				"INNER JOIN logement ON sejour.id_logement = logement.id WHERE capacite >= '$capacite' && arrive <= '$fin' ".
				"&& depart >= '$debut'";
		return $db->query($sql);
	}
	
	function is_disponible($db, $id, $debut, $fin) {
		$sql = "SELECT COUNT(logement.id) FROM logement WHERE logement.id = '$id' ".
				"AND '$debut' >= ALL( SELECT depart FROM sejour WHERE id_logement = '$id' AND arrive <= '$fin') ".
				"AND '$fin' <= ALL( SELECT arrive FROM sejour WHERE id_logement = '$id' AND depart >= '$debut') ";
		$result = $db->query($sql);
		$resultat = mysql_fetch_array($result);
		return $resultat[0] == 1;				
	}
	
	function insert_sejour($db, $id_logement, $debut, $fin) {
		$sql = "INSERT INTO sejour (id, id_logement, arrive, depart) VALUES ('', '$id_logement' , '$debut', '$fin')";
		$db->query($sql);
		return $db->lastId();
	}
?>
