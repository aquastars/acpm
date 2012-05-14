// Module reference argument, assigned at the bottom
;(function(Mock) {
	console.log("Mock initialized", Mock);
	var carlines = ["Q8", "A4", "A1", "A6", "A7", "A3", "A5", "Q7", "Q5", "A8", "A2"];
	var actions = ["set-carline", "remove-package", 'set-wheel', 'next=interior-page', 'set-extcolor'];
	var pages = ["summary-page", "accessory-page", 'interior-page', 'carline-page', 'model-page'];
	var mandanten = ["ACCx-3d-fr", "ACCx-3d-de","ACCx-fr","ACCx-de","ACCx-uk","ACCx-cn","other"];
	//configured Carlines chart1
	Mock.configuredCarlinesData = function(numVals, maxVal, minVal) {
		var i, j, arr, data;

		//
		numVals = Math.min(numVals || 5, carlines.length);
		arr = {};
		for( i = 1; i < 9; i++) {
			data = [];
			for( j = 0; j < numVals; j++) {
				data.push(acpm.utils.getRandomNumberInRange(minVal, maxVal));
			}
			arr["0"+i+"/12"] = data;
		}
		var model = {
			labels : carlines.slice(0, numVals),
			data : arr
		};
		log(model);
		return model;
	}
	//all requests chart
	Mock.allRequestsData = function(min, max) {
		var data = {
			date : new Date().toString('yyyy-MM-dd'),
			overallRequests : acpm.utils.getRandomNumberInRange(min || 10000, max || 75000),
			tendency : "+"
		};
		return data
	}
	//TOP5 Chart
	Mock.top5Data = function() {
		var Model, data = [];
		Model = acpm.app.module("top5Chart").Model;
		//mock/generate 1000 Items
		for(var i = 0; i < 5; i++) {
			data.push(new Model({
				id : i,
				name : "Retailer_" + i,
				value : acpm.utils.getRandomNumberInRange(0, 500)
			}));
		}
		return data;
	}

	Mock.minMaxRequestsData = function() {
		var weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
		var data = {
			maxDay : weekDays[new Date(Math.round(Math.random() * 10000)).getDay()],
			maxRequests : Math.round(Math.random() * 10000),
			minDay : weekDays[new Date(Math.round(Math.random() * 100000)).getDay()],
			minRequests : Math.round(Math.random() * 50000)
		}
		return data;
	}

	Mock.mostConfiguredCarlineData = function() {
		var data = {
			carline : carlines[acpm.utils.getRandomNumberInRange(0, carlines.length - 1)],
			configurations : acpm.utils.getRandomNumberInRange(0, 10000)
		}
		return data;
	}
	
	Mock.sessionsPerMantantData=function(){
		var Model,arr=[];
		Model = acpm.app.module("sessionsPerMantantChart").Model;
		for(var i=0;i<mandanten.length;i++){
			arr.push(new Model({
				mandant:mandanten[i],
				sessions:acpm.utils.getRandomNumberInRange(333, 5000)
			}));
		};
		return arr;
	}
	
	Mock.favoriteActionsData=function(month){
		var Model,arr=[];
		Model = acpm.app.module("favoriteActionsChart").Model;
		actions = _.shuffle(actions);
		for(var i = 0; i < 5; i++) {
				arr.push(new Model({
					action : actions[i],
					name : "action_" + i,
					requests : acpm.utils.getRandomNumberInRange(0, 5000)
				}));
			}
		return arr;
	}
	
	Mock.pageRequestsData=function(month){
		var Model,arr=[];
		Model = acpm.app.module("pageRequestsChart").Model;
		for(var i=0;i<pages.length;i++){
			arr.push(new Model({
				page:pages[i],
				requests:acpm.utils.getRandomNumberInRange(333, 5000)
			}));
		};
		return arr;
	}
})(acpm.namespace("acpm.utils.mock"));
