// modules/configuredCarlinesChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
 console.info("configuredCarlinesChart module loaded:::");

 ChartModule.Model = Backbone.Model.extend({
   defaults: {
     date:new Date().toString('yyyy-MM-dd'),
     data:[10,20,7,8,32]
   }
 });
 
ChartModule.List = Backbone.Collection.extend({

    model : ChartModule.Model,

    initialize: function(query) {
          this.query = query||"cats";
      },

      url: function() {
          return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
      },

      parse: function(data) {
          console.log("configuredCarlinesChart DATA", data);
          // note that the original result contains tweets inside of a 'results' array, not at 
          // the root of the response.
          return new ChartModule.Model();
      }
  });

 ChartModule.Views.ConfiguredCarlinesChart=Backbone.View.extend({
	  		el: '#configuredCarlinesChart',
	  		initialize:function(){
            console.info("ConfiguredCarlinesChart initialized");
	  				_.bindAll(this,"render");
		  			this.collection.bind("reset",this.render);
	  		},
	  		render: function() {
        var canvas = this.$(".acpm-canvas")[0];
	   				var chart=new acpm.modules.charts.StackBarChart(canvas,{width:canvas.width,height:500,data:[12,20,14,27,19]});
                chart.draw();
	    			return this;
	  				}
		});

})(acpm.app.module("configuredCarlinesChart"));

