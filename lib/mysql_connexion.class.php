<?php
// classe de connection
class Connection
{
	private $Serveur;
	private $Login;
	private $Pass;
	private $Base;

	public function Connection($serveur, $login, $pass, $base) {
		$this->Serveur = $serveur;
		$this->Login = $login;
		$this->Pass = $pass;
		$this->Base = $base;
	}
	
	public function open() {
		mysql_connect($this->Serveur, $this->Login, $this->Pass);
		mysql_select_db($this->Base);	
	}
	
	public function close() {
		mysql_close();
	}
	
	public function query($sql) {
		$resultat = mysql_query($sql) or die("requete complete : $sql <br />".  mysql_error());
		return $resultat;
		
	}

	public function lastId() {
		$result = mysql_fetch_row(mysql_query("SELECT LAST_INSERT_ID()"));
		return $result[0];
	}
	
	public function setServeur($argument) {
		$this->Serveur = $argument;
	}
	
	public function getServeur() {
		return $this->Serveur;
	}
	
	public function setLogin($argument) {
		$this->Login = $argument;
	}
	
	public function getLogin() {
		return $this->Login;
	}
	
	public function setPass($argument) {
		$this->Pass = $argument;
	}
	
	public function getPass() {
		return $this->Pass;
	}
	
	public function setBase($argument) {
		$this->Base = $argument;
	}
	
	public function getBase() {
		return $this->Base;
	}
}

?>

