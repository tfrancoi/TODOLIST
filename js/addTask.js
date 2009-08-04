Ext.onReady(function() {
	Ext.QuickTips.init();
	newTask();
	
});


function newTask() {

	var storePriority;
			
	var storeCategory;
	var winNewTask;


	function init() {

		
		
		

		var priority = new Ext.form.ComboBox({
		
			store: storePriority,
			displayField:'name',
			valueField : 'id',
			hiddenName: 'priority',
			fieldLabel : 'Priorité : ',
			//hideLabel : true,
			name : 'priority',
			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Selectionner une priorité...',
			selectOnFocus:true
		});
		
		var category = new Ext.form.ComboBox({
		
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
			emptyText:'Selectionner une catégorie...',
			selectOnFocus:true
		});


		

		var newTrans = new Ext.FormPanel({ 
			renderTo : 'corps',
			labelWidth:100,
			url:'index.php?page=addtask&task=addtask', 
			frame:true, 
			//title:'Nouvelle Transaction', 
			defaultType:'textfield',
			monitorValid:true,
			items:[
			{
				fieldLabel:'Nom de la tâche ?', 
				name:'name',
				allowBlank: true
			
			},
			
			{
				xtype:'xdatetime',
				fieldLabel:'Deadline',                
                timeFormat:'H:i',
                /*timeConfig: {
                    altFormats:'H:i:s',
                    allowBlank:true    
                },*/
                dateFormat:'Y-m-d',
                /*dateConfig: {
                    altFormats:'Y-m-d|Y-n-d',
                    allowBlank:true    
                }*/
				name: 'deadline'
            },
			priority,
			category,
			
			new Ext.form.Checkbox({
				fieldLabel:'Retard grave conséquence ?', 
				name:'lateness'
			})
			

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
							Ext.Msg.alert('Echec de lopération', "error"); 
							
						}
					})
				}
			}]
		});

	
		

	/*

		winNewTask = new Ext.Window({
			title:'Nouvelle tâche',
			x : 200,
			y : 60,
			closable: true,
			resizable: true,
			plain: true,
			border: true,
			items: [newTrans]
		}); */
		
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
			
			winNewTask.show();
			
		}
	});


}
