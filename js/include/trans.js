function newTrans() {

	var storeUtils;
	var storeGroup;
	var winNewTrans;
	var hidebox;
	var utils;
	var groups;
	var utilVi = true;
	var aqui;

	function init() {
		var mydate =  new Ext.form.DateField({
			format: 'Y-m-d',
	        fieldLabel: 'Date',
	        name: 'date',
	        allowBlank:false	
		});
		
		hidebox = new Ext.form.Checkbox({
			fieldLabel:'Qui ? Groupe ?', 
			name:'type',
			handler : hide
		});

		utils = new Ext.form.ComboBox({
		
			store: storeUtils,
			displayField:'prenom',
			valueField : 'id',
			hiddenName: 'userid',
			//fieldLabel : 'Qui ?',
			hideLabel : true,
			name : 'userprenom',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Selectionner un débiteur...',
			selectOnFocus:true
		});


		groups = new Ext.form.ComboBox({
	
			store: storeGroup,
			displayField:'nom',
			valueField : 'id',
			hiddenName: 'groupeid',
			name : 'groupnom',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Selectionner un débiteur...',
			selectOnFocus:true,
			hidden : true,
			hideLabel : true

		});

		var newTrans = new Ext.FormPanel({ 
			labelWidth:100,
			url:'transaction', 
			frame:true, 
			//title:'Nouvelle Transaction', 
			defaultType:'textfield',
			monitorValid:true,
			items:[
			new Ext.form.NumberField({
				allowDecimals : true, 
				fieldLabel:'Combien ?', 
				name:'somme', 
				allowBlank:false,
				minValue : 0
			}),
			mydate,
			hidebox,
			utils,
			groups,
			//aqui,
			new Ext.form.Checkbox({
				fieldLabel:'Souche ?', 
				name:'souche'
			}),
			{
				fieldLabel:'Quoi ?', 
				name:'description',
				allowBlank: true
			
			}

			],	 

			buttons:[{ 
				text:'Ajouter',
				formBind: true,	 

				handler:function(){ 
					newTrans.getForm().submit({ 
						method:'POST', 
						waitTitle:'Connecting', 
						waitMsg:'Sending data...',


						success:function(){ 
							Ext.Msg.alert('Ajout réussit'); 
							newTrans.getForm().reset(); 
						},

						failure: function(form, action) { 
							if(action.failureType == 'server') { 
								obj = Ext.util.JSON.decode(action.response.responseText); 
								Ext.Msg.alert('Echec de lopération', obj.errors.reason); 
							} else{ 
								Ext.Msg.alert('Warning!', 'Server is unreachable : ' + action.response.responseText); 
							}
						}
					})
				}
			}]
		})


		



		winNewTrans = new Ext.Window({
			title:'Nouvelle transaction',
			x : 640,
			y : 60,
			closable: true,
			resizable: true,
			plain: true,
			border: true,
			items: [newTrans]
		}); 
		
	}


	function hide() {
		if(utilVi) {
			utilVi = false;
			utils.setVisible(false);
			groups.setVisible(true);
			
		}
		else {
			utilVi = true;
			utils.setVisible(true);
			groups.setVisible(false);
			
		}
		 
	}

	

	Ext.Ajax.request({
		url: 'NewTransactionGetInfo',
		method: 'POST',
		success : function ( result, request ) { 
		var resp = Ext.util.JSON.decode(result.responseText);

		//Ext.MessageBox.alert('Success', 'Data return from the server: '+ resp.data.utils); 
		storeUtils = new Ext.data.SimpleStore({
			fields: ['id', 'prenom', 'nom'],
			data : resp.data.utils
		});

		storeGroup = new Ext.data.SimpleStore({
			fields: ['id', 'nom'],
			data : resp.data.groups
		});
		
		aqui = new Ext.form.TextField({
			allowBlank:false,
			fieldLabel : 'A Qui ?',
			name : 'aqui',
			disabled : true,
			value : resp.data.cur.prenom
		});


		init();
		winNewTrans.show();
	}
	});


}