
function draw(data){
  
  "use strict";
  
  var minute = getMinute()-5;
  
  minute = minute - minute%minuteInterval;
   (minute);
  
  var margin = 20;
  var margin_top= 50;
  var width = $("#densityplotWrap").width()-margin;
  var height= $("#densityplotWrap").height()-margin_top;

  var svg = d3.select("#densityplotWrap")
    .append("svg")
      .attr("width",width)
      .attr("height",height)
    .append("g")
      .attr("class","densityChart")
      .attr("transform", "translate(" + (1*margin) + "," + (-15) + ")");
      
    // dimple.js chart code
    
      var cleanAxis = function (axis, oneInEvery) {
    // This should have been called after draw, otherwise do nothing
    if (axis.shapes.length > 0) {
        // Leave the first label
        var del = 0;
        // If there is an interval set
        if (oneInEvery > 1) {
            // Operate on all the axis text
            axis.shapes.selectAll("text").each(function (d) {
                // Remove all but the nth label
                if (del % oneInEvery !== 0) {
                    this.remove();
                    // Find the corresponding tick line and remove
                    axis.shapes.selectAll("line").each(function (d2) {
                        if (d === d2) {
                            this.remove();
                        }
                    });
                }
            del += 1;
            });
        }
    }
};

    var now = String(minute);
    var later = String(minute+30);
    
     (now);
     (later);
    var datum = dimple.filterData(data,"Minute",[now,later])
    var myChart = new dimple.chart(svg,datum);
    var x = myChart.addCategoryAxis("x","Mile");
    x.addOrderRule("Mile");
    var y = myChart.addMeasureAxis("y","Runners");
   // var bubble = myChart.addSeries(null,dimple.plot.bubble);
    var line = myChart.addSeries("Minute",dimple.plot.line);
    
    //line.interpolation = "cardinal";
    //var legend1 = myChart.addLegend('0.5%', '3%', 350, 20, "right");
        myChart.draw();
    cleanAxis(x,2);
    cleanAxis(y,2);

    //now
    svg.append("text")
      .attr("x",width*.60 + 30)
      .attr("y",height*.2+10)
      .attr("text-anchor","left")
      .attr("font-size",'12px')
      .text("In 30 min");
      
    //30 min
    svg.append("text")
      .attr("x",width*.60 + 30)
      .attr("y",height*.13+10)
      .attr("text-anchor","left")
      .attr("font-size",'1px')
      .text("Now.");
    
    //blue
    svg.append("rect")
      .attr("x",width*.60)
      .attr("y",height*.13)
      .attr("width",20)
      .attr("height",10)
      .attr("fill","rgb(141,180,209)");
    
    //red(in30min)
    svg.append("rect")
      .attr("x",width*.60)
      .attr("y",height*.2)
      .attr("width",20)
      .attr("height",10)
      .attr("fill","rgb(241,138,129)");
        

    
};

var minuteInterval = 2;
d3.csv("data/RunnerData.csv",draw);




// function drawDensity(data){
  
  
//   var filtered = data.filter()
  
  
//   var margin = 25;
//   var width = $("#densityplotWrap").width()-margin;
//   var height= $("#densityplotWrap").height()-margin;
  
//   var svg = d3.select("#densityplotWrap")
//     .append("svg")
//       .attr("width",width+2*margin)
//       .attr("height",height+2*margin)
//     .append("g")
//       .attr("class","densityChart");
      
//   var xScale = d3.scale.linear()
//               .domain([0,26])
//               .range([margin,width+margin]);
              
  
  
  
  
// }


 //d3.csv("data/Densities.csv",drawDensity);
