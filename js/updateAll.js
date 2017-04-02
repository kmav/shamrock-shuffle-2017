var initiate = 0;
var updateAidStationcount = -1;
var PageRefresh = 0;
var MapRefresh = 0;
var AidStationIndex = -1;
var AidStations = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var timeMultiplier = 1;
var yScaleBoth = 0;

var SetHour = 8;
var SetMinute = 30;
var SetSecond = 0;



function getMinute() {
    
  var currentTime = new Date();
  var nowTime = currentTime.getTime();

	var startedTime = new Date();
	
	var multiplier = 2;
	
	startedTime.setHours(SetHour);
	startedTime.setMinutes(SetMinute);
	startedTime.setSeconds(SetSecond);
	startedTime.setMilliseconds(0);
	
	if (currentTime > startedTime + (1000*60*60*6) ){
		SetHour = currentTime.getHours();
	}
	
	// if (currentTime < startedTime){
	// 	SetHour = currentTime.getHours();
	// }

	var startedMs = startedTime.getTime();

	//now calculate the millisecond difference from one to other
	var elapsedTime = nowTime - startedMs;
	// if (elapsedTime<0) {
	//   elapsedTime = 0 - elapsedTime;
	// }
	//1000 ms in a second, 60 seconds in a minute
	var elapsedMinutes = parseInt(elapsedTime / 60000);
	var elapsedMinutes = elapsedMinutes + elapsedMinutes%2;
    
  //("Minute: "+elapsedMinutes);
  
  return (elapsedMinutes*timeMultiplier);

}



function filterAidStations(obj){
	//return false;
	return ((obj.Type=="AS")&&(+obj.Display==1));
};

function filterMedicalTents2(obj){
	return ((obj.Type=="MT")&&obj.Location!="DUMMY"&&obj.Location!="Indiana");
};

var key = function(d){
	return +d.Location;
}

function easyFilter(obj){
	return ((obj.Type=="AS"))&&(+obj.Status<=2);
}
function colorBars(current,beds,status){
	
	//initial check for closed!
	if (+status==2){
		return "rgb(112,112,112)";
	}
	var percent = 100*(+current)/(+beds);
    if (percent >= 100) {
        percent = 99
    }
    var r, g, b;

    if (percent < 50) {
        // green to yellow
        r = 11;
        g = 181;
        b = 11;
		
    } else if (percent < 90) {
        // yellow to red
        r = 255;
        g = 220;
        b = 0;
    }
    
    else {
    	r = 255;
    	g = 0;
    	b = 0;
    }

    return "rgb(" + r + "," + g + "," + b + ")";
};


var sortOrder = false;
var sortItems = function(a,b){
	if (sortOrder){
		return +a.Location - +b.Location;
	}
	return +b.Location - +a.Location;
}



// function showAidStation(index){
// 	document.getElementById('weatherInfo').firstChild.nodeValue = index;
// }


function updateClock()
{
	var currentTime = new Date();

	//make sure we're on the right timezone
	var offset = currentTime.getTimezoneOffset();
	////(offset);
	var difference = offset ;

	currentTime = new Date(currentTime.getTime());// - difference*60000);

	//now get the actual time at Chicago
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();

	//pad the minutes and seconds with leading zeros if needed
	currentMinutes = (currentMinutes < 10 ? "0" : "")+currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "")+currentSeconds;

	//choose AM or PM
	var timeOfDay = (currentHours < 12) ? "AM" : "PM";

	//convert hours to 12 hour format
	var currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

	//convert hours of 0 to 12
	if (currentHours ==0){
		currentHours = 12;
	}

	//get the string
	var currentTimeString = currentHours + ":" + currentMinutes + " "+ timeOfDay;
	//display the string
	document.getElementById('clock').firstChild.nodeValue = currentTimeString;


	//now get the elapsed time since event started

	var nowMs = currentTime.getTime();

	var minDiff = (currentHours-SetHour)*60+(currentMinutes-SetMinute);

	// if ( minDiff > 500 || minDiff < 0 ){
	// 	SetHour = currentHours;
	// 	SetMinute = currentMinutes;
	// }
	
	// //(SetHour);
	
	var startTime = new Date();
	startTime.setHours(SetHour);
	startTime.setMinutes(SetMinute);
	startTime.setSeconds(SetSecond);
	startTime.setMilliseconds(0);
	

	var startMs = startTime.getTime();

	//now calculate the millisecond difference from one to other
	var elapsedMs = (nowMs - startMs)*timeMultiplier;
	//3600 seconds in an hour
	var elapsedHours = parseInt(elapsedMs / (3600*1000));
	elapsedHours = (elapsedHours < 10? "0":"")+elapsedHours;
	var elapsedMinutes = parseInt((elapsedMs % (3600*1000))/60000);
	elapsedMinutes = (elapsedMinutes < 10 ? "0": "")+elapsedMinutes;
	var elapsedSeconds = parseInt((elapsedMs % 60000)/1000);
	elapsedSeconds = (elapsedSeconds < 10 ? "0":"")+elapsedSeconds;

	var elapsedTimeString = elapsedHours + ":"+ elapsedMinutes+":"+elapsedSeconds;
	document.getElementById('elapsedTime').firstChild.nodeValue = elapsedTimeString;
	////(elapsedTimeString)
}

