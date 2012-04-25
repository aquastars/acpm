// Module reference argument, assigned at the bottom
;(function(Mock) {
	console.log("Mock initialized",Mock);
	//configured Carlines chart
	Mock.configuredCarlinesData=function(numVals,maxVal,minVal){
		var i,j,arr,labels,data;
		labels=["Q8","A4","A1","A6","A7","A3","A5","Q7","Q5","A8","A2"];
		//
		numVals=Math.min(numVals||5,labels.length);
		arr=[];
			for(i=0;i<2;i++){
				data=[];
				for(j=0;j<numVals;j++){
					data.push(acpm.utils.getRandomNumberInRange(minVal,maxVal));
				}
				arr[i]=data;
			}
			var model={labels:labels.slice(0,numVals),data:arr};
		return model;
	}	
	//all requests chart
	Mock.allRequestsData=function(min, max){
		var data={
			date : new Date().toString('yyyy-MM-dd'),
			overallRequests : acpm.utils.getRandomNumberInRange(min||10000,max||75000),
			tendency : "+"};
			return data
	}
	//TOP5 Chart
	Mock.top5Data=function(){
		var Model,data = [];
		Model=acpm.app.module("top5Chart").Model;
			//mock/generate 1000 Items
			for(var i = 0; i < 10; i++) {
				data.push(
					new Model({
					id : i,
					name : "Retailer_" + i,
					value : acpm.utils.getRandomNumberInRange(0, 500)
				}));
			}
		return data;
	}
	
	Mock.MinMaxRequestsData=function(){
		var weekDays=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
		var data={
				maxDay : weekDays[new Date(Math.round(Math.random() * 10000)).getDay()],
				maxRequests : Math.round(Math.random() * 10000),
				minDay : weekDays[new Date(Math.round(Math.random() * 100000)).getDay()],
				minRequests : Math.round(Math.random() * 50000)
				}
		return data;
	}
})(acpm.namespace("acpm.utils.mock"));

