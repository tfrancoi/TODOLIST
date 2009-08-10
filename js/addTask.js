var newTrans;

function newTask() {
	var storePriority;			
	var storeCategory;
	

	function init() {		

		var priority = new Ext.form.ComboBox({
			x : 335,
			y : 0,
			width : 135,
			store: storePriority,
			displayField:'name',
			valueField : 'id',
			hiddenName: 'priority',
			fieldLabel : 'Priorité : ',
			name : 'priority',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Selectionner priorité...',
			selectOnFocus:true
		});
		
		var category = new Ext.form.ComboBox({
			x : 480,
			y : 0,
			width : 150,
			store: storeCategory,
			displayField:'name',
			valueField : 'id',
			hiddenName: 'category',
			fieldLabel : 'Catégorie : ',
			//hideLabel : true,
			name : 'category',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Selectionner catégorie...',
			selectOnFocus:true
		});


		

		newTrans = new Ext.form.FormPanel({ 
			//width : 400,
			//baseCls: 'x-plain',
			layout:'absolute',
			
			url:'index.php?page=addtask&task=addtask', 
			frame:true, 			
			defaultType:'textfield',
			monitorValid:true,
			

			items:[
			{
				x: 0,
				y: 5,
				xtype:'label',
				text: 'Tache :'
			},
			{
				
				x : 40,
				y : 0,
				width : 150,
				
				name:'name',
				allowBlank: true
			
			},
			{
				x: 200,
				y: 5,
				xtype:'label',
				text: 'Date :'
			},
			{
				x: 235,
				y: 0,
				
				width : 90,
				xtype:'datefield',
				//fieldLabel:'Deadline',                
                
                format:'Y-m-d',
                name: 'deadline'
            },
			priority,
			category,
			{
				x: 640,
				y: 5,
				xtype:'label',
				text: 'Retard permis ?'
			},
			
			new Ext.form.Checkbox({
				x: 720,
				y: 5,
				fieldLabel:'Retard permis ?', 
				name:'lateness'
			}),
			new Ext.Button({
				text : 'Ajouter',
				x: 740,
				y: 0,
				formBind: true,
				handler:function(){ 
					newTrans.getForm().submit({ 
						method:'POST', 
						waitTitle:'Connecting', 
						waitMsg:'Sending data...',


						success:function(){ 
							Ext.Msg.alert('Ajout réussit'); 
							newTrans.getForm().reset(); 
							grid.hide();
							newTaskView()
							
						},

						failure: function(form, action) { 
							Ext.Msg.alert('Echec de lopération', "error"); 
							
						}
					})
				}	 	
			})
			

			] 

			
		});
		
	}

	Ext.Ajax.request({
		url: 'index.php?page=addtask&task=infonewtask',
		method: 'GET',
		success : function ( result, request ) { 
			
			var resp = Ext.util.JSON.decode(result.responseText);
		
			storePriority = new Ext.data.SimpleStore({
				fields: ['id', 'name', 'color'],
				data : resp.data_priority
			});
			
			storeCategory = new Ext.data.SimpleStore({
				fields: ['id', 'name'],
				data : resp.data_category
			});
			init();
			ready_add = true;
			ready();
		}
	});


}

