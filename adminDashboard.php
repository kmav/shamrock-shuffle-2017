<?php 
session_start(); // Starting Session
include('session.php');
if ($mobile==true)
{
    //header("location: getMobile.php");
}
if ($level_session>1){
    header("location: index.php");
}
if(!isset($_SESSION['login_user'])){
    header("location: index.php");
}
//check if it's been active for 1 hour, otherwise close it
if ($_SESSION['start'] + (7*60*60) < time()) {
     header("location: php/logout.php");
  }
?>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<title>Bank of America Shamrock Shuffle</title>
<?php include('php/getTreatments.php'); ?>

<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
    <script src="js/dimple.js"></script>
    
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<link rel="stylesheet" href="css/leaflet.awesome-markers.css">

<script src="js/leaflet.awesome-markers.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.0.2/jquery.simpleWeather.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<script src="js/googleAnalytics.js"></script>


<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato">

<link rel='stylesheet' href='css/newStyle.css'>


<script src='js/updateAll.js' type='text/javascript'></script>

</head>

<style>
  
  #densityplotWrap{
    height: 300px;
  }
</style>
<body>

<h1> Admin Dashboard </h1>

<div id="slider">
</div>

    <div class = "density module" id = "densityplotWrap" >
    </div>
    


<p>
  <label for="nHeight" 
         style="display: inline-block; width: 240px; text-align: right">
         time = <span id="nHeight-value"></span> minutes
  </label>
  <input type="range" min="0" max="500" id="nHeight">
</p>

<div class="status">
  <h3> Simulation Status: </h3>
  <ul>
    <h2 id="target"> On target! </li>
    </ul>
</div>

</body>

<script>

var width = 600;
var height = 300;
 
var holder = d3.select("body")
      .append("svg")
      .attr("width", width)    
      .attr("height", height); 


// read a change in the height input
d3.select("#nHeight").on("input", function() {
    d3.selectAll("svg").remove();
  make(+this.value);
});


// update the values
make(getMinute());

// Update the height attributes
function updateHeight(nHeight) {

  // adjust the text on the range slider
  d3.select("#nHeight-value").text(nHeight);
  d3.select("#nHeight").property("value", nHeight);

  // update the rectangle height
  holder.selectAll("rect") 
    .attr("y", 150-(nHeight/2)) 
    .attr("height", nHeight); 
}

  
 function make(time){
     
 d3.select("#nHeight-value").text(time);
  d3.select("#nHeight").property("value", time);
  
  
function draw(data){
  
  "use strict";
  
  var minute = time;
  
  minute = minute - minute%minuteInterval;
   (minute);
  
  var margin = 15;
  var width = $("#densityplotWrap").width()-margin;
  var height= $("#densityplotWrap").height()-margin;

  var svg = d3.select("#densityplotWrap")
    .append("svg")
      .attr("width",width+margin)
      .attr("height",height+1*margin)
    .append("g")
      .attr("class","densityChart");
      
    // dimple.js chart code
  
    
    var now = String(minute);
    var later = String(minute+30);
    var datum = dimple.filterData(data,"Minute",[now]);
    var before = [];
    var regular = [];
    var total = [];
    var counts = [];
    var count = 0;
    var belowCount = 0;
    var aboveCount = 0;
    
    for (var val of datum){
      before.push(
        {"Mile": val.Mile, 
        "Minute": val.Minute, 
        "Runners": String(parseInt(val.Runners)*2 + 200),
        "Bound": "Upper Bound"
      });
    };
    
    for (var val of datum){
      regular.push(
        {"Mile": val.Mile, 
        "Minute": val.Minute, 
        "Runners": val.Runners,
        "Bound": "Lower Bound"
      });
    };
    
    for (var val of datum){
      counts.push(
        {"Mile": val.Mile, 
        "Minute": val.Minute, 
        "Runners": String(parseInt(val.Runners) + Math.random() * (2000 ) ),
        "Bound": "5K Counts"
      });
    };
    
    for (var val of before){
      total.push(val);
      aboveCount += parseInt(val.Runners);
    }
    
    for (var val of regular){
      total.push(val);
      belowCount += parseInt(val.Runners);
    }
  
    for (var val of counts){
      total.push(val);
      count += parseInt(val.Runners);
    }
    
    if (count > aboveCount + 200){
      $("#target").html("5K counts above simulation bounds: Check simulation!");
    }
    else if (count < belowCount - 200){
      $("#target").html("5K counts below simulation bounds: Check simulation!");
    }
    else {
      $("#target").html("Simulation on target!");
    }
    
    //(count, aboveCount, belowCount);
 
 /*
    var now = String(minute);
    var later = String(minute+30);
    var datum = dimple.filterData(data,"Minute",[now,later])
    
    //(datum);
    */
    
    //(total);
    //(before);
    //(datum);
  
        
     var myChart = new dimple.chart(svg,total);
    var x = myChart.addCategoryAxis("x","Mile");
    x.addOrderRule("Mile");
    var y = myChart.addMeasureAxis("y","Runners");
    var line = myChart.addSeries("Bound",dimple.plot.line);
    var myLegend = myChart.addLegend(530, 100, 60, 300, "Right");

        myChart.draw();
        
        
    svg.append("text")
      .attr("x",(width/2)+margin)
      .attr("y",margin)
      .attr("text-anchor","middle")
      .text("Runners per mile");
    
};

var minuteInterval = 2;
d3.csv("data/RunnerData.csv",draw);
    
    
 }
</script>
</html>