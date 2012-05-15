// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// modules/configuredCarlinesChart.js
// Module reference argument, assigned at the bottom
(function(ChartModule) {
	console.info("configuredCarlinesChart module loaded:::");

	ChartModule.Model = Backbone.Model.extend({
		defaults : {
			labels : ["Q8", "A4", "A1", "A6", "A7"],
			data : {"01/2012":[17, 20, 75, 48, 32],"02/2012":[38, 51, 49, 38, 59],"03/2012":[38, 51, 49, 38, 59]}
		},
		url : function() {
			if(acpm.app.isMocked) {
				return "http://jsfiddle.net/echo/jsonp?result="+JSON.stringify(acpm.utils.mock.configuredCarlinesData(12, 12, 89))+"&callback=?";
			} else {
				return //TODO ACPM URL
			}
		},
		parse : function(data) {
			var result=JSON.parse(data.result)
			console.log("configuredCarlinesChart DATA",result);
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
				data : [this.model.get("data")[this.selectedValues[0]],this.model.get("data")[this.selectedValues[1]]],
				labels : this.model.get("labels")
			});
			chart.draw();
		},
		initDropDownMenu:function(){
			//no dropdown was selected=>select first and second
			var dateKeys=_.keys(this.model.get("data"));
			if(!this.selectedValues){
				var len=dateKeys.length;
				for(var i=0;i<len;i++){
					this.$(".upperSelect").append("<option>"+dateKeys[i]+"</option>");
					this.$(".lowerSelect").append("<option>"+dateKeys[i]+"</option>");
				}
				this.$(".upperSelect")[0].selectedIndex=0;
				this.$(".lowerSelect")[0].selectedIndex=1;
				this.selectedValues=[dateKeys[0],dateKeys[1]];
			}
		}


	});

})(acpm.app.module("configuredCarlinesChart"));
