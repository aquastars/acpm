// modules/allRequestsChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("allRequestsChart module loaded:::");

	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			date : new Date().toString('yyyy-MM-dd'),
			overallRequests : Math.round(Math.random() * 10000),
			tendency : "+"
		},
		initialize : function(query) {
			this.query = query || "cats";
		},
		url : function() {
			if(acpm.app.isMocked) {
				return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
			} else {
				return //TODO ACPM URL
			}
		},
		parse : function(data) {
			console.log("allRequestsChart DATA", data);
			// note that the original result contains tweets inside of a 'results' array, not at
			// the root of the response.
			var result = data;
			if(acpm.app.isMocked) {
				result = acpm.utils.mock.allRequestsData();
			}
			return result;
		}
	});

	ChartModule.Views.AllRequestsChart = Backbone.View.extend({
		el : '#testChart',
		template : _.template($('#allRequestsChart-template').html()),
		events : {},
		initialize : function() {
			_.bindAll(this, "render");
			this.model.bind("change", this.render);
			console.info("AllRequestsChart initialized");
		},
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
})(acpm.app.module("allRequestsChart"));
