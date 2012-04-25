// Module reference argument, assigned at the bottom
;(function(Mock) {
	console.log("Mock initialized",Mock);
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
})(acpm.namespace("acpm.utils.mock"));

