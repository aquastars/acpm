// modules/top5Chart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	 console.info("top5Chart module loaded:::");
	 ChartModule.Model = Backbone.Model.extend({
	   defaults: {
	     value:500,
	     name:"unknown name",
	     id:0
	   }
	 });
	 
	 ChartModule.List = Backbone.Collection.extend({
	   model: ChartModule.Model,
	   //order by 'value' key descending
	   comparator:function(m) { return -m.get('value'); }
	 });

	 ChartModule.Views.Top5Chart=Backbone.View.extend({
		  		el: '#top5Chart',
		  		template: _.template($('#top5Chart-template').html()),
		  		initialize:function(){
		  			_.bindAll(this,"render");
		  			this.collection.bind("reset",this.render);
		  			console.info("Top5Chart initialized");
		  		},
		  		render: function() {
		  			var that=this;
		  			var collection=this.collection;
		  			collection.each(function(item){
		  				this.$(".top5-overview").append(that.template(item.toJSON()));
		  			});
		    			return this;
		  			}
			});
})(acpm.app.module("top5Chart"));

