<?php
	function is_id_piste($db, $id) {
		$sql = "SELECT COUNT(id) FROM piste WHERE id='$id' AND enneigement = 1";
		$result = $db->query($sql);
		$resultat = mysql_fetch_array($result);
		return $resultat[0] == 1;
	}
	
	function is_id_remontee($db, $id) {
		$sql = "SELECT COUNT(id) FROM remonte WHERE id='$id' AND enneigement = 1";
		$result = $db->query($sql);
		$resultat = mysql_fetch_array($result);
		return $resultat[0] == 1;
	}
	
	function pist_to_remonte($db, $depart) {
		$sql = "SELECT id_remonte FROM linkpiste INNER JOIN remonte ON remonte.id = linkpiste.id_remonte ". 
		"WHERE id_depart = '$depart' AND NOT id_remonte IS NULL AND enneigement = 1 LIMIT 1";
		$result = $db->query($sql);
		$resultat = mysql_fetch_assoc($result);
		return $resultat[id_remonte];
	}
	
	function pist_from_remonte($db, $arrive) {
		$sql = "SELECT id_depart FROM linkremonte INNER JOIN remonte ON remonte.id = linkremonte.id_depart ".
		 	   "WHERE id_piste = '$arrive' AND enneigement = 1 LIMIT 1";
		$result = $db->query($sql);
		$resultat = mysql_fetch_assoc($result);
		return $resultat[id_depart];
	}
	
	function matrice_remonte($db) {
		$sql = "SELECT id_depart, id_remonte FROM linkremonte " .
			   "INNER JOIN remonte ON remonte.id = linkremonte.id_depart
				WHERE NOT id_remonte IS NULL AND id_remonte != 0 AND enneigement = 1";
		$result = $db->query($sql);
		$matrice = array(array());
		while($resultat = mysql_fetch_assoc($result)) {
			$matrice[$resultat[id_depart]][$resultat[id_remonte]] = 1;
		}
		
		return $matrice;

		
		
	}
?>
