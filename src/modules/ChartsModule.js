
;(function(jQuery,Raphael,ChartsModule){
//============================================
//  DoubleBar Chart
//============================================	
	ChartsModule.DoubleBarChart=function(domID,config){
	if(!(this instanceof arguments.callee)){
		return new arguments.callee(arguments);
	}
	var defaults={
		width:200,
		height:500,
		colors:['#787878','#c6c6c6'],
		barWidth:40,
		offset:20,
		labels:["Q8","A4","A1","A6","A7"],
     	data:[[17,20,75,48,32],[38,51,49,38,59]],
     	startPosX:75
	}
	var self=this;
	self.init=function(){
			self.config=_.extend(defaults, config);
			self.paper=Raphael(domID,self.config.width,self.config.height);
	}

	self.getMaxValue=function(data){
		return Math.max(Array.max(data[0]),Array.max(data[1]));
	}

	self.draw=function(){
		var rect,textLabel,col,i,j,len,stackHeight,trans,chartVcenter,pos,dataArr,maxValue;
		chartVcenter=self.paper.height*0.5;
		maxValue=self.getMaxValue(self.config.data);
		log("MAX",maxValue);
		for(i=0;i<2;i++){
			dataArr=self.config.data[i];
			log(dataArr);
			len=dataArr.length;
		for(j=0;j<len;j++){
				col=self.config['colors'][i];
				rect=self.paper.rect((j*(self.config.barWidth+self.config.offset))+self.config.startPosX,0,self.config.barWidth,dataArr[j]);
				rect.id="bar_"+j+"seg_"+i;
				rect.attr({
					'stroke-width' : 1,
					'stroke' : col,
					'fill':col,
					"fill-opacity":1.0
				});
				rect.hover(function(){log("over",this);},function(){log("out",this);});
		//obere Zeile		
		if(i==0){
			trans=chartVcenter-dataArr[j];
			rect.transform("T0,"+trans);
		//TODO draw Grid
		var step,ticks,line;
		ticks=15;
		step=self.paper.height/(ticks-1);
		for(var k=1;k<ticks;k++){
			//line=self.paper.crispLine(0,(step*k),500,1)//self.paper.path("M0 "+(step*k)+"L500 "+(step*k));
			pos=(Math.ceil(step*k)+0.5);
			var line=self.paper.path("M0 "+pos+"L500 "+pos);
			line.attr({"stroke":"#C2C2C2","stroke-width":0.5});
		}
		//	
		//Tick Label
		pos=chartVcenter-rect.getBBox().height-25;
		textLabel=self.paper.text((j*(self.config.barWidth+self.config.offset)+self.config.startPosX)+(self.config.barWidth*0.5),pos,self.config.labels[j]);
			col="#787878";
			if(self.config.data[0][j]==maxValue||self.config.data[1][j]==maxValue){
				col="#CC0033";
			}
			textLabel.attr({
				"fill":col,
				"fill-opacity":1.0,
				"font-size":20,
				"font-family":"'AudiTypeBold',sans-serif"
		});
		textLabel.toFront();
	}
	//unere Zeile
	else{
			trans=chartVcenter;
			rect.transform("T0,"+trans);
			}

		}


	}


		textLabel=self.paper.text(0,30,"Ich bin eine Überschrift");
		textLabel.attr({
				"text-anchor":"start",
				"fill":"#b6b6b6",
				"fill-opacity":1.0,
				"font-size":20,
				"font-family":"'AudiTypeNormal',sans-serif"
		});
		textLabel.toFront();
	}
	//initialize Chart
	self.init();
}
//============================================
//  StackBar Chart
//============================================

ChartsModule.StackBarChart=function(domID,config){
	if(!(this instanceof arguments.callee)){
		return new arguments.callee(arguments);
	}
	var defaults={
		width:200,
		height:500,
		colors:['#a55','#123321','#123456','#330000','#4422FF'],
		barWidth:40,
		offset:20
	}
	var self=this;
	self.init=function(){
			self.config=_.extend(defaults, config);
			self.paper=Raphael(domID,self.config.width,self.config.height);
	}
	self.draw=function(){
		var rect,textLabel,col,i,j,startPosY,len,barSet,stackHeight;
		len=self.config.data.length;
		for(j=0;j<12;j++){
			startPosY=0;
			barSet=self.paper.set();
			for(i=0;i<len;i++){
				col=self.config['colors'][i];
				rect=self.paper.rect(j*(self.config.barWidth+self.config.offset),startPosY,self.config.barWidth,self.config.data[i]);
				startPosY+=self.config.data[i];
				rect.id="bar_"+j+"seg_"+i;
				rect.attr({
					'stroke-width' : 1,
					'stroke' : col,
					'fill':col,
					"fill-opacity":1.0
				});
				rect.hover(function(){log("over",this);},function(){log("out",this);});
				barSet.push(rect);
		}
		stackHeight=barSet.getBBox().height
		barSet.transform("T0,"+stackHeight);
		//Tick Label
		textLabel=self.paper.text((j*(self.config.barWidth+self.config.offset))+(self.config.barWidth*0.5),25,(j+1));
			textLabel.attr({
				"fill":"#666",
				"fill-opacity":1.0,
				"font-size":20,
				"font-family":"'League Gothic','Futura-CondensedMedium',sans-serif"
		});
	}

		textLabel=self.paper.text(100,200,"Ich bin ein textLabel");
		textLabel.attr({
				"text-anchor":"start",
				"fill":"#fff",
				"fill-opacity":1.0,
				"font-size":20,
				"font-family":"'League Gothic','Futura-CondensedMedium',sans-serif"
		});
	}
	//initialize Chart
	self.init();
}

//Modifications for RAPHAEL==============================
// Draw a rectangle on solid pixel boundaries.
Raphael.fn.crispRect = function (x, y, width, height) {
  var crispX = Math.ceil(x) + 0.5,
    crispY = Math.ceil(y) + 0.5,
    crispWidth = Math.ceil(width > 0 ? width - 1 : width),
    crispHeight = Math.ceil(height > 0 ? height - 1 : height);
  return this.rect(crispX, crispY, crispWidth, crispHeight);
}

// Draw a line squarely on pixel. 
Raphael.fn.crispLine = function (x, y, width, height) {
  return this.path("M {x} {y} l {width} {height}".supplant({
    'x': Math.ceil(x) + 0.5,
    'y': Math.ceil(y) + 0.5,
    'width': Math.ceil(width),
    'height': Math.ceil(height)
  }));
};
})(jQuery,Raphael,acpm.namespace("acpm.modules.charts"));