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
          console.log("12monthChart DATA", data);
          // note that the original result contains tweets inside of a 'results' array, not at 
          // the root of the response.
          return data.results;
      }
  });

 ChartModule.Views.ConfiguredCarlinesChart=Backbone.View.extend({
	  		el: '#configuredCarlinesChart',
	  		events: {},
	  		initialize:function(){
	  				_.bindAll(this,"render");
		  			this.collection.bind("change",this.render);
	  			console.info("ConfiguredCarlinesChart initialized");
	  		},
	  		render: function() {
	   				drawChart(target,this.collection);
	    			return this;
	  				}
		});


function drawChart(target,data){
  
}




})(acpm.app.module("configuredCarlinesChart"));

