// modules/configuredCarlinesChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("configuredCarlinesChart module loaded:::");

	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			labels : ["Q8", "A4", "A1", "A6", "A7"],
			data : [[17, 20, 75, 48, 32], [38, 51, 49, 38, 59]],
		},
		url : function() {
			if(acpm.app.isMocked) {
				return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
			} else {
				return //TODO ACPM URL
			}
		},
		parse : function(data) {
			console.log("configuredCarlinesChart DATA", data);
			// note that the original result contains tweets inside of a 'results' array, not at
			var result=data;
			if(acpm.app.isMocked) { result = acpm.utils.mock.configuredCarlinesData(12, 12, 89);}
			return result;
		}
	});

	ChartModule.Views.ConfiguredCarlinesChart = Backbone.View.extend({
		el : '#configuredCarlinesChart',
		initialize : function() {
			console.info("ConfiguredCarlinesChart initialized");
			_.bindAll(this, "render");
			this.model.bind("change", this.render);
		},
		render : function() {
			console.log("MODEL", this.model);
			var canvas = this.$(".acpm-chart ").empty()[0];
			var chart = new acpm.modules.charts.DoubleBarChart(canvas, {
				width : canvas.width,
				height : 500,
				data : this.model.get("data"),
				labels : this.model.get("labels")
			});
			chart.draw();
			return this;
		}
	});

})(acpm.app.module("configuredCarlinesChart"));
