var storeUtils;
var total;
var rbalance;
var fbalance;
var storeGroup;
var prenom;

/**
 * 
 * @param param Paramètre à envoyer au serveur
 * @param fun la méthode qui sera appelée une fois les informations reçue.
 * @return
 */
function getInfo(param, fun) {
	Ext.Ajax.request({
		url: 'NewTransactionGetInfo',
		method: 'POST',
		params: param,
		success : function ( result, request ) { 
			var resp = Ext.util.JSON.decode(result.responseText);
	
			 
			storeUtils = new Ext.data.SimpleStore({
				fields: ['id', 'prenom', 'nom'],
				data : resp.data.utils
			});	
			
			total = resp.data.total;
			fbalance = resp.data.balancefictif;
			rbalance = resp.data.balancereal;
			
			storeGroup = new Ext.data.SimpleStore({
				fields: ['id', 'nom'],
				data : resp.data.groups
			});
			
			prenom = resp.data.cur.prenom;
			
			fun();
		}
	});
	
	
}