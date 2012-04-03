// modules/top5Chart.js
// Module reference argument, assigned at the bottom
;(function(ChartModule) {
	 console.info("top5Chart module loaded:::");
	 ChartModule.Model = Backbone.Model.extend({
	   defaults: {
	     value:500,
	     name:"unknown name",
	     max:600,
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
		  		initialize:function(){
		  			this.tmpl=_.template($('#top5Chart-template').html()),
		  			_.bindAll(this,"render");
		  			this.collection.bind("reset",this.render);
		  			console.info("Top5Chart initialized");
		  		},
		  		render: function() {
		  			var coll=this.collection,max,i,item,len;
		  			len=coll.length<6?coll.length:5;
		  			//get max Value from collection
		  			max=this.collection.max(function(co){ return co.get("value");});
		  			log("max value in collection: "+max.get("value"),max);
		  			max=max.get("value");
		  			for(i=0;i<len;i++){
		  				item=coll.at(i);
		  				$(this.tmpl(item.toJSON())).appendTo(this.$("ul")).find(".chart-bar").css({width:0}).animate({width:(item.get('value')/max*this.$("ul").width())+"px"},1500);
		  			};
		    			return this;
		  			}
			});
})(acpm.app.module("top5Chart"));

