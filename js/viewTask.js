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
				data : [[1, 'oui'], [0, 'non']]
				
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
		
		var fm = Ext.form, Ed = Ext.grid.GridEditor;
		columnModel = new Ext.grid.ColumnModel([
			{header: "Nom", dataIndex: 'name'},
			{header: "Categorie", dataIndex: 'category'},
			{header: "Deadline", dataIndex: 'deadline', renderer: Ext.util.Format.dateRenderer('d/m/Y')},
			{header: "Priorité", dataIndex: 'priority', hidden : true},
			{header: "Retard permis", dataIndex: 'lateness', renderer : boolean_render},
			/*{
				header: 'Fait',
				dataIndex: 'done',
				width: 55,
				renderer : function(v, p, record){
					p.css += ' x-grid3-check-col-td';
					return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
				},
				editor: new Ed(new fm.Checkbox())
			}*/
			{header: "Fait", dataIndex: 'done', editor: boolean_edit(), renderer : boolean_render}
	 ]);
	 
	  grid = new Ext.grid.EditorGridPanel({
		 //renderTo: 'corps',
		 //frame:true,
		 title: 'Task List',
		  height:500,
		 clicksToEdit:1,
		 waitMsg : 'saving',
		  store: storeTask,
		  colModel: columnModel,
		  listeners: {
		   afteredit: function(e){
			  Ext.Ajax.request({
				   url: 'index.php?page=accueil&task=updatetask',
				   method : 'GET',
				 
				  params: {
					 
					 id: e.record.get('id'),
					 field: e.field,
					 value: e.value
				  },
				  success: function(resp,opt) {
					  
					 e.record.commit();
				  },
				failure: function(resp,opt) {
						  Ext.Msg.alert('Hello', "rejet");
					 e.record.reject();
				  }
			  
				  
			  });

				  
		   }
		},

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
					['id', 'name', 'category', 'color', 'priority', {name : 'deadline' , type : 'date', dateFormat: 'Y-m-d'}, 'lateness', 'ordre', {name :'done', type : 'bool'}]
				),


				sortInfo: {
					field: 'ordre',
					direction: "DESC"
				},
				groupField: 'priority',
				fields: ['id', 'name', 'category', 'color', 'priority', {name : 'deadline' , type : 'date', dateFormat: 'Y-m-d'}, 'lateness', 'ordre', {name :'done', type : 'bool'}],
				data : resp.rows
			});
			
			//Ext.Msg.alert('Hello', storeTask.getCount() + " salut");
			init();
			ready_view = true;
			ready();
		}
	});

}


    

 Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};
