var alertMarker=0;

// 2017 runner drop update
function displayDrops(data){
    var currentMin = getMinute();
    currentDrops = data[parseInt(currentMin/2)].drops;
        
    d3.select("#RunnersDropped")
    .text(Math.round(currentDrops));
    //(currentDrops+"current");
    
    return Math.round(currentDrops);
}

function getRunners(data){
    var counter = -2;
    var started_sim = 0;
    var drops = 0;
    var finished_sim =0;
    var onCourse_sim = 0;
    var elaspedMinutes = getMinute();
    //(elaspedMinutes);
    
    if (elaspedMinutes > 0 && elaspedMinutes <= 500){
        
        while(counter <= 250){
            //get started and finish numbers (simulation adjusted for race day numbers)
           if ((2 * counter) == elaspedMinutes) {
               started_sim = data[counter].started;
               finished_sim = data[counter].finished;
           }
            
           
           counter++; 
           ////(counter);
        }
        
        // 2017: using new function for drops above
        //var dropsFactor = (0.00001 * elaspedMinutes);
        ////(Math.round(dropsFactor + 0.0075));
        
        //dropsFactor = Math.round(dropsFactor);
        
        //(drops)
        
        /* 
           if (elaspedMinutes > 400) {
               drops = data[elaspedMinutes/2].started * (0.020 + dropsFactor);
           }
           else if (elaspedMinutes > 350) {
               drops = data[elaspedMinutes/2].started * (0.015 + dropsFactor); //approx 25k mark
           }
           else if (elaspedMinutes > 300){
               drops = data[elaspedMinutes/2].started * (0.0075 + dropsFactor); //approx 20k mark
           }
           else if (elaspedMinutes > 250){
               drops = data[elaspedMinutes/2].started * (0.003 + dropsFactor); //approx 15k mark
           }
           else if (elaspedMinutes > 50){
               ////("Counter:"+counter)
               drops = data[elaspedMinutes/2].started * (0.0005 + dropsFactor);
           }
           */
        
    }
    /*else{
        started = data[250].started;
        finished = data[250].finished;
    }*/

	console.log(finished_sim);

	var started = started_sim;
	var finishers = finished_sim;
	//drops = 924;
    
    // 2017: need to update with new drops function
    //drops = Math.round(drops);
    drops = d3.select("#RunnersDropped").text();
    
    onCourse_sim = started - drops - finishers;
    
    d3.select("#RunnersStarted")
    .text(started_sim);
    
    //d3.select("#RunnersDropped").text(drops);
    
    d3.select("#RunnersFinished")
    .text(finished_sim);
    
    d3.select("#RunnersOnCourse")
    .text(onCourse_sim);
}

