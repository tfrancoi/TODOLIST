var storeTask;
var grid;

function newTaskView() {
	var columnModel;
	
	function reload() {
		function reconfigure() {
			grid.reconfigure(storeTask, columnModel);
		}
		loadData(reconfigure);
	}
	
	function boolean_edit() {
		var souche_edit = new Ext.form.ComboBox({
			
			store: new Ext.data.SimpleStore({
				fields: ['value', 'render'],
				data : [[true, 'oui'], [false, 'non']]
				
			}),
			displayField:'render',
			valueField : 'value',
			
		


			editable : false,		    
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all'

		});
		return souche_edit;
	}
	

	boolean_render = function(value, metaData, record, rowIndex, colIndex, store){
		if(value == 1) {
			return "oui";
		}
		else {
			return "non";
		}
	}

	
	
	function init() {
		
	
	  columnModel = new Ext.grid.ColumnModel([
		{header: "Nom", dataIndex: 'name'},
		{header: "Categorie", dataIndex: 'category'},
		{header: "Deadline", dataIndex: 'deadline'},
		{header: "Priorité", dataIndex: 'priority', hidden : true},
		{header: "Retard permis", dataIndex: 'lateness', editor: boolean_edit(), renderer : boolean_render},
		{header: "Fait", dataIndex: 'done', editor: boolean_edit()}
	 ]);
	 
	  grid = new Ext.grid.EditorGridPanel({
		 //renderTo: 'corps',
		 //frame:true,
		 title: 'Task List',
		  height:500,
		 
		  store: storeTask,
		  colModel: columnModel,
		  view: new Ext.grid.GroupingView({
				getRowClass : function (record, index) {
								if(!record){
									return '';
								}
								if( record.data.ordre == 1){
									return 'red';
								}
								if( record.data.ordre == 5){
									return 'orange';
								}
								if( record.data.ordre == 10){
									return 'green';
								}
							},
				groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'})
		});
	}
	
	
	


	

	
	
	Ext.Ajax.request({
		url: 'index.php?page=accueil&task=infotask',
		method: 'GET',
		success : function ( result, request ) { 
			
			var resp = Ext.util.JSON.decode(result.responseText);
			

			storeTask = new Ext.data.GroupingStore({
				reader : new Ext.data.ArrayReader(
					{id:'id'}, 
					['id', 'name', 'category', 'color', 'priority', 'deadline', 'lateness', 'ordre', 'done']
				),


				sortInfo: {
					field: 'ordre',
					direction: "DESC"
				},
				groupField: 'priority',
				fields: ['id', 'name', 'category', 'color', 'priority', 'deadline', 'lateness', 'ordre', 'done'],
				data : resp.rows
			});
			
			//Ext.Msg.alert('Hello', storeTask.getCount() + " salut");
			init();
			ready_view = true;
			ready();
		}
	});

}




