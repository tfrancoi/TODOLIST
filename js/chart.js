
Ext.chart.Chart.CHART_URL = 'js/ext/resources/charts.swf';
/*Ext.onReady(function() {
	Ext.QuickTips.init();
	//Ext.Msg.alert("test", "test");	
	newDateChart();		
});*/



function newDateChart() {
	
	var store;
	function init() {

		

		// extra extra simple
		var win = new Ext.Window({
			//iconCls:'chart',
			title: 'ExtJS.com Visits Trend, 2007/2008 (Simple styling)',
			frame:true,
			width:500,
			height:300,
			layout:'fit',

			items: {
				xtype: 'columnchart',
				store: store,
				url: 'js/ext/resources/charts.swf',
				xField: 'deadline',
				
				yField: 'number',
				

				xAxis: new Ext.chart.CategoryAxis({
					labelRenderer : Ext.util.Format.dateRenderer('d/m')

				})
				/*yAxis: new Ext.chart.NumericAxis({
					displayName: 'Nombre de tâche',
					labelRenderer : Ext.util.Format.numberRenderer('0,0')
				}),
				tipRenderer : function(chart, record){
					return Ext.util.Format.number(record.data.number, '0,0') + ' visits in ' + record.data.deadline;
				}*/
			}
		});

		win.show();
	}
	
	
	Ext.Ajax.request({
		url: 'index.php?page=charts&task=datechart',
		method: 'GET',
		success : function ( result, request ) { 
			
			var resp = Ext.util.JSON.decode(result.responseText);
			
			
			store = new Ext.data.SimpleStore({	
				fields: [{name : 'deadline' , type : 'date', dateFormat: 'Y-m-d'}, {name : 'number', type : 'int'}],
				data : resp.rows
			});
			
			
			init();
			
		}
	});

   
}
