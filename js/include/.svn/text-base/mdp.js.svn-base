function changeMdp() {
	
	var mdpPanel = new Ext.FormPanel({ 
        labelWidth:100,
        url:'passwd', 
        frame:true, 
        //title:'Changer son mot de passe', 
        defaultType:'textfield',
        monitorValid:true,
        items:[{ 
	                fieldLabel:'Ancien MDP', 
	                name:'a_mdp', 
	                inputType:'password', 
                	allowBlank:false 
                },
                { 
                   fieldLabel:'Nouveau MDP', 
                   name:'mdp1', 
                    inputType:'password', 
                    allowBlank:false 
                },
                { 
                    fieldLabel:'Confirmer Nouveau MDP', 
                    name:'mdp2', 
                    inputType:'password', 
                    allowBlank:false 
                },
        ],	 
	   
        buttons:[{ 
                text:'Confirmer',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
        			mdpPanel.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Connecting', 
                        waitMsg:'Sending data...',
 
				 
                        success:function(){ 
                    		Ext.Msg.alert('Changement réussit'); 
                    		mdpPanel.getForm().reset(); 
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
	
	var winChangeMDP = new Ext.Window({
		//layout : 'fit',
		title:'Edition du profil',
		x : 935,
		y : 60,
		closable: true,
		resizable: true,
		plain: true,
		border: true,
		items: [mdpPanel]
	});


	
	


	
	
	winChangeMDP.show();
}