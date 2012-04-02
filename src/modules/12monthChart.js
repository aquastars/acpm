// modules/12monthChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	 console.info("12monthChart module loaded:::");
	 ChartModule.Model = Backbone.Model.extend({
	   defaults: {
	     value:500,
	     name:"unknown name",
	     id:0
	   }
	 });
	 
	 ChartModule.List = Backbone.Collection.extend({
	   model: ChartModule.Model,
	   //order by 'value' key descending
	   comparator:function(m) { return -m.get('value'); }
	 });

	 ChartModule.Views.month12Chart=Backbone.View.extend({
		  		el: '#12monthChart',
		  		initialize:function(){
		  			_.bindAll(this,"render","drawVisualization");
		  			//this.collection.bind("reset",this.render);
		  			console.info("12monthChart initialized",google);
		  			//google.load("visualization", "1", {packages: ["corechart"]});
		  			//google.setOnLoadCallback(function(){alert("hello");});
		  		},
		  		render: function() {
		  			var that=this;
		  			//draw Chart
		    		return this;
		  		},
		  		 drawVisualization:function() {
		  		 console.log("GHJGJHGJH",google);
  						// Create and populate the data table.
  				  var data = new google.visualization.DataTable();
				  var raw_data = [['A1', 1336060, 1538156, 1576579, 1600652, 1968113, 1901067],
				                  ['A2', 3817614, 3968305, 4063225, 4604684, 4013653, 6792087],
				                  ['A4', 974066, 928875, 1063414, 940478, 1037079, 1037327],
				                  ['Q5', 1104797, 1151983, 1156441, 1167979, 1207029, 1284795],
				                  ['Q7', 6651824, 5940129, 5714009, 6190532, 6420270, 6240921],
				                  ['A8', 15727003, 17356071, 16716049, 18542843, 19564053, 19830493]];
				  
				  var years = [2003, 2004, 2005, 2006, 2007, 2008];              
				  data.addColumn('string', 'Year');
				  for (var i = 0; i  < raw_data.length; ++i) {
				    data.addColumn('number', raw_data[i][0]);    
				  }
				  
				  data.addRows(years.length);
				
				  for (var j = 0; j < years.length; ++j) {    
				    data.setValue(j, 0, years[j].toString());    
				  }
				  for (var i = 0; i  < raw_data.length; ++i) {
				    for (var j = 1; j  < raw_data[i].length; ++j) {
				      data.setValue(j-1, i+1, raw_data[i][j]);    
				    }
				  }
				  
				  // Create and draw the visualization.
				  new google.visualization.ColumnChart(this.el).
				      draw(data,
				           {title:"Yearly Configurations by Carline", 
				            width:300, height:200,
				            hAxis: {title: "Year"},
				            isStacked:true}
				      );
				}
			});
})(acpm.app.module("12monthChart"));

