function newUtil() {
	
	var panelNewUtil = new Ext.FormPanel({ 
        labelWidth:100,
        url:'adduser', 
        frame:true, 
        title:'Nouvelle utilisateur', 
        defaultType:'textfield',
        monitorValid:true,
        items:[{ 
                fieldLabel:'Nom', 
                name:'nom', 
                allowBlank:false 
                },
                {
                	fieldLabel:'Prénom', 
                    name:'prenom', 
                    allowBlank:false                
                },
                {
                	fieldLabel:'Email', 
                    name:'mail', 
                    allowBlank:false,
                    vtype : 'email'
                },
                {
	                fieldLabel:'Mot de passe', 
	                name:'mdp', 
	                inputType:'password', 
	                allowBlank:false 
                },
                {
	                fieldLabel:'Confirmer mdp', 
	                name:'confirm_mdp', 
	                inputType:'password', 
	                allowBlank:false 
                },
                new Ext.form.Checkbox({
                	fieldLabel:'Fictif ?', 
	                name:'fictif'
                })
        ],	 
	   
        buttons:[{ 
                text:'Ajouter',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
        			panelNewUtil.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Connecting', 
                        waitMsg:'Sending data...',
 
				 
                        success:function(){ 
                    		Ext.Msg.alert('Ajout réussit'); 
                    		panelNewUtil.getForm().reset(); 
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
	
	
	var winNewUtil = new Ext.Window({
		//layout : 'fit',
		title:'Ajout d\'un utilisateur',
		x : 20,
		y : 140,
		closable: true,
		resizable: true,
		plain: true,
		border: true,
		items: [panelNewUtil]
	});


	
	


	
	
	winNewUtil.show();
	
}