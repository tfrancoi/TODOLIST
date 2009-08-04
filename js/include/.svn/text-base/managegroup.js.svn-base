function manageGroup() {
	var storeMembre;
	var storeNonMembre;
	var winGroup;	
	var groups;
	var form;
	var id;
	
	/**
	 * Met à jour les combobox avec les membres et non membres du groupe
	 * @param id
	 * @return
	 */
	function membreRequest(id) {		
		Ext.Ajax.request({
			   url: 'groupinfo',
			   success: function ( result, request ) { 
					var resp = Ext.util.JSON.decode(result.responseText);

					
					storeMembre = new Ext.data.SimpleStore({
						fields: ['id', 'prenom'],
						data : resp.data.member
					});

					storeNonMembre = new Ext.data.SimpleStore({
						fields: ['id', 'prenom'],
						data : resp.data.nonmember
					});
					form.remove('membre');
					form.remove('nonmembre');
					form.add(membre());
					form.add(nonMembre());
					
					winGroup.doLayout(true);

					
				},
			   params: { group: id }
			});

	}
	
	
	
	function group() {
		groups = new Ext.form.ComboBox({	
			store: storeGroup,
			id : 'group',
			fieldLabel: 'Gérer le groupe',
			displayField:'nom',
			valueField : 'id',
			hiddenName: 'groupe',
			name : 'groupnom',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			//emptyText:'Selectionner un groupe...',
			selectOnFocus:true,
			listeners : {
				change : function (field, value, old) {
					id = value;
					membreRequest(value);
				}
			}
		});
		return groups;
	}
	
	function update() {
		form.remove('membre');
		form.remove('nonmembre');
		form.remove('group');
		form.add(group());
		winGroup.doLayout(true);
	}

	/**
	 * La combo box des membres
	 * @return
	 */
	function membre() {
		utils = new Ext.form.ComboBox({
			
			store: storeMembre,
			fieldLabel: 'Membre à retirer',
			displayField:'prenom',
			valueField : 'id',
			hiddenName: 'membreid',
			name : 'userprenom',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			//emptyText:'Selectionner un utilisateur...',
			selectOnFocus:true,
			id : 'membre'
		});
		return utils;
	}
	
	/**
	 * La comboBox des nonmembres
	 * @return
	 */
	function nonMembre() {
		utils = new Ext.form.ComboBox({
			
			store: storeNonMembre,
			fieldLabel: 'Utilisateur à ajouter',
			displayField:'prenom',
			valueField : 'id',
			hiddenName: 'utilid',
			name : 'userprenom',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			//emptyText:'Selectionner un utilisateur...',
			selectOnFocus:true,
			id : 'nonmembre'
		});
		return utils;
	}
	
	
	function init() {
		

		form = new Ext.FormPanel({ 
			labelWidth:100,
			url:'group', 
			frame:true, 
			defaultType:'textfield',
			monitorValid:true,
			items:[
			group()			
			],	 

			buttons:[{ 
				text:'Ajouter',
				formBind: true,	 
				handler: function() { 
					form.getForm().submit({ 
						method:'POST', 
						params : {add : 'true'},
						//waitTitle:'Connecting', 
						//waitMsg:'Sending data...',
						success:function(){ 
							membreRequest(id);
						},

						failure: function(form, action) { 
							if(action.failureType == 'server') { 
								obj = Ext.util.JSON.decode(action.response.responseText); 
								Ext.Msg.alert('Echec de lopération', obj.errors.reason); 
							} else{ 
								Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
							}
						}
					});
				}
			},
			{ 
				text:'Supprimer',
				formBind: true,	 
				handler:function(){ 
					form.getForm().submit({ 
						method:'POST', 
						params : {del : 'true'},
						//waitTitle:'Connecting', 
						//waitMsg:'Sending data...',
						success:function(){ 
							membreRequest(id);
						},

						failure: function(form, action) { 
							if(action.failureType == 'server') { 
								obj = Ext.util.JSON.decode(action.response.responseText); 
								Ext.Msg.alert('Echec de lopération', obj.errors.reason); 
							} else{ 
								Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
							}
						}
					});
				}
			},
			{ 
				text:'Supprimer le groupe',
				formBind: true,	 
				handler:function(){ 
					form.getForm().submit({ 
						method:'POST', 
						params : {supp : 'true'},
						waitTitle:'Connecting', 
						waitMsg:'Sending data...',
						success:function(){ 
							getInfo({}, update);
							
						},

						failure: function(form, action) { 
							if(action.failureType == 'server') { 
								obj = Ext.util.JSON.decode(action.response.responseText); 
								Ext.Msg.alert('Echec de lopération', obj.errors.reason); 
							} else{ 
								Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
							}
						}
					});
				}
			}]
		})


		



		winGroup = new Ext.Window({
			title:'Nouvelle transaction',
			x : 320,
			y : 300,
			closable: true,
			resizable: true,
			plain: true,
			border: true,
			items: [form]
		}); 
		
		winGroup.show();
		
	}


	
	getInfo({}, init);	
}