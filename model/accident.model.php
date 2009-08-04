<?php
function find_secourist($db, $heure, $minute, $type ) {
	$sql = "SELECT secouriste.id AS id, personne.nom AS nom FROM secouriste ".
		   "INNER JOIN personnel ON secouriste.id_personnel = personnel.id ".
		   "INNER JOIN personne ON personnel.id_personne = personne.id ".
		   "INNER JOIN horaire ON personnel.id_horaire = horaire.id ".
		   "WHERE (heure_debut < '$heure' OR (heure_debut = '$heure' AND minute_debut <= '$minute')) ".
		   "AND (heure_fin > '$heure' OR (heure_fin = '$heure' AND minute_fin >= '$minute')) ".
		   "AND CASE '$type' WHEN 'reanimation' THEN reanimation = 1 ".
		   					"WHEN 'fracture' THEN fracture = 1 ".
		   					"END LIMIT 1";

	return $db->query($sql);
}

function find_touriste($db, $nom, $prenom) {
	$sql = "SELECT touriste.id AS id FROM touriste ".
			"INNER JOIN personne ON touriste.id_personne = personne.id ".
			"WHERE nom = '$nom' AND prenom = '$prenom' LIMIT 1";

	return $db->query($sql); 
}

function insert_accident($db, $id_secouriste, $id_touriste) {
	$sql = "INSERT INTO accident (id, id_touriste, id_secouriste) VALUES ('', '$id_touriste', '$id_secouriste')";
	$db->query($sql);
}


?>
