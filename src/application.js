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
acpm.namespace("acpm.utils");
acpm.utils = {
	//get a random Number within a given range
	getRandomNumberInRange : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};

//add APP namespace
acpm.namespace("acpm.app");
acpm.app = {
	//reference to this
	root : this,
	// Create this closure to contain the cached modules/"Classes"
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
	//cache all used ModelsInstances
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
	//cache all ViewInstances
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
	//main initialization of the application
	init : function() {
		//TestChart
		var AllRequestsChartModule = acpm.app.module('allRequestsChart');
		var allRequestsChartModel = new AllRequestsChartModule.Model();
		var allRequestsChartView = new AllRequestsChartModule.Views.AllRequestsChart({
			model : allRequestsChartModel
		});
		acpm.app.models.add("allRequestsChartModel", allRequestsChartModel);

		//Top5 Chart
		var Top5ChartModule = acpm.app.module('top5Chart');
		var top5ChartList = new Top5ChartModule.List();
		acpm.app.models.add("top5ChartModel", top5ChartList);
		top5ChartView = new Top5ChartModule.Views.Top5Chart({
			collection : top5ChartList
		});
		//render CollectionView ==>trigger reset event
		var minMaxRequestModule = acpm.app.module("minMaxRequestsChart");
		var minMaxRequestsModel = new minMaxRequestModule.Model();
		acpm.app.models.add("minMaxRequestsModel", minMaxRequestsModel);
		var minMaxRequestView = new minMaxRequestModule.Views.MinMaxRequestsChart({
			model : minMaxRequestsModel
		});
		var month12ChartModule = acpm.app.module("12monthChart");
		var month12ChartList = new month12ChartModule.List();
		acpm.app.models.add("month12ChartList", month12ChartList);
		var month12ChartView = new month12ChartModule.Views.Month12Chart({
			collection : month12ChartList
		});
		//
		var numRequestChartModule = acpm.app.module("numRequestChart");
		var numRequestChartModel = new numRequestChartModule.Model();
		acpm.app.models.add("numRequestChartModel", numRequestChartModel);
		var numRequestChartView = new numRequestChartModule.Views.NumRequestChart({
			model : numRequestChartModel
		});

		var favoriteActionsChartModule=acpm.app.module("favoriteActionsChart");
		var favoriteActionsList=new favoriteActionsChartModule.List();
		acpm.app.models.add("favoriteActionsList", favoriteActionsList);
		var favoriteActionsChartView = new favoriteActionsChartModule.Views.FavoriteActionsChart({
			collection : favoriteActionsList
		});
		
		var configuredCarlinesModule=acpm.app.module("configuredCarlinesChart");
		var configuredCarlinesModel=new configuredCarlinesModule.Model();
		acpm.app.models.add("configuredCarlinesModel",configuredCarlinesModel);
		var configuredCarlinesChartView=new configuredCarlinesModule.Views.ConfiguredCarlinesChart({
			model:configuredCarlinesModel
			});
/*		var that = this;
		google.load('visualization', '1.1', {
			packages : ['corechart', 'controls'],
			"callback" : function() {
				log("Google Charts API Loaded...");
				that.googleChartApiLoaded=true;
				that.initModels();
			}
		});*/
		this.initModels();

	},
	googleChartApiLoaded:false,
	//initialization of the models with MockData
	initModels : function() {
		var numRequestChartModel = acpm.app.models.get("numRequestChartModel").fetch();
		var top5ChartList = acpm.app.models.get("top5ChartModel").fetch();
		var allRequestsChartModel = acpm.app.models.get("allRequestsChartModel").fetch();
		var month12ChartList=acpm.app.models.get("month12ChartList").reset([]);
		var minMaxRequestsModel=acpm.app.models.get("minMaxRequestsModel").fetch();
		var favoriteActionsList=acpm.app.models.get("favoriteActionsList").fetch();
		var configuredCarlinesModel=acpm.app.models.get("configuredCarlinesModel").fetch();
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


Array.max = function( array ){
return Math.max.apply( Math, array );
};

// Function to get the Min value in Array
Array.min = function( array ){
return Math.min.apply( Math, array );
};

// "{animal} on a {transport}".supplant({animal: "frog", transport: "rocket"})
String.prototype.supplant = function (o) {
  return this.replace(/\{([^{}]*)\}/g, function (a, b) {
    var r = o[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
};


