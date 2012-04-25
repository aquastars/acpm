// modules/favoriteActionsChart.js
// Module reference argument, assigned at the bottom
;(function(ChartModule) {
	 console.info("favoriteActionsChart module loaded:::");
	 ChartModule.Model = Backbone.Model.extend({
	   defaults: {
	     action:"unknown_action",
	     name:"unknown action",
	     requests:600,
	   }
	 });
	 
	 ChartModule.List = Backbone.Collection.extend({
	   model: ChartModule.Model,
	   //order by 'value' key descending
	   comparator:function(m) { return -m.get('requests'); },
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
        	console.log("favoriteActionsChart DATA", data);
        	// note that the original result contains tweets inside of a 'results' array, not at 
        	// the root of the response.
        			var arr = [];
        			var actions=["set-carline","remove-package",'set-wheel','next=interior-page','set-extcolor'];
        			actions=_.shuffle(actions);
		//mock/generate 1000 Items
		for(var i = 0; i < 5; i++) {
			arr.push(new ChartModule.Model({
				action : actions[i],
				name : "action_" + i,
				requests : acpm.utils.getRandomNumberInRange(0, 5000)
			}));
		}
        	return arr;
    	}
	 });

	 ChartModule.Views.FavoriteActionsChart=Backbone.View.extend({
		  		el: '#favoriteActionsChart',
		  		initialize:function(){
		  			this.tmpl=_.template($('#favoriteActionsChart-template').html()),
		  			_.bindAll(this,"render");
		  			this.collection.bind("reset",this.render);
		  			console.info("FavoriteActionsChart initialized");
		  		},
		  		render: function() {
		  			
		  			var coll=this.collection,max,i,item,len;
		  			len=coll.length<6?coll.length:5;
		  			//get max Value from collection
		  			max=this.collection.max(function(co){ return co.get("requests");});
		  			log("max value in collection: "+max.get("requests"),max);
		  			max=max.get("requests");
		  			for(i=0;i<len;i++){
		  				item=coll.at(i);
		  				$(this.tmpl(item.toJSON())).appendTo(this.$("ul")).find(".chart-bar").css({width:0}).animate({width:(item.get('requests')/max*this.$("ul").width())+"px"},1500);
		  			};
		    			return this;
		  			}
			});
})(acpm.app.module("favoriteActionsChart"));

