var newTrans;

function newTask() {
	var storePriority;			
	var storeCategory;
	

	function init() {		

		var priority = new Ext.form.ComboBox({
			x : 355,
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
			x : 500,
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
				
				x : 0,
				y : 0,
				width : 150,
				
				name:'name',
				allowBlank: true
			
			},
			{
				x: 160,
				y: 5,
				xtype:'label',
				text: 'Date :'
			},
			{
				x: 195,
				y: 0,
				timeWidth: 60,
				width : 150,
				xtype:'xdatetime',
				//fieldLabel:'Deadline',                
                timeFormat:'H:i',
                dateFormat:'Y-m-d',
                name: 'deadline'
            },
			priority,
			category,
			{
				x: 660,
				y: 5,
				xtype:'label',
				text: 'Retard permis ?'
			},
			
			new Ext.form.Checkbox({
				x: 740,
				y: 5,
				fieldLabel:'Retard permis ?', 
				name:'lateness'
			}),
			new Ext.Button({
				text : 'Send',
				x: 760,
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



/*!
Ext.onReady(function() {
    var form = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        layout:'absolute',
        url:'save-form.php',
        defaultType: 'textfield',

        items: [{
            x: 0,
            y: 5,
            xtype:'label',
            text: 'Send To:'
        },{
            x: 60,
            y: 0,
            name: 'to',
            anchor:'100%'  // anchor width by percentage
        },{
            x: 0,
            y: 35,
            xtype:'label',
            text: 'Subject:'
        },{
            x: 60,
            y: 30,
            name: 'subject',
            anchor: '100%'  // anchor width by percentage
        },{
            x:0,
            y: 60,
            xtype: 'textarea',
            name: 'msg',
            anchor: '100% 100%'  // anchor width and height
        }]
    });

    var window = new Ext.Window({
        title: 'Resize Me',
        width: 500,
        height:300,
        minWidth: 300,
        minHeight: 200,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: form,

        buttons: [{
            text: 'Send'
        },{
            text: 'Cancel'
        }]
    });

    window.show();
});
*/
