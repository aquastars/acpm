// modules/numRequestChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("numRequestChart module loaded:::");
	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			date : new Date(),
			value : Math.random() * 100000,
			name : "unknown",
			id : 0
		}
		,
		initialize: function(query) {
        	this.query = query||"cats";
    	},

     url: function() {
      if(acpm.app.isMocked){
          return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
      }
      else{
        return //TODO ACPM URL
      }
      },

    	parse: function(data) {
        	console.log("numRequestChart DATA", data);
        	// note that the original result contains tweets inside of a 'results' array, not at 
        	// the root of the response.
        	return {
			date : new Date(),
			value : Math.random() * 100000,
			name : "unknown",
			id : 0
		};
    	}
	});

	ChartModule.Views.GoogleChart = function(canvas, data) {
		function drawChart() {
			var data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Sales');
        data.addColumn('number', 'Expenses');
        data.addRows([
          ['2004', 1000, 400],
          ['2005', 1170, 460],
          ['2006', 660, 1120],
          ['2007', 1030, 540]
        ]);

        var options = {
          title: 'Company Performance',
          vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
        };

        var chart = new google.visualization.LineChart(canvas);
        chart.draw(data, options);
		};
		if(acpm.app.googleChartApiLoaded){
			drawChart();
		}
		else{
			console.error("GOOGLE Visualization API has not been loaded!");
		}
	}

	ChartModule.Views.NumRequestChart = Backbone.View.extend({
		el : '#numRequestChart',
		initialize : function() {
			_.bindAll(this, "render");
			console.info("numRequestChart iniitialized");
			this.model.bind("change", this.render);
		},
		render : function() {
			//add GoogleChart from AJAX API via iFrame
			var target = this.$(".acpm-canvas").empty();
			target = target[0];
				if(acpm.app.googleChartApiLoaded){
					//add GoogleChart from AJAX API via iFrame
					new ChartModule.Views.GoogleChart(target, {});
				}
				else{
					google.load('visualization', '1.1', {
						packages : ['corechart', 'controls'],
						"callback" : function() {
							log("Google Charts API Loaded...");
							acpm.app.googleChartApiLoaded=true;
							new ChartModule.Views.GoogleChart(target, {});
							}
						});
				}
			
			return this;
		}
	});
})(acpm.app.module("numRequestChart"));
