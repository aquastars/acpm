// modules/configuredCarlinesChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
 console.info("configuredCarlinesChart module loaded:::");

 ChartModule.Model = Backbone.Model.extend({
   defaults: {
     date:new Date().toString('yyyy-MM-dd')
   },
     url: function() {
          return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
      },

      parse: function(data) {
          console.log("configuredCarlinesChart DATA", data);
          // note that the original result contains tweets inside of a 'results' array, not at 
          // the root of the response.
          return data;
      }
 });
 

 ChartModule.Views.ConfiguredCarlinesChart=Backbone.View.extend({
	  		el: '#configuredCarlinesChart',
	  		initialize:function(){
            console.info("ConfiguredCarlinesChart initialized");
	  				_.bindAll(this,"render");
		  			this.model.bind("change",this.render);
	  		},
	  		render: function() {
        var canvas = this.$(".acpm-chart ").empty()[0];
	   				var chart=new acpm.modules.charts.DoubleBarChart(canvas,{width:canvas.width,height:500});
                chart.draw();
	    			return this;
	  				}
		});

})(acpm.app.module("configuredCarlinesChart"));