function displayInfo(data){
     (data);
    
	var run = data[0].runnersOnCourse;
    var hospitalTransports = data[0].hospitalTransports;
    var patientsSeen = data[0].patientsSeen;
    var Status = data[0].AlertStatus;
    var emergencyCheck = data[0].emergencyCheck;
    var AlertLat = data[0].AlertLat; 
    var AlertLong = data[0].AlertLong; 
    var message = data[0].Alert;
    
    var shelterDisplay = data[0].shelterDisplay;
    var shelterGP = data[0].shelterGP;
    
    //display runners finished
    
    /*d3.select("#RunnersOnCourse")
    .text("On Course: " + run);*/
    //(hospitalTransports)
    d3.select("#HospitalTransports")
    .text("Hospital Transports: " + hospitalTransports);
    
    d3.select("#PatientsSeen")
    .text("Total Treatments: " + totalTreatments);
    
    d3.select("#InMedical")
    .text("In-Treatment: " + inMedical);
    
    d3.select("#alertbar")
        .attr("class",function(){
            switch (+emergencyCheck){
                case 0:
                     ("alert bar white");
                    return 'white';
                    break;
                case 1:
                     ("alert bar red");
                    return 'red';
                    break;
            }
        });
        
        
        d3.select("#header")
        .attr("class",function(){
            //(Status);
            //(Status);
            switch (+Status){
                case 0:
                    return 'green';
                    break;
                case 1:
                    //("yellow alert")
                    return 'yellow';
                    break;
                case 2:
                    return 'red';
                    break;
                case 3:
                    return 'black';
                    break;
            }
        });
        
        d3.select("#MarathonName")
        .attr("class",function(){
            if ((+Status)==1){
                return 'black';
            }
            else{
                return 'white';
            }
        });
    
    d3.select("#NUlogo")
        .attr("class",function(){
            if ((+Status)==1){
                return 'purple';
            }
            else{
                return 'white';
            }
        });
        
    d3.select("#alertText")
        .text(message);
    
         
    var temp = data[0].temperature;
    var windspeed = data[0].windSpeed;
    var winddirec = data[0].windDirection;
    var humidity = data[0].humidity;

    
    //display runners finished
    //  (temp);
    //  (windspeed);
    
    d3.select("#Temp")
    .text(temp + " °F");
    
    d3.select("#WindHumid")
    .text(windspeed + " mph " + winddirec + ", RH: " + humidity + "%");
    
    //  (run);
    //  (runnersFinished);
    
    //adding popup emergency marker on map 
                //  (AlertLat);
                //  (AlertLong);
    /*           L.mapbox.featureLayer({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        coordinates: [
                            AlertLong, AlertLat
                        ]
                    },
                    properties: {
                        'marker-color': '#FF0000',
                        'marker-symbol': 'cross',
                        "icon": {
                            'iconSize': [50,50],
                            'iconAnchor': [25,25]
                        }
                        
                    }
                }).addTo(map); */
if (alertMarker!=0){
map.removeLayer(alertMarker);
}
if(emergencyCheck==1){    
    
alertMarker = L.marker([AlertLat, AlertLong], {
    icon: L.divIcon({
        // specify a class name that we can refer to in styles, as we
        // do above.
        className: 'fa-icon',
        // html here defines what goes in the div created for each marker
        html: '<i class="fa fa-exclamation-triangle fa-5x"  style = "color:red"></i>',
        // and the marker width and height
        iconSize: [60, 60]
    })
});
alertMarker.addTo(map);
    
}

if (shelterDisplay==1){
    //("now I'll put the dots on the map");


//// shelters
    // Setup our svg layer that we can manipulate with d3
    var svg = d3.select(map.getPanes().overlayPane)
      .append("svg");
    var g = svg.append("g").attr("class", "leaflet-zoom-hide");
    
    function project(ll) {
        ////('projecting:');
      // our data came from csv, make it Leaflet friendly
      var a = [+ll.lat, +ll.lon]; 
      // convert it to pixel coordinates
      var point = map.latLngToLayerPoint(L.latLng(ll))
      return point;
    }
    
    d3.csv("data/shelters.csv", function(err, data) {
      var dots = g.selectAll("circle.dot")
        .data(data)
      //("data on shelters:")
      console.table(data);
      dots.enter().append("circle").classed("dot", true)
      .attr("r", 1)
      .style({
        fill: "#FFFFFF",
        "fill-opacity": 0.9,
        stroke: "#004d60",
        "stroke-width": 1
      })
      .transition().duration(1000)
      .attr("r", 6)
      
      
      function render() {
        // We need to reposition our SVG and our containing group when the map
        // repositions via zoom or pan
        // https://github.com/zetter/voronoi-maps/blob/master/lib/voronoi_map.js
        var bounds = map.getBounds();
        var topLeft = map.latLngToLayerPoint(bounds.getNorthWest())
        var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast())
        svg.style("width", map.getSize().x + "px")
          .style("height", map.getSize().y + "px")
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");
        g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")")
        g.attr("z-index",10);

        // We reproject our data with the updated projection from leaflet
        g.selectAll("circle.dot")
        .attr({
          cx: function(d) { return project(d).x},
          cy: function(d) { return project(d).y},
        })
        // .call(function(d){
        //     d3.select(this).moveToFront();
        // })

      };

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render();
      })
      map.on("move", function() {
        render();
      })

      // render our initial visualization
      render();
    });
}

if (shelterGP==1){
    //("now I'll put the dots on the map");


//// shelters
    // Setup our svg layer that we can manipulate with d3
    var svg = d3.select(map.getPanes().overlayPane)
      .append("svg");
    var g = svg.append("g").attr("class", "leaflet-zoom-hide");
    
    function project(ll) {
        ////('projecting:');
      // our data came from csv, make it Leaflet friendly
      var a = [+ll.lat, +ll.lon]; 
      // convert it to pixel coordinates
      var point = map.latLngToLayerPoint(L.latLng(ll))
      return point;
    }
    
    d3.csv("data/shelters_gp.csv", function(err, data) {
      var dots = g.selectAll("circle.dot")
        .data(data)
      //("data on shelters:")
      console.table(data);
      dots.enter().append("circle").classed("dot", true)
      .attr("r", 1)
      .style({
        fill: "#FFFFFF",
        "fill-opacity": 0.9,
        stroke: "#004d60",
        "stroke-width": 1
      })
      .transition().duration(1000)
      .attr("r", 6)
      
      
      function render() {
        // We need to reposition our SVG and our containing group when the map
        // repositions via zoom or pan
        // https://github.com/zetter/voronoi-maps/blob/master/lib/voronoi_map.js
        var bounds = map.getBounds();
        var topLeft = map.latLngToLayerPoint(bounds.getNorthWest())
        var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast())
        svg.style("width", map.getSize().x + "px")
          .style("height", map.getSize().y + "px")
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");
        g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")")
        g.attr("z-index",10);

        // We reproject our data with the updated projection from leaflet
        g.selectAll("circle.dot")
        .attr({
          cx: function(d) { return project(d).x},
          cy: function(d) { return project(d).y},
        })
        // .call(function(d){
        //     d3.select(this).moveToFront();
        // })

      };

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render();
      })
      map.on("move", function() {
        render();
      })

      // render our initial visualization
      render();
    });
}

}

d3.csv("SIMULATION/Densities.csv",getRunners);
d3.csv("data/gen_info.csv",displayInfo);

// 2017 runner drop update
d3.csv("SIMULATION/Densities.csv",displayDrops);

//may make new general info file with runners on course, runners finished, hospital transports, and patients seen