/*

function redrawAS(data){

	//(window.location.pathname);
	//("redrawing aid stations");
	//(data);
	if ((window.location.pathname=="/command.php")||(window.location.pathname=="/")){
		var p=30;
		var w = $("#medical").width() * 0.9;
		//(w);
		var h = w*0.8;
	}
	else{
		var p = 10;
		var w = $("#aid_station").width() - 2*p;
		//(w);
		var h = w*0.6;
		
	}
	
	//("h:"+h);
	//padding
	var AidStationDataset = [];
	var AidStationDataset =  data.filter(filterAidStations);
	//(AidStationDataset);
	
	if (AidStationDataset.length<3){
		AidStationDataset = data.filter(easyFilter);
	}
	
	//AidStationDataset.reverse();
	//AidStationDataset = AidStationDataset.slice(0,AidStationDataset.length)
	
	var svg = d3.selectAll(".aid_station");
	
	var xScale = d3.scale.linear()
    	.domain([0,4+d3.max(AidStationDataset,function(d){
						return +d.Beds;
					})])
    	.range([p,w-p]);
    	
   	var yScale = d3.scale.ordinal()
		.domain(d3.range(AidStationDataset.length))
		.rangeRoundBands([h-p,2*p],0.15);
					
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(4);
					
	//write y axis
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//make a function that returns axis to use later in the gridlines
	function make_xAxis(){
		return xAxis;
	}

	function make_yAxis(){
		return yAxis;
	}
	
	var ySpacing = (yScale(2)-yScale(1))/2;
	////(AidStationDataset);
	
	var bars = svg.selectAll(".bedstaken")
		.data(AidStationDataset,key);
	
	var totalbeds = svg.selectAll(".totalbeds")
		.data(AidStationDataset,key);
	
	var text = svg.selectAll(".text_bar")
		.data(AidStationDataset,key);
	
	
	bars.exit()
		.remove();
		
	totalbeds.exit()
		.remove();
	
	text.exit()
		.remove();
	
	
	totalbeds.enter()
		.append("rect")
		.attr("class","totalbeds");
		
	bars.enter()
		.append("rect")
		.attr("class","bedstaken");
	
	text.enter()
		.append("text")
		.attr("class","text_bar");
	
	totalbeds = svg.selectAll(".totalbeds")
		.sort(sortItems)
		.transition()
		.attr("x",function(d,i){
			return p;
		})
		.attr("y",function(d,i){
			////(h));
			////(yScale(i)+"yscale in AS");
			return (yScale(i));
			//return h-p-yScale(+d.CurrentPatients);
		})
		.attr("width",function(d){
			////(h-yScale())
			//return yScale(+d.CurrentPatients);
			return (xScale(+d.Beds)-p);
		})
		
		.attr("height",yScale.rangeBand())
		.attr("fill","rgba(0,0,0,0.2)")

	bars = svg.selectAll(".bedstaken")
		.sort(sortItems)
		.transition()
		.attr("x",function(d,i){
					return p;
				})
		.attr("y",function(d,i){
			////(h));
			//horizontal bars:
			return (yScale(i));
			//vertical bars
			//return h-p-yScale(+d.CurrentPatients);
		})
		.attr("width",function(d){
			////(h-yScale())
			//used before for vertical
			//return yScale(+d.CurrentPatients);
			//horizontal: 
			if (+d.Status==2){
				return (xScale(+d.Beds)-p);
			}
			else{
				return (xScale(+d.CurrentPatients)-p);
			}
		})
		.attr("height",yScale.rangeBand())
		.attr("fill",function(d){
			//(+d.CurrentPatients + " Current Patients");
			return colorBars(+d.CurrentPatients,+d.Beds,+d.Status);
		});
		
	text = svg.selectAll(".text_bar")
		.sort(sortItems)
		.transition()
		.text(function(d){
				return "A"+d.Location;
			})
		.attr("y",function(d,i){
			return yScale(i)-ySpacing;
		})
		.attr("x",function(d){
			return d3.max([xScale(+d.Beds)+1.5*p,xScale(+d.CurrentPatients)+1.5*p]);
		})
		.attr("text-anchor","right")
		.style("font-size", function(d){
			if((window.location.pathname=="/command.php"))
			return ((yScale.rangeBand()*0.8))+'px';
			
			else
			return ((yScale.rangeBand()*0.5))+'px';
		});

}

*/



