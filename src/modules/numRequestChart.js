// modules/numRequestChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
 console.info("numRequestChart module loaded:::");
 ChartModule.Model = Backbone.Model.extend({
   defaults: {
     date:new Date(),
     value:1000,
     name:"unknown",
     id:0
   }
 });
 
 ChartModule.List = Backbone.Collection.extend({
   model: ChartModule.Model
 });

 ChartModule.Views.TestChart=Backbone.View.extend({
	  		el: '#numRequestChart',
	  		template: _.template($('#numRequestChart-template').html()),
	  		events: {},
	  		initialize:function(){
	  			console.info("numRequestChart iniitialized");
	  		},
	  		render: function() {
	   				this.$("acpm-requests-per-dealer").html(this.template(this.model.toJSON()));
	    			return this;
	  				}
		});
})(acpm.app.module("numRequestChart"));

