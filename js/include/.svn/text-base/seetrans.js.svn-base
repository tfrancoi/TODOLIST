/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function seeTrans() {
	var storeUtils;
	var total;
	function french_boolean_renderer(val) {
		if(val == true)
			return 'oui';
		else 
			return 'non';
	}
   

	function init() {
		date_edit = new Ext.form.DateField({
			format : 'Y-m-d'
		});
	
	
		var debiteur_edit = new Ext.form.ComboBox({			
			store: storeUtils,
			displayField:'prenom',
			valueField : 'prenom',	
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all'	
		});
		
		var somme_edit = new Ext.form.NumberField({
			allowDecimals : true,
			minValue : 0
		});
		
		var souche_edit = new Ext.form.ComboBox({
			
			store: new Ext.data.SimpleStore({
				fields: ['value', 'render'],
				data : [[true, 'oui'], [false, 'non']]
				
			}),
			displayField:'render',
			valueField : 'value',
			
		
	
	
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all'
	
		});
	
	    var st = new Ext.data.JsonStore({
	    	proxy: new Ext.data.HttpProxy({
	            url: 'seetrans',
	            method : 'POST'
	        }),
	
	    	root : 'data',
	    	fields : ['id', 
	    	          {name : 'crediteur', type : 'string'}, 
	    	          {name : 'debiteur', type : 'string'}, 
	    	          {name : 'somme', type : 'float'}, 
	    	          {name : 'date', type  : 'date' , dateFormat : 'Y-m-d'}, 
	    	          {name : 'quoi', type : 'string'}, 
	    	          {name : 'souche', type : 'boolean'},
	    	          {name : 'check', type : 'boolean'}    	
	    	] 
	    });
	    
	    
	    
	    var grid = new Ext.grid.EditorGridPanel({
	    	autoWidth : true,
	    	//autoHeight : true,
	    	height : 500,
	    	selModel : new Ext.grid.RowSelectionModel(),
	    	tbar : [{
	    		text : 'supprimer transaction',
	    		handler : function() {
	    			var sm = grid.getSelectionModel();
	    			var sel = sm.getSelected();
	    			if(sm.hasSelection()) {
	    				Ext.Msg.show({
	    					title : 'Supprimer transaction',
	    					buttons : Ext.MessageBox.YESNOCANCEL,
	    					msg : 'supprimer transaction du ' + sel.data.date.format('d/m/Y'),
	    					fn : function(button) {
	    						if(button == 'yes' && sel.data.check == false) {
	    							
	    							var conn = new Ext.data.Connection();
		    						conn.request({
		    							url : 'updatetrans',
		    							params : {
		    								action : 'del',
		    								id : sel.data.id
		    							}
		    						,
		    						success : function (resp, opt) {
		    							grid.getStore().remove(sel);
		    						},
		    						failure : function (resp, opt) {
		    							Ext.Msg.alert('Erreur', 'Impossible de supprimer la transaction');
		    							
		    						}
		    						
		    						});
	    						}
	    					}
	    					
	    				});
	    			}
	    		}
	    	},
	    	{
	    		text : 'votre solde : ' + total
	    	}],
	    	store : st,
	    	clicksToEdit : 1,
	
	    	columns : [
	    	           {header : 'Id' , dataIndex : 'id', sortable : true, hidden : true},  
	    	           {header : 'Créditeur' , dataIndex : 'crediteur',sortable : true},   
	    	           {header : 'Débiteur' , dataIndex : 'debiteur', sortable : true, editor : debiteur_edit},   
	    	           {header : 'Somme' , dataIndex : 'somme', sortable : true, editor : somme_edit},   
	    	           {header : 'Date' , dataIndex : 'date',sortable : true, renderer : Ext.util.Format.dateRenderer('d/m/Y'), editor : date_edit},   
	    	           {header : 'Quoi ?' , dataIndex : 'quoi', editor : new Ext.form.TextField()},   
	    	           {header : 'Sourche' , dataIndex : 'souche',sortable : true, renderer : french_boolean_renderer, editor : souche_edit},  
	    	           {header : 'Vérifier' , dataIndex : 'check',sortable : true, renderer : french_boolean_renderer, hidden : true},   
	    	],
	    	listeners : {
	    				afteredit : function(e) {
	    					if(e.record.get('check') == true) {
	    						Ext.Msg.alert('Erreur', 'modification d\'une transaction déjà vérifié par le trésorier');
	    						e.record.reject();
	    					}
	    					else {
	    						var conn = new Ext.data.Connection();
	    						if(e.value instanceof Date) {
	    							e.value = e.value.format('Y-m-d');
	    						}
	    						conn.request({
	    							url : 'updatetrans',
	    							params : {
	    								action : 'update',
	    								id : e.record.get('id'),
	    								champ : e.field,
	    								valeur : e.value
	    							}
	    						,
	    						success : function (resp, opt) {
	    							e.record.commit();
	    						},
	    						failure : function (resp, opt) {
	    							Ext.Msg.alert('Erreur', 'Erreur serveur contacter admin');
	    							e.record.reject();
	    						}
	    						
	    						});
	    						
	    						
	    					}
	    					
	   					}	
	    	           }
	    	           
	    	
	    });
	    
	   
	    var winSeeTrans = new Ext.Window({
			title:'Vos transactions',
			x : 10,
			y : 60,
			width : 630,
			height : 'auto',
			closable: true,
			resizable: true,
			plain: true,
			border: true,
			items: [grid]
		});
	    
	    st.load();
	    winSeeTrans.show();
	}
    
    Ext.Ajax.request({
		url: 'NewTransactionGetInfo',
		method: 'POST',
		success : function ( result, request ) { 
			var resp = Ext.util.JSON.decode(result.responseText);
	
			 
			storeUtils = new Ext.data.SimpleStore({
				fields: ['id', 'prenom', 'nom'],
				data : resp.data.utils
			});	
			total = resp.data.total;
			init();
			
		}
	});
    
   
    



}

