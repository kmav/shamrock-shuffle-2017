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
var margin = { top: 0, right: 0, bottom: 0, left:0 },
          width = document.getElementById('stress-chart').offsetWidth - margin.left - margin.right,
          height = document.getElementById('stress-chart').offsetHeight,
          gridSize = Math.floor(height/5),
          legendElementWidth = gridSize*2,
          buckets = 2,
          colors = ['gray','green','yellow','#ff6600', '#cc3300', '#990000'], // alternatively colorbrewer.YlGnBu[9]
          professional= ['Stress'],
          aidStation = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
          //datasets = ["../data/MedCheckInTest.csv"];
          
      var hours = filterHour(data);
      var gridSize1 = Math.floor(width / 2);

          //datasets = data.filterAS_CheckIn("../data/MedCheckInTest.csv");
          //aidStation = data.filter(getLocation)
      var profesh = ['Stress'];

      var svg = d3.select("#stress-chart").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height-50)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
          
          var cards = svg.selectAll(".hour")
              .data(data);

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d, i) { 
                return 05;
              })
              .attr("y", function(d,i) { 
                if (i==0){
                  return height*0.12;
                }
                else if (i==1){
                  return height*0.38;
                }
                else{
                  return 100000;
                }
              })
              .attr("rx", 10)
              .attr("ry", 10)
              .attr("width", gridSize1)
              .attr("height", gridSize)
              .style("fill", function(d) {return colors[parseInt(d.stress)]; });

          cards.transition().duration(1000)
              .style("fill", function(d) { return colors[parseInt(d.stress)]; });

          cards.select("title").text(function(d) { return d.stress; });
          
          cards.exit().remove();


          
        var zones = [''];

        var timeLabels = svg.selectAll(".timeLabel")
          .data(data)
          .enter().append("text")
            .text(function(d) {
              return (d.stress); 
            })
              .attr("x", function(d, i) {
                  return width*0.3;
                })
              .attr("y", function(d,i) { 
                  if (i==0){
                    return height*0.25;
                  }
                  else if (i==1){
                    return height*0.50;
                  }
                  else{
                    return 10000000;
                  }
              })
            .style("text-anchor", "middle")
            .style("font-size" , "15")
            .attr("transform", "translate(" + 0 + ", 0)")
            .style("fill", function(d,i){
              if (d.stress==2){
                return 'black';
              }
              else{
                return 'white';
              }
            })

    

        
    
};

d3.csv('data/allStress.csv',drawMedCheckIn);
