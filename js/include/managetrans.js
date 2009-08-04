function managetrans() {
	
	
		var storeUtils;
		var total;
		var rbalance;
		var fbalance;
		
		function french_boolean_renderer(val) {
			if(val == true)
				return 'oui';
			else 
				return 'non';
		}
		
		function souche_edit() {
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
			return souche_edit;
		}
		
		function personne_edit() {
			var debiteur_edit = new Ext.form.ComboBox({			
				store: storeUtils,
				displayField:'prenom',
				valueField : 'prenom',	
				editable : false,		    
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all'	
			});
			return debiteur_edit;
		}
	   

		function init() {
			date_edit = new Ext.form.DateField({
				format : 'Y-m-d'
			});
		
		
			
			
			var somme_edit = new Ext.form.NumberField({
				allowDecimals : true,
				minValue : 0
			});
			
			
		
		    var st = new Ext.data.JsonStore({
		    	proxy: new Ext.data.HttpProxy({
		            url: 'managetrans',
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
		    	height : 550,
		    	//autoHeight : true,
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
		    						if(button == 'yes') {
		    							
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
		    		text : 'balance utilisateur réels : ' + rbalance
		    	},
		    	{
			    	text : 'balance utilisateur fictif : ' + fbalance
			    }
		    	],
		    	store : st,
		    	clicksToEdit : 1,
		
		    	columns : [
		    	           {header : 'Id' , dataIndex : 'id', sortable : true, hidden : true},  
		    	           {header : 'Créditeur' , dataIndex : 'crediteur',sortable : true, editor : personne_edit()},   
		    	           {header : 'Débiteur' , dataIndex : 'debiteur', sortable : true, editor : personne_edit()},   
		    	           {header : 'Somme' , dataIndex : 'somme', sortable : true, editor : somme_edit},   
		    	           {header : 'Date' , dataIndex : 'date',sortable : true, renderer : Ext.util.Format.dateRenderer('d/m/Y'), editor : date_edit},   
		    	           {header : 'Quoi ?' , dataIndex : 'quoi', editor : new Ext.form.TextField()},   
		    	           {header : 'Sourche' , dataIndex : 'souche',sortable : true, renderer : french_boolean_renderer, editor : souche_edit()},  
		    	           {header : 'Vérifier' , dataIndex : 'check',sortable : true, renderer : french_boolean_renderer, editor : souche_edit()},   
		    	],
		    	listeners : {
		    				afteredit : function(e) {
		    					
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
		    });
		    
		   
		    var winSeeTrans = new Ext.Window({
				title:'Vos transactions',
				x : 10,
				y : 60,
				closable: true,
				resizable: true,
				height : 'auto',
				width : 680,
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
			params: { balance: 'balance' },
			success : function ( result, request ) { 
				var resp = Ext.util.JSON.decode(result.responseText);
		
				 
				storeUtils = new Ext.data.SimpleStore({
					fields: ['id', 'prenom', 'nom'],
					data : resp.data.utils
				});	
				total = resp.data.total;
				fbalance = resp.data.balancefictif;
				rbalance = resp.data.balancereal;
				init();				
			}
		});	
}