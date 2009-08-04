<?php

	function insert_touriste($db, $nom, $prenom, $langue, $domicile, $sexe, $pref, $level, $naissance, $id_sejour) {
		$sql = "INSERT INTO personne (id, nom, prenom, id_langue, sexe, birthdate, domicile) VALUES ('', '$nom', '$prenom', ".
		"(SELECT id FROM langue WHERE nom = '$langue' LIMIT 1), ".
		"'$sexe', '$naissance', '$domicile')";
		$db->query($sql);
		$id = $db->lastId();
		$sql = "INSERT INTO touriste (id, id_personne, id_sejour, preference) VALUES ('', '$id', '$id_sejour', '$pref')";
		$db->query($sql);
		if($pref == 'skieur') {
			$id = $db->lastId();
			$sql = "INSERT INTO skieur (id, id_touriste, niveau) VALUES ('', '$id', '$level')";
			$db->query($sql);
		}
	}
?>
