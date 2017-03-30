function filterAS_CheckIn(obj){
	//return false;
	return (+obj.display==1);
};

function getLocation(obj){
  return +obj.hour;
};

function filterHour(data){
  var hours = [];
  
  for (var i=0; i < data.length; i++){
    if (hours.indexOf(data[i].hour) == -1 ){
      hours.push(data[i].hour);
    }
  }
  
  return hours;
}



function drawMedCheckIn(data){
var margin = { top: 50, right: 0, bottom: 0, left:100 },
          width = document.getElementById('chart').offsetWidth - margin.left - margin.right,
          height = document.getElementById('chart').offsetHeight,
          gridSize = Math.floor(height / 16 ),
          legendElementWidth = gridSize*2,
          buckets = 2,
          colors = ['#990000', '#ffff00','#009933' ], // alternatively colorbrewer.YlGnBu[9]
          professional= ['Stress' , 'ATC', 'Attending', 'Res/Fellow', 'EMT', 'Massage', 'PA', 'PT', 'RN/NP', 'DPM', 'Records'],
          aidStation = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
          //datasets = ["../data/MedCheckInTest.csv"];
          data = data.filter(filterAS_CheckIn);
          
      var hours = filterHour(data);
      var gridSize1 = Math.floor(width / (hours.length * 1.25));

          //datasets = data.filterAS_CheckIn("../data/MedCheckInTest.csv");
          //aidStation = data.filter(getLocation)
      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");
          cards.enter().append("rect")
              .attr("x", function(d, i) { return Math.floor(i/11) * gridSize1; })
              .attr("y", function(d) { 
                if (d.day != 0){
                return d.day * gridSize; 
                }
                else{
                  return (d.day-1)*gridSize;
                }
                
              })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize1)
              .attr("height", gridSize)
              .style("fill", colors[0])
              .on("mouseover",function(d){
					var xOffset = document.getElementById("mod3").offsetWidth*2.8;
					var xPosition = xOffset + parseFloat(d3.select(this).attr("x")) ;
					var yPosition = parseFloat(d3.select(this).attr("y"))+150; //+ h/2;
					d3.select("#tooltip")
						.style("left", function(){
						  if(d3.event.pageX>1000){
						  return d3.event.pageX - gridSize*8
						  }
						  else{
						  return d3.event.pageX + "px"
						  }
						})
						.style("top", d3.event.pageY + "px")
						.select("#value")
						.text(function() {
						  if (d.professional=="Stress"){
						  return "Stress Level: " + (5-(d.value)*5);
						  }
						  else{
							return d3.format(".0%")(+d.value) +" " + d.professional + " Coverage"; //d3.format(".0%") or (".1f")
						  }
						  });
					d3.select("#tooltip")
						.select("#tooltipHeader")
						.style("font-weight", "bold")
						.text(function() {
							return "Aid Station " + d.hour;
						});
						//show the tooltip
					d3.select("#tooltip")
						.classed("hidden", false);
					})
					.on("mouseout", function() {
						d3.select("#tooltip")
							.classed("hidden", true);
					});	

					
          cards.transition().duration(1000)
              .style("fill", function(d) { 
                var colorIndex=2;
                
                if(+d.value<0.33) {colorIndex=0;}
                else if(+d.value<0.66){colorIndex=1;}
                
                return colorScale(colorIndex); });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i + 30; })
            .attr("y", height-95)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

/*
          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "< " + 66 + "%"; })
            .attr("x", function(d, i) { return legendElementWidth * i + 30; })
            .attr("y", height + gridSize - 40);
            */
            svg.append("text")
            .attr("class", "mono")
            .text(function() { return "Percentage Checked In"; })
            .attr("x", function() { return legendElementWidth * 0 + 35; })
            .attr("y", height + gridSize - 120 );
            
            
          svg.append("text")
            .attr("class", "mono")
            .text(function() { return "< " + 33 + "%"; })
            .attr("x", function() { return legendElementWidth * 0 + 30; })
            .attr("y", height + gridSize - 90);

            
          svg.append("text")
            .attr("class", "mono")
            .text(function() { return "< " + 66 + "%"; })
            .attr("x", function() { return legendElementWidth * 1 + 30; })
            .attr("y", height + gridSize - 90);
            
          svg.append("text")
            .attr("class", "mono")
            .text(function() { return "< " + 100 + "%"; })
            .attr("x", function() { return legendElementWidth * 2 + 30; })
            .attr("y", height + gridSize - 90);    
          

          legend.exit().remove();
          
          
          var dayLabels = svg.selectAll(".dayLabel")
          .data(professional)
          .enter().append("text")
            .text(function (d,i) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { 
              if (i != 0){
              return (i+1) * gridSize -25; 
              }
              else{
                return (i)*gridSize - 25;
              }
              
            })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((true) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });


        
        var timeLabels = svg.selectAll(".timeLabel")
          .data(hours)
          .enter().append("text")
            .text(function(d) {
              return (d); 
            })
            .attr("x", function(d, i) { return i * gridSize1 ; })
            .attr("y", -25)
            .style("text-anchor", "middle")
            .style("font-size" , "9")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((true) ? "timeLabel axis-worktime" : "timeLabel mono axis"); });

    
};

d3.csv('data/MedCheckInTest.csv',drawMedCheckIn);