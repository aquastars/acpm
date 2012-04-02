// modules/allRequestsChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
 console.info("allRequestsChart module loaded:::");
 ChartModule.Model = Backbone.Model.extend({
   defaults: {
     date:new Date().toString('yyyy-MM-dd'),
     overallRequests:Math.round(Math.random()*10000),
     tendency:"+"
   }
 });
 
 ChartModule.List = Backbone.Collection.extend({
   model: ChartModule.Model
 });

 ChartModule.Views.AllRequestsChart=Backbone.View.extend({
	  		el: '#testChart',
	  		template: _.template($('#allRequestsChart-template').html()),
	  		events: {},
	  		initialize:function(){
	  				_.bindAll(this,"render");
		  			this.model.bind("change",this.render);
	  			console.info("AllRequestsChart initialized");
	  		},
	  		render: function() {
	   				$(this.el).html(this.template(this.model.toJSON()));
	    			return this;
	  				}
		});
})(acpm.app.module("allRequestsChart"));

