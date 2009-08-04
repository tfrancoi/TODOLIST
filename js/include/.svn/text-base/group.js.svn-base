function newGroup() {
	
	var addgroup = new Ext.FormPanel({ 
        labelWidth:100,
        url:'addgroup', 
        frame:true, 
        //title:'Nouveau Groupe', 
        defaultType:'textfield',
        monitorValid:true,
        items:[{ 
                fieldLabel:'Nom du groupe', 
                name:'nom', 
                allowBlank:false 
            }],	 
	   
        buttons:[{ 
                text:'Ajouter',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
                    addgroup.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Connecting', 
                        waitMsg:'Sending data...',
 
				 
                        success:function(){ 
                    		Ext.Msg.alert('Ajout réussit'); 
                    		addgroup.getForm().reset(); 
                        },
 
			 
                        failure:function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Echec de l\'opération', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
                            } 
                            addgroup.getForm().reset(); 
                        } 
                    }) 
                } 
            }] 
    });
	
	var winAddGroup = new Ext.Window({
        layout:'fit',
        title:'Ajout d\'un groupe', 
        x : 320,
		y : 140,
        width:300,
        height:150,
        closable: true,
        resizable: false,
        plain: true,
        border: true,
        items: [addgroup]
	});
	winAddGroup.show();
}