// modules/mostConfiguredCarlineChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("mostConfiguredCarlineChart module loaded:::");

	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			carline : "A4",
			configurations : Math.round(Math.random() * 10000),
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
			console.log("mostConfiguredCarlineChart DATA", data);
			// note that the original result contains tweets inside of a 'results' array, not at
			// the root of the response.
			var result = data;
			if(acpm.app.isMocked) {
				result = acpm.utils.mock.mostConfiguredCarlineData();
			}
			return result;
		}
	});

	ChartModule.Views.MostConfiguredCarlineChart = Backbone.View.extend({
		el : '#mostConfiguredCarlineChart',
		template : _.template($('#mostConfiguredCarlineChart-template').html()),
		events : {},
		initialize : function() {
			_.bindAll(this, "render");
			this.model.bind("change", this.render);
			console.info("mostConfiguredCarlineChart initialized");
		},
		render : function() {
			console.log($(this.el),this.template);
			$(this.el).append(this.template(this.model.toJSON()));
			return this;
		}
	});
})(acpm.app.module("mostConfiguredCarlineChart"));
