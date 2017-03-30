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
		 ("BLACK!!!");
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
	
	 //(AidStationDataset);
	//debugger;
	//now we will plot this data with following:
		//show rectangles with:
			//current, capacity overlayed (on top of each other)
			//and use Comments or other stuff to figure out how full it is

	AidStationDataset.reverse();

	var w = document.getElementById('medical').offsetWidth *0.4 ;
	var h = w*0.6;
	//padding
	var p = 10;


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
	 //(yScale.domain);
	
	//set the y scale for %
	/*
	var yScale = d3.scale.linear()
					.domain([0,1])
					.range([h-p,p]);
	*/
	//build x and y axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(4);
					

	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left");

	//make a function that returns it to use later in the gridlines
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
				.attr("width",w+2*p)
				.attr("height",h+3*p)
				.attr("class","aid_station")
				.attr("id","aid_station");

	svg.selectAll("text")
	.data(AidStationDataset)
	.enter()
	.append("text")
	.attr("class","text_bar")
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
			return ((yScale.rangeBand()*0.5))+'px';
		});
	 (ySpacing);

	//add y axis
	/*svg.append("g")
		.attr("class","y axis")
		.attr("transform","translate("+p+",0)") //moves it to the right coordinate
	.call(yAxis);
	*/
	
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
		
	/*var barsTotal = svg.selectAll(".totalbeds")
				.data(AidStationDataset)
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
		
	//and put the bars in 
			var barsTotal = svg.selectAll(".totalbeds")
				.data(AidStationDataset)
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
					return (xScale(+d.Beds)-xScale(0));
				})
				.attr("height",yScale.rangeBand());
				
				
	var bars = svg.selectAll(".bedstaken")
				.data(AidStationDataset)
				.enter()
				.append("rect")
				.attr("class", "bedstaken")
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
				.on("mouseover",function(d){
					var xOffset = document.getElementById("medical").offsetWidth;
					var xPosition = xOffset + parseFloat(d3.select(this).attr("x"));
					var yPosition = parseFloat(d3.select(this).attr("y"))+40; //+ h/2;
					d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")
						.select("#value")
						.text(function() {
							return "Current: " + d.CurrentPatients + "/" + d.Beds + "	Total: " + d.CumulativePatients + " ";
						});
					d3.select("#tooltip")
						.select("#tooltipHeader")
						.style("font-weight", "bold")
						.text(function() {
							return "Aid Station " + d.Location;
						})
						//show the tooltip
					d3.select("#tooltip")
						.classed("hidden", false);
					var Popup = 1;
					d3.select(this)
						.transition()
						.duration(100)
						.attr("x", function(d) {
							return (xScale(0));
						})
						.attr("width", function(d) {
							return (xScale(+d.CurrentPatients) + Popup);
						});
					})
					.on("mouseout", function() {
						d3.select("#tooltip")
							.classed("hidden", true);
						//make them go down again
						var Popup = 1;
						d3.select(this)
							.transition()
							.duration(100)
							.attr("x", function(d) {
								return (xScale(0));
							})
							.attr("width", function(d) {
								return (xScale(+d.CurrentPatients) - xScale(0) - Popup);
							});
					});
					
		svg.selectAll(".totalbeds")
		.attr("fill","rgba(0,0,0,0.4)");
		
		

		
	
	//figure out what the spacing is between each item
	//add the text that says what aid station number
	//  ("putting new data");

	
	
	//make all the same color (to change later)
	
		
	svg.selectAll(".bedstaken")
		.attr("fill",function(d){
			 (d.Status);
			
			//figure out colors based on total beds and current beds
			return colorBars(+d.CurrentPatients,+d.Beds,+d.Status);
		});
	svg.selectAll(".totalbeds")
	.attr("fill","rgba(0,0,0,0.2)")
	.attr("opacity", 0.7);
	
		//plot the aid station number on y axis
		

	
	svg.append("text")
		.attr("id","AidStationTitle")
		.attr("x",w/2)
		.attr("y",1.5*p)
		.text("Aid Stations (Occupancy)")
		.attr("text-anchor", "middle")
	

	


	//add x grid lines:
	
	svg.append("g")
		.attr("class","grid")
		.attr("transform","translate(0,"+(h-p/2)+")")
		.call(make_xAxis()
			.tickSize(-h,0,0)
			.tickFormat("")
		);
	
	
	//d3.select(".sidebar").append("div").attr("class", "SideBarSpace")


};


//add title

	

//call the function to draw the aid station chart
d3.csv('data/AidStations.csv',drawAidStations);





