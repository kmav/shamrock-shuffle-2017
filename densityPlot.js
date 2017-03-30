


function drawFull(data){
  
  "use strict";
  
  var minute = getMinute();
  
  minute = minute - minute%minuteInterval;
  //(minute);
 var margin = 15;
 var margins = {top: 20, right: 30, bottom: 30, left: 40};
    
  var width = $("#sidebarGraphs").width()*2/3-margin;
  var height= $("#sidebarGraphs").height()-margin;
  
  var y = d3.scale.linear()
          .range([height-margins.bottom,2*margin]);
          
          

  var chart = d3.select(".fullChart")
          .attr("width",width)
          .attr("height",height);
          

  //filter data to the one from this minute

  var RaceData =  data.filter(filterByMinute);
  // console.table(RaceData);
  
    //xscale
  var x = d3.scale.linear()
    .domain([0,27])
    .range([margins.left,width]);
    //.rangeRoundBands([margins.left,width], 0.2);
    
  var barWidth = 10;
  
  //("Width is "+barWidth);
  barWidth = 1;

  y.domain([0,d3.max(RaceData,function(d) {
    return (parseInt((+d.Runners)/1000)+1)*1000;
    
  })]);

		yScaleBoth = d3.max(RaceData,function(d) {return (parseInt((+d.Runners)/1000)+1)*1000; });
  
  
  
  //var barWidth = width/RaceData.length;
  
  var bar = chart.selectAll(".fullBars")
          .data(RaceData)
          .enter()
          .append("rect")
          .attr("class","fullBars")
          .attr("x",function(d,i) {
            return +x(+d.Mile)-barWidth/2;
          })
          .attr("y",function(d) { return y(+d.Runners); })
          .attr("height", function(d) { 
            return String(d.Runners); })
          .attr("width", barWidth)
          .attr("fill","#460061");
          
        
          
  // bar.append("rect")
  //     .attr("y",function(d) { return y(+d.Runners); })
  //     .attr("height", function(d) { return height-margins.bottom-y(+d.Runners); })
  //     .attr("width", x.rangeBand());
      
  // bar.append("text")
  //   .attr("x",barWidth/2)
  //   .attr("y",function(d) { return y(+d.Runners) + 3; })
  //   .attr("dy",".75em")
  //   .text(function(d) { return +d.Runners; });
  
    chart.append("text")
      .attr("x",(width/2)+margin)
      .attr("y",margin)
      .attr("text-anchor","middle")
      .text("Runners per Mile: Full Marathon Course");
      
      
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height-margins.bottom+3) + ")")
    .call(xAxis);

    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(7)
    .tickFormat(function(d){
      if ((d / 1000) >= 1) {
        d = d / 1000 + "K";
      }
      return d;
    });
    
  chart.append("g")
    .attr("class","y axis")
    .attr("transform","translate("+margins.left+",0)")
    .call(yAxis);
    // .attr("transform","translate(")
  //add ranking    
    
};

function drawHalf(data){
  
  "use strict";
  
  var minute = getMinute();
  
  minute = minute - minute%minuteInterval;
  //(minute);
 var margin = 15;
 var margins = {top: 20, right: 0, bottom: 30, left: 40};
    
  var width = $("#densityPlotH").width()-margin;
  var height= $("#sidebarGraphs").height()-margin;
  
  var y = d3.scale.linear()
          .range([height-margins.bottom,2*margin]);
          
          

  var chart = d3.select(".halfChart")
          .attr("width",width)
          .attr("height",height);
          

  //filter data to the one from this minute

  var RaceData =  data.filter(filterByMinute);
  console.table(RaceData);
  
    //xscale
  var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.Mile; }))
    .rangeRoundBands([margins.left,width], 0.1);
 
  //("return value for 1:"+x(1));
  //("return value for 9" +x("9"));

  //(yScaleBoth);
  //("\n\n\n\n\n\n\n\n\n")
  y.domain([0,yScaleBoth]);

  var barWidth = width/RaceData.length;
  
  var bar = chart.selectAll("rect")
          .data(RaceData)
          .enter()
          .append("rect")
          .attr("class","halfBars")
          .attr("x",function(d,i) {
            
            return +x(d.Mile)+x.rangeBand()*5/12;
          })
          .attr("y",function(d) { return y(+d.Runners); })
          .attr("height", function(d) { return height-margins.bottom-y(+d.Runners); })
          .attr("width", x.rangeBand()*1/5)
          .attr("fill","#A56FBF");
      
  // bar.append("text")
  //   .attr("x",barWidth/2)
  //   .attr("y",function(d) { return y(+d.Runners) + 3; })
  //   .attr("dy",".75em")
  //   .text(function(d) { return +d.Runners; });
  
    chart.append("text")
      .attr("x",(width/2)+margin)
      .attr("y",margin)
      .attr("text-anchor","middle")
      .text("Half Marathon Bypass");
      
      
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height-margins.bottom+3) + ")")
    .call(xAxis);

    
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(7)
    .tickFormat(function(d){
      if ((d / 1000) >= 1) {
        d = d / 1000 + "K";
      }
      return d;
    });
    
  // chart.append("g")
  //   .attr("class","y axis")
  //   .attr("transform","translate("+margins.left+",0)")
  //   .call(yAxis);
    // .attr("transform","translate(")
  //add ranking    
    
};




var minuteInterval = 2;
d3.csv("data/RunnerData.csv",drawFull);


// d3.csv("data/RunnerDataStack.csv",drawFullStack);




