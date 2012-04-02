var acpm = acpm || {
	// Namespace creation method
	namespace : function(ns_string) {
		var parts = ns_string.split('.'), parent = acpm, i;
		// strip redundant leading global
		if(parts[0] === "acpm" || (parts[0] === "dbad") || (parts[0] === "acpm")) {
			parts = parts.slice(1);
		}
		for( i = 0; i < parts.length; i += 1) {
			// create a property if it doesn't exist
			if( typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	}
};
//add APP namespace
acpm.namespace("acpm.app");
acpm.app = {
	//reference to this
	root : this,
	// Create this closure to contain the cached modules
	module : function() {
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an
		// existing module.
		return function(name) {
			// If this module has already been created, return it.
			if(modules[name]) {
				return modules[name];
			}

			// Create a module and save it under this name
			return modules[name] = {
				Views : {}
			};
		};
	}(),
	//cache all used Models
	models : function() {
		var cached = {};
		var add = function(name, model) {
			if(!_.has(cached, name)) {
				cached[name] = model;
				return true;
			} else {
				console.warn("Ein Objekt mit dem Namen " + name + " ist schon vorhanden und wurde nicht überschrieben!!!Bitte das slte Objekt zuert entfernen!!!");
				return false
			}
		};
		var remove = function(name) {
			if(cached[name]) {
				var model = cached[name];
				if(model.url.base) {
					model.destroy();
				}
				delete cached[name];
				console.log("Model " + name + " was deleted");
			}
		};
		var get = function(name) {
			if(cached[name]) {
				var model = cached[name];
				return model;
			} else {
				console.log("Model " + name + " was not forund");
			}
		};
		var getKeys = function() {
			return _.keys(cached);
			//_.map(cached, function(num){ return num.toJSON(); });
		};
		return {
			add : add,
			remove : remove,
			get : get,
			getKeys : getKeys
		};
	}(),
	views : function() {
		var cached = {};
		var add = function(name, view) {
			if(!cached[name]) {
				cached[name] = view;
			}
		};
		var remove = function(name) {
			if(cached[name]) {
				var view = cached[name];
				try {
					view.dispose();
				} catch(ex) {
					console.log(ex, "View " + name + " could not be disposed!");
				}
			}
			delete cached[name];
			console.log("View " + name + " was deleted");
		};
		var get = function(name) {
			if(cached[name]) {
				var view = cached[name];
				return view;
			} else {
				console.log("View " + name + " was not forund");
			}
		};
		var getKeys = function() {
			return _.keys(cached);
			//_.map(cached, function(num){ return num.toJSON(); });
		};
		return {
			add : add,
			remove : remove,
			get : get,
			getKeys : getKeys
		};
	}(),
	//main initialization
	init : function() {
		//TestChart
		var AllRequestsChartModule = acpm.app.module('allRequestsChart');
		var allRequestsChartModel = new AllRequestsChartModule.Model;
		var allRequestsChartView = new AllRequestsChartModule.Views.AllRequestsChart({
			model : allRequestsChartModel
		});
		acpm.app.models.add("allRequestsChart", allRequestsChartModel);
		//trigger change event => render the view
		//testChartModel.set("date",new Date());
		allRequestsChartModel.trigger("change");
		//Top5 Chart
		var Top5ChartModule = acpm.app.module('top5Chart');
		var Top5ChartModel = Top5ChartModule.Model;
		var top5ChartList = new Top5ChartModule.List();
		acpm.app.models.add("top5ChartList", top5ChartList);
		top5ChartView = new Top5ChartModule.Views.Top5Chart({
			collection : top5ChartList
		});
		//render CollectionView ==>trigger reset event
		top5ChartList.reset([new Top5ChartModel({
			id : 0,
			value : 399
		}), new Top5ChartModel({
			id : 1
		}), new Top5ChartModel({
			id : 2,
			value : 125
		}), new Top5ChartModel({
			id : 3,
			value : 232
		}), new Top5ChartModel({
			id : 4,
			value : 600
		})]);
		var minMaxRequestModule=acpm.app.module("minMaxRequestsChart");
		var minMaxRequestsModel=new minMaxRequestModule.Model();
		var minMaxRequestView=new minMaxRequestModule.Views.MinMaxRequestsChart({model:minMaxRequestsModel});
		minMaxRequestView.render();
	}
};

//start/initialize APP here==================================================================>
// Using the jQuery ready event is excellent for ensuring all
// code has been downloaded and evaluated and is ready to be
// initialized. Treat this as your single entry point into the
// application.
jQuery(function($) {

	// Initialize application here.
	acpm.app.init();

});
//===============================================================================================
//COMMON JS FUNCTIONS
//===============================================================================================
//usage: log('inside coolFunc',this,arguments);
//http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
	log.history = log.history || [];
	// store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
		console.log(Array.prototype.slice.call(arguments));
	}
};