function updateDensity()
{
	
	//use d3.csv to re-bind the full marathon data
	d3.csv("data/RunnerData.csv",function(data){
		
		var minute = getMinute();
  
		minute = minute - minute%minuteInterval;
		var margin = 15;
		var margins = {top: 20, right: 30, bottom: 30, left: 40};
		    
		var height= $("#sidebarGraphs").height()-margin;
		  
		var y = d3.scale.linear()
          	.range([height-margins.bottom,2*margin]);
		
		var RaceData = data.filter(filterByMinute);
		
		//(RaceData);

		  y.domain([0,d3.max(RaceData,function(d) {
    		return (parseInt((+d.Runners)/1000)+1)*1000;
    	})]);
		
		yScaleBoth = d3.max(RaceData,function(d) {return (parseInt((+d.Runners)/1000)+1)*1000;});
		
		// debugger;
		d3.selectAll(".fullBars")
			.data(RaceData)
			.attr("y",function(d) {return y(+d.Runners); })
			.attr("height",function(d) { 

				return height - margins.bottom - y(+d.Runners); })
	});
	
	
	
	
	
	
	
	// d3.csv("data/RunnerDataHalf.csv",drawHalf);
	//then select with data and update tables
	
	//do this for both graphs
	
	
	
	return;
}

function redrawMT(data){
	//(window.location.pathname);

	var p=5;
	var w = document.getElementById('medical').offsetWidth * 0.93;
	var h = document.getElementById('medical').offsetHeight*0.70;
	
	var MedicalTentsDataset = [];
	var MedicalTentsDataset =  data.filter(filterMedicalTents2);
	
	var svg = d3.selectAll(".aid_station_mt");
	
	var xScale = d3.scale.linear()
				.domain([0,1.2*d3.max(MedicalTentsDataset,function(d){
					return +d.Beds;
				})])
				.range([p,w-p]);

	
	var bedstaken = svg.selectAll(".bedstaken")
		.data(MedicalTentsDataset)
		.transition()
		.attr("width",function(d){
			//(d.Location+":"+d.CurrentPatients-p+'setting width');
			return xScale(+d.CurrentPatients)-xScale(0);
		})
		.attr("fill",function(d){
			return colorBars(+d.CurrentPatients,+d.Beds,+d.Status);
		});
		
		
	//Now update bottom AidStations graph
		
	
}

