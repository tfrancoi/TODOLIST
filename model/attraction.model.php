<?php
	function list_attraction_all($db, $prix) {
		$sql = "SELECT attraction.nom AS nom, prix, capacite, personne.nom AS nomop ".
			   ", heure_debut, heure_fin, minute_debut, minute_fin FROM attraction ".
			   "INNER JOIN operateur ON attraction.id_operateur = operateur.id ".
			   "INNER JOIN personnel ON operateur.id_personnel = personnel.id ".
			   "INNER JOIN horaire ON attraction.id_horaire = horaire.id ".
			   "INNER JOIN personne ON personnel.id_personne = personne.id ".
			   "WHERE prix <= '$prix'";
		return $db->query($sql);
			   
	}
	
	function list_attraction($db, $prix, $type) {
		$sql = "SELECT attraction.nom AS nom, prix, capacite, personne.nom AS nomop ".
			   ", heure_debut, heure_fin, minute_debut, minute_fin FROM attraction ".
			   "INNER JOIN operateur ON attraction.id_operateur = operateur.id ".
			   "INNER JOIN personnel ON operateur.id_personnel = personnel.id ".
			   "INNER JOIN personne ON personnel.id_personne = personne.id ".
			   "INNER JOIN horaire ON attraction.id_horaire = horaire.id ".
			   "WHERE prix <= '$prix' AND attraction.nom = '$type'";
		return $db->query($sql);
	}

?>
