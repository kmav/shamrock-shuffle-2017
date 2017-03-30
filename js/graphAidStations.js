function filterAidStations(obj){
	//return false;
	return ((obj.Type=="AS")&&(+obj.Display==1));
};

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
}



function drawAidStations(data){

	 //(data);
	//we only need the ones with attribute Aid Station
	var AidStations = []

	//filter aid station if it's an Aid Station
	var AidStationDataset =  data.filter(filterAidStations);
	
	if (AidStationDataset.length<3){
		//use another filter to select the first three or something
		AidStationDataset = data.filter(easyFilter);
	}
	
	// //(AidStationDataset);
	AidStationDataset.reverse();
	//debugger;
	//now we will plot this data with following:
		//show rectangles with:
			//current, capacity overlayed (on top of each other)
			//and use Comments or other stuff to figure out how full it is

	//find the id called medical and gets its associated width
	var w = $("#medical").width() * 0.9; //document.getElementById('medical').offsetWidth *0.9 ;
	var h = w*0.8;
	//padding
	var p = 30;


	//get the x scale 
	/*var xScale = d3.scale.ordinal()
					.domain(d3.range(AidStationDataset.length))
					.rangeRoundBands([p,w-p],0.15);
	*/
	//NEW
	var xScale = d3.scale.linear()
    .domain([0,4+d3.max(AidStationDataset,function(d){
						return +d.Beds;
					})])
    .range([p,w-p]);
	
	
	//set the y scale  (for actual numbers)
	//var yScale = d3.scale.linear()
	//				.domain([0,1+d3.max(AidStationDataset,function(d){
	//					return +d.Beds;
	//				})])
	//				.range([h-p,2*p]);

	
	var yScale = d3.scale.ordinal()
					.domain(d3.range(AidStationDataset.length))
					.rangeRoundBands([h-p,2*p],0.15);
	
	//write axis
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


	//now create the svg to hold things in 
	var svg = d3.select(".medical")
				.append("svg")
				.attr("width",w+p)
				.attr("height",h+3*p)
				.attr("class","aid_station")
				.attr("id","aid_station");



		//append the Aid Station number at each bar
		var Numbers = svg.selectAll("text")
			.data(AidStationDataset,function(d){
					return d.Location;
				})
			.order()
			.enter()
			.append("text")
			.attr("class","text_bar")
			.text(function(d){
				return "A"+d.Location+" : "+d.CurrentPatients+"p";
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


			//add x axis 
			svg.append("g")
				.attr("class","x axis")
				.attr("transform","translate(0,"+(h-p)+")") //moves it to the right coordinate
			.call(xAxis);
	
		//add x grid lines:
		/*svg.append("g")
			.attr("class","grid")
			.attr("transform","translate("+p+",0)")
			.call(make_xAxis()
				.tickSize(-w+2*p,0,0)
				.tickFormat("")
			);
		*/
		
		//vertical version of plotting bars
		/*var barsTotal = svg.selectAll(".totalbeds")
									.data(AidStationDataset,function(d){
					return d.Location;
				})
				.order()
					.enter()
					.append("rect")
					.attr("class", "totalbeds")
					.attr("x",function(d,i){
						return p;
					})
					.attr("y",function(d){
						// (h));
						return (yScale(+d.Beds));
						//return h-p-yScale(+d.CurrentPatients);
					})
					.attr("width",function(d){
						// (h-yScale())
						//return yScale(+d.CurrentPatients);
						return (xScale(+d.Beds));
						
					})
					.attr("height",yScale.rangeBand());
		  */
		  
		//horizontal version of bar plotting	
		var AS_barsTotal = svg.selectAll(".totalbeds")
				.data(AidStationDataset,function(d){
					return d.Location;
				})
				.order()
				.enter()
				.append("rect")
				.attr("class", "totalbeds")
				.attr("x",function(d,i){
					return p;
				})
				.attr("y",function(d,i){
					// (h));
					return (yScale(i));
					//return h-p-yScale(+d.CurrentPatients);
				})
				.attr("width",function(d){
					// (h-yScale())
					//return yScale(+d.CurrentPatients);
					return (xScale(+d.Beds)-p);
				})
				.attr("height",yScale.rangeBand())
				.attr("fill","rgba(0,0,0,0.2)")
				.attr("opacity",.7);
				
		
		//add beds taken
		var AS_bars = svg.selectAll(".bedstaken")
				.data(AidStationDataset,function(d){
					return d.Location;
				})
				.order()
				.enter()
				.append("rect")
				.attr("class", "bedstaken")
				.attr("x",function(d,i){
					return p;
				})
				.attr("y",function(d,i){
					// (h));
					//horizontal bars:
					return (yScale(i));
					//vertical bars
					//return h-p-yScale(+d.CurrentPatients);
				})
				.attr("width",function(d){
					// (h-yScale())
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
					return colorBars(+d.CurrentPatients,+d.Beds,+d.Status);
				});

			
		//add title
		ASTitle = svg.append("text")
			.attr("id","AidStationTitle")
			.attr("x",w/2)
			.attr("y",1.5*p)
			.text("Aid Stations (Bed Occupancy)")
			.attr("text-anchor", "middle")

		//add x grid lines:
		/*
		ASGridLines = svg.append("g")
			.attr("class","grid")
			.attr("transform","translate(0,"+(h-p/2)+")")
			.call(make_xAxis()
				.tickSize(-h,0,0)
				.tickFormat("")
			);
		*/
	// ASd3 = {
	// 	totalbeds: AS_barsTotal,
	// 	bedstaken: AS_bars,
	// 	title: ASTitle,
	// 	gridlines : ASGridLines,
	// 	numbers : Numbers,
	// };
	

};

	
ASd3 = {}
//call the function to draw the aid station chart
d3.csv('data/AidStations.csv',drawAidStations);





