var ready_add =false;
var ready_view= false;
Ext.onReady(function() {
	Ext.QuickTips.init();
	newTask();
	newTaskView();
	
	
		
});

function ready() {
	if(ready_add && ready_view) {
		var window = new Ext.Window({
        title: "Ajout d'une tâche" ,
		//x : 10,
		y : 10,
        width: 900,
        height:  600,
        
        layout: 'border',
        //plain:true,
        bodyStyle:'padding:5px;',
        items: [{
		   region: 'north',
		   xtype: 'panel',
		   layout : 'fit',
		   items : newTrans,
		   height : 40
		},
		{
		   region: 'center',
		   xtype: 'panel',
		   items : grid,
		   height : 400
		}],
		tbar : new Ext.Toolbar({
			items: [{
				xtype: 'tbbutton',
				text: 'Graphe deadline',
				handler: function(){
						newDateChart();
					}

				}]

		})

        

        
    });

    window.show();
	}
}
