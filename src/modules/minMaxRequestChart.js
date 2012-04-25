// modules/minMaxRequestsChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("minMaxRequestsChart module loaded:::");
	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			maxDay : "Sunday",
			maxRequests : Math.round(Math.random() * 100000),
			minDay : "Wednesday",
			minRequests : Math.round(Math.random() * 50000),
		},
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
        	console.log("minMaxRequestsChart DATA", data);
        	// note that the original result contains tweets inside of a 'results' array, not at 
        	// the root of the response.
        	return new ChartModule.Model({
				maxDay : "Sunday",
				maxRequests : Math.round(Math.random() * 100000),
				minDay : "Wednesday",
				minRequests : Math.round(Math.random() * 50000),
				});
    	}
	});




	ChartModule.Views.MinMaxRequestsChart = Backbone.View.extend({
		el : '#minMaxRequestsChart',
		/*template: _.template($('#minMaxRequestsChart-template').html()),*/
		initialize : function() {
			_.bindAll(this, "render", "drawChart");
			this.model.bind("change", this.render);
			console.info("minMaxRequestsChart iniitialized");
		},
		render : function() {
			this.drawChart()
			return this;
		},
		drawChart : function() {
			var canvas = this.$(".acpm-canvas")[0];
			var r = Raphael(canvas), pie = r.piechart(175, 125, 100, [this.model.get("maxRequests"), this.model.get("minRequests")], {
				colors:["#404040","#CC0033"],
				legend : ["%%.%% - " + this.model.get("maxDay") +" ("+this.model.get("maxRequests")+")", "%%.%% - " + this.model.get("minDay")+" ("+this.model.get("minRequests")+")"],
				legendpos : "south"
			});
			//r.text(r.width*0.5, 20, "Min Max Request Days").attr({font : "14px 'AudiTypeBold'"});
			pie.hover(function() {
				this.sector.stop();
				//this.sector.scale(1.05, 1.05, this.cx, this.cy);
				this.sector.animate({
					transform : 's1.05 1.05 ' + this.cx + ' ' + this.cy
				}, 250, "easeIn");

				if(this.label) {
					this.label[0].stop();
					this.label[0].attr({
						"font-size": 12, "font-family": "'AudiTypeNormal', sans-serif",
						r : 5.5
					});
					this.label[1].attr({
						"font-size": 12, "font-family": "'AudiTypeBold', sans-serif",
					});
				}
			}, function() {
				this.sector.animate({
					transform : 's1 1 ' + this.cx + ' ' + this.cy
				}, 250, "easeOut");
				if(this.label) {
					this.label[0].animate({
						r : 5
					}, 250, "easeOut");
					this.label[1].attr({
						"font-size": 12, "font-family": "'AudiTypeNormal', sans-serif",
					});
				}
			});
		}
	});
})(acpm.app.module("minMaxRequestsChart"));
