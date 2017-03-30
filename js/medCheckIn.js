function filterMedicalTents(obj){
	return ((obj.Type=="MT")&&obj.Location!="Ambulance");
};

function colorBars(current,beds){
	
	var percent = 100*(+current)/(+beds);
    if (percent >= 100) {
        percent = 99
    }
    var r, g, b;

    if (percent < 50) {
        // yellow to red
        r = 255;
        g = 0;
        b = 0;

    } else if (percent < 75) {
        // green to yellow
        r = 255;
        g = 220;
        b = 0;
    }
    
    else { //green
    	r = 11;
    	g = 181;
    	b = 1;
    }

    return "rgb(" + r + "," + g + "," + b + ")";
}


function drawMedCheckIn(data){

	 //(data);
	//we only need the ones with attribute Aid Station
	var MedicalTents = []

	//filter aid station if it's an Aid Station
	var MedicalTentsDataset = data.filter(filterMedicalTents);
	
	 //(MedicalTentsDataset);
	//debugger;
	//now we will plot this data with following:
		//show rectangles with:
			//current, capacity overlayed (on top of each other)
			//and use Comments or other stuff to figure out how full it is

	var w = document.getElementById('medical').offsetWidth * 0.9;
	var h = w*0.8;
	//padding
	var p = 30;

	//("hi");
	//(w);

	//get the x scale 
	var yScale = d3.scale.ordinal()
					.domain(d3.range(MedicalTentsDataset.length))
					.rangeRoundBands([h-p,2*p],0.15);

	//set the y scale  (for actual numbers)
	var xScale = d3.scale.linear()
					.domain([0,1.2*d3.max(MedicalTentsDataset,function(d){
						return +d.Beds;
					})])
					.range([p,w-p]);

	//set the y scale for %
	

	//build x and y axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(10);

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
				.attr("width",w+p)
				.attr("height",h+3*p)
				.attr("class","aid_station_mt")
				.attr("id","medical_tent");

		//plot the aid station number on x axis
	//(w+p);
	
	svg.selectAll("text")
		.data(MedicalTentsDataset,function(d){
					return d.Location;
				})
		.order()
		.enter()
		.append("text")
		.text(function(d){
			return d.Location;
		})
		.attr("y",function(d,i){
			return yScale(i)-ySpacing;
		})
		.attr("x",function(d){
			return d3.max([xScale(+d.Beds)+p,xScale(+d.CurrentPatients)+p]);;
		})
		.attr("class","MTText")
		.attr("text-anchor","right")
		.style("font-size", "3vw");
		
		
	//add y axis
	svg.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+(h-p)+")") //moves it to the right coordinate
	.call(xAxis);
	
	//add y grid lines:
	/*svg.append("g")
		.attr("class","grid")
		.attr("transform","translate("+p+",0)")
		.call(make_yAxis()
			.tickSize(-w+2*p,0,0)
			.tickFormat("")
		);*/
	
		
			var barsTotal = svg.selectAll(".totalbeds")
				.data(MedicalTentsDataset,function(d){
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
				.attr("height",yScale.rangeBand());
				
				
	var bars = svg.selectAll(".bedstaken")
				.data(MedicalTentsDataset,function(d){
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
					return (yScale(i));
					//return h-p-yScale(+d.CurrentPatients);
				})
				.attr("width",function(d){
					// (h-yScale())
					//return yScale(+d.CurrentPatients);
					return (xScale(+d.CurrentPatients)-p);
				})
				.attr("height",yScale.rangeBand())
				.on("mouseover",function(d){
					var xOffset = document.getElementById("map").offsetWidth;
					var xPosition = xOffset+parseFloat(d3.select(this).attr("x"));
					var yPosition = parseFloat(d3.select(this).attr("y")) ;//+ h/2;
					d3.select("#tooltip")
					.style("left",xPosition+"px")
					.style("top",yPosition+"px")
					.select("#value")
					.text(function(){
					return "Now "+d.CurrentPatients+" : "+parseFloat(100*(+d.CurrentPatients / (+d.Beds))).toFixed(0)+"% Total "+d.CumulativePatients+" ";
					}
					);
					d3.select("#tooltip")
					.select("#tooltipHeader")
					.style("font-weight","bold")
					.text(function(){
					return "Medical Tent "+d.Location;
					})
					//show the tooltip
					d3.select("#tooltip")
					.classed("hidden",false);
					var Popup = 3;
				
					})
				.on("mouseout",function(){
						d3.select("#tooltip")
						.classed("hidden",true);
						//make them go down again
						var Popup = 3;
					
				})
		
		svg.selectAll(".totalbeds")
		.attr("fill","rgba(0,0,0,0.2)")
		.attr("opacity",0.7);
		
		
	
		
	//figure out what the spacing is between each item
	//add the text that says what aid station number
	//  ("putting new data");

	
	
	//make all the same color (to change later)
	
	
		
	svg.selectAll(".bedstaken")
		.attr("fill",function(d){
			 (d.Status);
			
			//figure out colors based on total beds and current beds
			return colorBars(+d.CurrentPatients,+d.Beds);
		});
	
	//Medical tents title
	svg.append("text")
		.attr("id","AidStationTitle")
		.attr("x",w/2)
		.attr("y",p*1.5)
		.text("Medical Tents (Bed Occupancy)")
		.attr("text-anchor", "middle");

					
	//add x axis
	/*

	*/


	//add x grid lines:
	/*
	svg.append("g")
		.attr("class","grid")
		.attr("transform","translate(0,"+(h-p/2)+")")
		.call(make_xAxis()
			.tickSize(-h,0,0)
			.tickFormat("")
		);
	*/
	
	/*var legend = svg.append('g')
				.attr("class", "legend")
				.attr("height", 50)
				.attr("width", 50)
				.attr("transform", "translate(50,30)")
				.call(d3.legend) */
	/*
	svg.append("g")
		.attr("class","grid")
		.attr("transform","translate(0,"+(h-p/2)+")")
		.call(make_xAxis()
			.tickSize(-h,0,0)
			.tickFormat("")
		);
	
	*/

};

//call the function to draw the aid station chart
d3.csv('data/AidStations.csv',drawMedCheckIn);






