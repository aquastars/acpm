
;(function(jQuery,Raphael,ChartsModule){
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