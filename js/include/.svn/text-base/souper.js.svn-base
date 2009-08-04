/**
*/
function souper() {
	
	var winSouper;
	var storeUtils;
	var storeGroup;
	var form;
	var storeReal;
	var nb_c = 0;
	
	function addReal(e) {
		form.add({
			xtype : 'numberfield',
			fieldLabel : e.get('prenom') + ' '+ e.get('nom'),
			name : e.get('id'),
			allowBlank:false,
			value : '0'
		});
	}
	
	function init() {
		form = new Ext.FormPanel({
			labelWidth:100,
		    url:'souper', 
		    frame:true, 		    
		    defaultType:'textfield',		    
		    monitorValid:true,
		    items:[{
		            	xtype : 'datefield',
		            	format: 'Y-m-d',
		    	        fieldLabel: 'Date',
		    	        name: 'date',
		    	        allowBlank:false
		            },
		            {
		    			xtype : 'label',		  
		    			text : 'Nombre de croix ?',
		    			style: 'font-weight:bold;'

		    		}
		    ],	 
		   
		    buttons:[{ 
		            text:'Confirmer',
		            formBind: true,	 
		            // Function that fires when user clicks the button 
		            handler:function(){ 
		    			form.getForm().submit({ 
		                    method:'POST', 
		                    waitTitle:'Connecting', 
		                    waitMsg:'Sending data...',
		
					 
		                    success:function(){ 
		                		Ext.Msg.alert('Changement réussit'); 
		                		for(i = 0; i <nb_c;i++) {
		    						form.remove('prenom_c_' + i, false);
		    						form.remove('somme_c_' + i, false);
		    					}
		                		form.getForm().reset(); 
		                    },
		
				 
		                    failure:function(form, action){ 
		                        if(action.failureType == 'server'){ 
		                            obj = Ext.util.JSON.decode(action.response.responseText); 
		                            Ext.Msg.alert('Echec de l\'opération', obj.errors.reason); 
		                        }else{ 
		                            Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
		                        } 
		                        //addgroup.getForm().reset(); 
		                    } 
		                }) 
		            } 
		        }] 
		});
		
		
		
		
		winSouper = new Ext.Window({
			
			title:'Souper',
			x : 640,
			y : 310,
			closable: true,
			resizable: true,
			plain: true,
			border: true,
			items: [form]
		});
	
	
		
	
		storeReal.each(addReal);
		form.add({
			xtype : 'label',
			text : 'Personne payant le repas',
			style: 'font-weight:bold;'

		});
		form.add({
			
    			xtype : 'numberfield',
                fieldLabel:'nombre de créditeur', 
                name:'nb_c',  
                minValue : 1,
            	allowBlank:false, 
            	listeners : {
    				change : function (field, value, old) {
    					var i = 0;
    					for(i = 0; i <old;i++) {
    						form.remove('prenom_c_' + i, false);
    						form.remove('somme_c_' + i, false);
    					}
    					nb_c = value;
    					for (i=0;i<value;i++) {
    						form.add({
    							xtype : 'combo',
    							store: storeUtils,
    							displayField:'prenom',
    							valueField : 'id',
    							hiddenName: 'c_id_' + i,
    							fieldLabel : 'crediteur ' + i,
    							name : 'user_' + i,
    							editable : false,		    
    							typeAhead: true,
    							mode: 'local',
    							triggerAction: 'all',
    							emptyText:'Selectionner un créditeur...',
    							selectOnFocus:true,
    							id : 'prenom_c_' + i,
    							allowBlank:false, 
    							
    						});
    						form.add({
    							xtype : 'numberfield',
    							fieldLabel : 'somme ' + i,
    							name : 'somme_c_' + i,
    							allowBlank:false, 
    							id : 'somme_c_' + i
    						});
    						
    						
	    					
    					}
    					winSouper.doLayout(true);

    					
    				}
    			}	
           
		});
		
	
		winSouper.show();
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
		storeGroup = new Ext.data.SimpleStore({
			fields: ['id', 'nom'],
			data : resp.data.groups
		});
		storeReal = new Ext.data.SimpleStore({
			fields : ['id', 'prenom', 'nom'],
			data : resp.data.real
		});
		
		

		init();
		
	}
	});

}