function displayInfo(data){
    //(data);
    
    //("displayInfo");
    
	var run = data[0].runnersOnCourse;
    var runnersFinished = data[0].runnersFinished;
    var hospitalTransports = data[0].hospitalTransports;
    var patientsSeen = data[0].patientsSeen;
    var Status = data[0].AlertStatus;
    var emergencyCheck = data[0].emergencyCheck;
    var AlertLat = data[0].AlertLat; 
    var AlertLong = data[0].AlertLong; 
    var message = data[0].Alert;
    
    //display runners finished
    d3.select("#RunnersOnCourse")
    .text("On Course: " + 0);
    
    d3.select("#RunnersFinished")
    .text("Finished: " + runnersFinished);
    
    d3.select("#HospitalTransports")
    .text("Hospital Transports: " + hospitalTransports);
    
    d3.select("#PatientsSeen")
    .text("Treatments: " + patientsSeen);
    
    d3.select("#alertbar")
        .attr("class",function(){
            switch (+emergencyCheck){
                case 0:
                    return 'white';
                    //("alert bar white");
                    break;
                case 1:
                    return 'red';
                    //("alert bar red");
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
        
        
        
            d3.select("#Temp")
    .text(temp + " °F");
    
    d3.select("#WindHumid")
    .text(windspeed + " mph " + winddirec + ", RH: " + humidity + "%");
        
}
	//(+Status);
    d3.select("#MarathonName")
        .attr("class",function(){
            if ((+Status)==1){
            	//("black logo");
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
        
         
    // var temp = data[0].temperature;
    // var windspeed = data[0].windSpeed;
    // var winddirec = data[0].windDirection;
    // var humidity = data[0].humidity;

    
    //display runners finished
    // //(temp);
    // //(windspeed);
    

    
//     // //(run);
//     // //(runnersFinished);
    
//     //adding popup emergency marker on map 
//                 // //(AlertLat);
//                 // //(AlertLong);
//     /*           L.mapbox.featureLayer({
//                     type: 'Feature',
//                     geometry: {
//                         type: 'Point',
//                         // coordinates here are in longitude, latitude order because
//                         // x, y is the standard for GeoJSON and many formats
//                         coordinates: [
//                             AlertLong, AlertLat
//                         ]
//                     },
//                     properties: {
//                         'marker-color': '#FF0000',
//                         'marker-symbol': 'cross',
//                         "icon": {
//                             'iconSize': [50,50],
//                             'iconAnchor': [25,25]
//                         }
                        
//                     }
//                 }).addTo(map); */
    
// if(emergencyCheck==1){    
    
// alertMarker = L.marker([AlertLat, AlertLong], {
//     icon: L.divIcon({
//         // specify a class name that we can refer to in styles, as we
//         // do above.
//         className: 'fa-icon',
//         // html here defines what goes in the div created for each marker
//         html: '<i class="fa fa-exclamation-triangle fa-5x"  style = "color:red"></i>',
//         // and the marker width and height
//         iconSize: [60, 60]
//     })
// });
// alertMarker.addTo(map);
    
// }
// }
// var alertMarker;
function updateAidStations() {
	////("updating aid station");
	d3.csv("data/AidStations.csv",redrawMT);
	//d3.csv("data/AidStations.csv",redrawAS);
	
}

function updateWeather() {
	d3.csv("data/gen_info.csv", displayWeather)
}

function updateGeneral(){
	//("updateGen");
	d3.csv("data/gen_info.csv",displayInfo);
	// d3.csv("data/gen_info.csv",displayAlert);

}

function updateMap(){
	
	//get density and generate density graph
	generateLines();
	generateWalkLines();
	plotAS(1);
	//runnerTracking();

}
function updateTrackers(){
	runnerTracking();
}

function filterByMinute(obj){
  var minute = getMinute();
  minute = minute - minute%minuteInterval;
  // //(obj);
  // //(+obj.Minute+" = "+minute);
  return (+obj.Minute==minute);
}

////////////////////////////MAIN UPDATE OF THE PAGE
function updatePage(){
	
	
	updateClock();
	updateAidStationcount++;
	PageRefresh++;
	MapRefresh++;
	
	//REFRESH PAGE
	//only once in every 10 times (10 seconds)
	//if (updateAidStationcount%1001==0){
		//window.location.reload(1);
		//updateAidStationcount=0;
		AidStationIndex++;
		if (AidStationIndex >= AidStations.length) {
			AidStationIndex=0;
		}
	//}
	
	if (updateAidStationcount==5){
		//("hi");
		updateAidStationcount=0;
		updateAidStations();
		updateWeather();
		updateGeneral();
	}
	
	RefreshTime = 20;
	
	if (PageRefresh==RefreshTime){
		window.location.reload(1);
		PageRefresh=0;
	}
	
	if (MapRefresh==30){
		updateMap();
		MapRefresh=0;
	}

}
