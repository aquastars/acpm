// modules/configuredCarlinesChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("configuredCarlinesChart module loaded:::");

	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			labels : ["Q8", "A4", "A1", "A6", "A7"],
			data : [[17, 20, 75, 48, 32], [38, 51, 49, 38, 59]],
			dates:["01/2012","02/2012","03/2012","04/2012","05/2012"]
		},
		url : function() {
			if(acpm.app.isMocked) {
				return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
			} else {
				return //TODO ACPM URL
			}
		},
		parse : function(data) {
			console.log("configuredCarlinesChart DATA", data);
			// note that the original result contains tweets inside of a 'results' array, not at
			var result=data;
			if(acpm.app.isMocked) { result = acpm.utils.mock.configuredCarlinesData(12, 12, 89);}
			return result;
		}
	});

	ChartModule.Views.ConfiguredCarlinesChart = Backbone.View.extend({
		el : '#configuredCarlinesChart',
		events:{
			"change .upperSelect":"onDateSelect",
			"change .lowerSelect":"onDateSelect"
		},
		"selectedValues":null,
		onDateSelect:function(evt){
			if(evt.currentTarget.className==="upperSelect"){
				this.selectedValues[0]=evt.currentTarget.value;
			}
			else{
				this.selectedValues[1]=evt.currentTarget.value;
			}
			this.model.fetch();
		},
		initialize : function() {
			console.info("ConfiguredCarlinesChart initialized");
			_.bindAll(this, "render");
			this.model.bind("change", this.render);
		},
		render : function() {
			console.log("MODEL", this.model);
			this.initDropDownMenu();
			this.drawChart();
			return this;
		},
		drawChart:function(){
			var canvas = this.$(".acpm-chart ").empty()[0];
			var chart = new acpm.modules.charts.DoubleBarChart(canvas, {
				width : canvas.width,
				height : 500,
				data : this.model.get("data"),
				labels : this.model.get("labels")
			});
			chart.draw();
		},
		initDropDownMenu:function(){
			//no dropdown was selected=>select first and second
			if(!this.selectedValues){
				var len=this.model.get("data").length;
				for(var i=0;i<len;i++){
					this.$(".upperSelect").append("<option>"+this.model.get("dates")[i]+"</option>");
					this.$(".lowerSelect").append("<option>"+this.model.get("dates")[i]+"</option>");
				}
				this.$(".upperSelect").selectedIndex=0;
				this.$(".lowerSelect").selectedIndex=1;
				this.selectedValues=[this.model.get("dates")[0],this.model.get("dates")[1]];
			}
		}


	});

})(acpm.app.module("configuredCarlinesChart"));
