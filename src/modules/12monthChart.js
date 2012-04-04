// modules/12monthChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("12monthChart module loaded:::");
	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			value : 500,
			name : "unknown name",
			id : 0
		}
	});

	ChartModule.List = Backbone.Collection.extend({
		model : ChartModule.Model,
		//order by 'value' key descending
		comparator : function(m) {
			return -m.get('value');
		}
	});

	ChartModule.Views.GoogleChart = function(canvas, data) {
		
		function drawChart() {
			// Some raw data (not necessarily accurate)
			var rowData = [['Pages','ModelPage','Motor', 'Interior', 'Exterior', 'Equipment',  'Specials', 'AVG'], ['Jan', 165, 938, 522, 998, 450, 8614, 1200], ['Feb', 135, 1120, 599, 3268, 288, 682, 2000], ['Mar', 157, 1167, 587, 807, 397, 623, 400], ['Apr', 139, 1110, 615, 968, 215, 6094, 2400], ['Jun', 136, 691, 629, 1026, 2366, 5696, 3366], ['Jul', 165, 938, 522, 998, 450, 614, 900], ['Aug', 139, 1110, 615, 1968, 215, 609, 555], ['Sep', 165, 938, 2522, 998, 450, 614, 666], ['Okt', 135, 1120, 599, 1268, 288, 682, 777], ['Nov', 157, 1167, 587, 807, 397, 623, 888], ['Dez', 157, 1167, 587, 807, 397, 623, 333]];

			// Create and populate the data table.
			var data = google.visualization.arrayToDataTable(rowData);

			// Create and draw the visualization.
			var ac = new google.visualization.ComboChart(canvas);
			ac.draw(data, {
				title : 'Monthly configurator-page requests',
				width : canvas.width,
				height : canvas.height,
				colors : ['red', '#404040', 'blue', 'grey', 'lime', '#a55', '#123456'],
				vAxis : {
					title : "Requests"
				},
				hAxis : {
					title : "Month"

				},
				seriesType : "bars",
				isStacked : true,
				series : {
					6 : {
						color : '#cc0033',
						type : "line"
					}
				}
			});
		};
	if(acpm.app.googleChartApiLoaded){
			drawChart();
		}
		else{
			console.error("GOOGLE Visualization API has not been loaded!");
		}
	}


	ChartModule.Views.month12Chart = Backbone.View.extend({
		el : '#12monthChart',
		initialize : function() {
			_.bindAll(this, "render");
			this.collection.bind("reset",this.render);
			console.info("12monthChart initialized");
		},
		render : function() {
			//add GoogleChart from AJAX API via iFrame
			//TODO Bugfix this.$(".acpm-canvas") !!!!
			var target = jQuery(".acpm-12months")[0];
			log(target);
			new ChartModule.Views.GoogleChart(target, {});
			return this;
		}
		
	});
})(acpm.app.module("12monthChart"));
