// modules/testChartModule.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
 console.info("testChart module loaded:::");
 ChartModule.Model = Backbone.Model.extend({
   defaults: {
     date:new Date().toString('yyyy-MM-dd'),
     value:1000,
     name:"unknown",
     id:0
   }
 });
 
 ChartModule.List = Backbone.Collection.extend({
   model: ChartModule.Model
 });

 ChartModule.Views.TestChart=Backbone.View.extend({
	  		el: '#testChart',
	  		template: _.template($('#testChart-template').html()),
	  		events: {},
	  		initialize:function(){
	  				_.bindAll(this,"render");
		  			this.model.bind("change",this.render);
	  			console.info("TestChart initialized");
	  		},
	  		render: function() {
	   				$(this.el).html(this.template(this.model.toJSON()));
	    			return this;
	  				}
		});
})(acpm.app.module("testChart"));

