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
				return "http://jsfiddle.net/echo/jsonp?result="+JSON.stringify(acpm.utils.mock.allRequestsData())+"&callback=?";
			} else {
				return //TODO ACPM URL
			}
		},
		parse : function(data) {
			var result=JSON.parse(data.result)
			console.log("allRequestsChart DATA",result);
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
