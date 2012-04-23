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
	   				var chart=new BarChart(canvas,[12,20,30,40,99,28,34,64,22,99]);
                chart.draw();
	    			return this;
	  				}
		});


function BarChart(targetCanvas,datapoints){
    if (! (this instanceof arguments.callee)) {
    return new arguments.callee(elementName, datapoints, opts);
  }
  var self=this;
  this.barWidth = 20;
  this.spacing = 10;
  this.barColor="#a55";
  this.draw = function () {
    var paper = Raphael(targetCanvas, 500,300);
    // Normalize
    var normalizedDatapoints = [],
      maximumDatavalue = Math.max.apply(Math, datapoints),
      i = 0,
      barColor, xOffset, yOffset, bar, targetLine;

    for (i = 0; i < datapoints.length; i = i + 1) {
      normalizedDatapoints[i] = datapoints[i] / maximumDatavalue;
    }
    // Bars
    for (i = 0; i < datapoints.length; i = i + 1) {
      xOffset = i * (self.barWidth + self.spacing) + self.width - datapoints.length * (self.barWidth + self.spacing);
      yOffset = this.height - normalizedDatapoints[i] * self.height;
      bar = paper.crispRect(xOffset, yOffset, self.barWidth, normalizedDatapoints[i] * self.height);
      bar.attr({
        "stroke": this.barColor,
        "fill": this.barColor
      });
    } 
}

}




})(acpm.app.module("configuredCarlinesChart"));

