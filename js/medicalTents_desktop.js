function filterMedicalTents(obj){
	return ((obj.Type=="MT")&&obj.Location!="DUMMY"&&obj.Location!="Indiana");
};

function colorBars(current,beds){
	
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


function drawMedicalTents(data){

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

	var w = document.getElementById('medical').offsetWidth * 0.93;
	var h = document.getElementById('medical').offsetHeight*0.75;
	//padding
	var p = 10;


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
					.ticks(5);

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
				.attr("class","aid_station_mt")
				.attr("id","medical_tent");

		//plot the aid station number on x axis
	
	svg.selectAll("text")
		.data(MedicalTentsDataset)
		.enter()
		.append("text")
		.attr("class", "text_bar")
		.text(function(d){
			return d.Location;
		})
		.attr("y",function(d,i){
			return yScale(i)-ySpacing;
		})
		.attr("x",function(d){
			return d3.max([xScale(+d.Beds)+1.5*p,xScale(+d.CurrentPatients)+1.5*p]);
		})
		.attr("text-anchor","right")
		.style("font-size", "1.2vw");
		
	//add y axis
	svg.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+(h-p)+")") //moves it to the right coordinate
	.call(xAxis);

		
			var barsTotal = svg.selectAll(".totalbeds")
				.data(MedicalTentsDataset)
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
				.data(MedicalTentsDataset)
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
					return (xScale(+d.CurrentPatients)-xScale(0));
				})
				.attr("height",yScale.rangeBand())
				.on("mouseover",function(d){
					var xOffset = document.getElementById("medical").offsetWidth*1.55;
					var xPosition = xOffset + parseFloat(d3.select(this).attr("x")) ;
					var yPosition = parseFloat(d3.select(this).attr("y"))+50; //+ h/2;
					d3.select("#tooltip")
						.style("left", d3.event.pageX + "px")
						.style("top", (d3.event.pageY-100) + "px")
						.select("#value")
						.text(function() {
							return "Current: " + d.CurrentPatients + "/"+d.Beds + " Total: " + d.CumulativePatients + " ";
						});
					d3.select("#tooltip")
						.select("#tooltipHeader")
						.style("font-weight", "bold")
						.text(function() {
							return d.Location;
						});
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
								return (xScale(+d.CurrentPatients) - xScale(0));
							});
					});		
		
		
		
		svg.selectAll(".totalbeds")
		.attr("fill","rgba(0,0,0,0.2)")
		.attr("opacity", 0.7);
		
		
	
		
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
	

};




//call the function to draw the aid station chart
d3.csv('data/AidStations.csv',drawMedicalTents);






