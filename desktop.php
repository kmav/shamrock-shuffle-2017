<?php 
session_start(); // Starting Session
include('session.php');
if ($mobile==true)
{
    //header("location: getMobile.php");
}
/*if ($level_session>1){
    header("location: index.php");
}*/
if(!isset($_SESSION['login_user'])){
    header("location: index.php");
}
//check if it's been active for 10  hours, otherwise close it
if ($_SESSION['start'] + (10*60*60) < time()) {
     header("location: php/logout.php");
  }
?>



<html>

	<head>

        <meta charset=utf-8 />
        <title>Bank of America Shamrock Shuffle</title>
        <?php include('php/getTreatments.php'); ?>

        <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
        <link rel="shortcut icon" href="http://common.northwestern.edu/v8/css/images/northwestern-thumb.jpg" type="image/x-icon" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <script src="js/dimple.js"></script>
        <script src='https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>


        <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
        <script src="js/leaflet.awesome-markers.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato">
        <link rel='stylesheet' href='css/newStyle.css'>



        <script src='js/updateAll.js' type='text/javascript'></script>
        
	</head>


	<body onload="mediaQueries(); updatePage(); setInterval('updatePage()',1000)">

		<div id="header">
		 
        <div id="logos">
            <a href="profile.php">
                <div id="MarathonName"></div>
            </a>
            
            <a href="http://www.mccormick.northwestern.edu/industrial/" target = "_blank">
                <div id='NUlogo'></div>
            </a>
        </div>
        
              <div id='timingDiv'>
                    <div id='clockTime'>
                        <p>Clock Time</p>
                        <div id='clock'>&nbsp</div>
                    </div>
                    <div id='raceTime'>
                        <p>Race Time</p>
                        <div id='elapsedTime'>&nbsp</div>
                    </div>
                </div>
               

		</div>


        <script src='js/alerts.js' type='text/javascript'></script>
        
        <div id='alertbar'>
            <div id='alertText'>&nbsp</div>
        </div>
		
		
		<div class="content">

			<div id="map">
				
				<div id="info">
			        <!--<p id='RunnersOnCourse'>&nbsp</p>
			        <p id='RunnersFinished'>&nbsp</p>-->
			        <p id='HospitalTransports'>&nbsp</p>
			        <p id='PatientsSeen'>&nbsp</p>
					<!--<p id='InMedical'>&nbsp</p>-->
					

				</div>
				
				
			</div>
			
			<script src='js/generateMaps.js' type='text/javascript'></script>
            <script src='js/GeneralInfo.js' type='text/javascript'></script>


			



			<div id="sidebar">

				<div id="col1">


					<div class="stats module" id="mod1">
						<h4> Runner Stats</h4>
						
						<div id="runners_box">
							<div id="runners_box_left">
								<p>Started: <span id='RunnersStarted'>&nbsp</span> </p>
								<!--<p><span id='RunnersDropped'>&nbsp</span> </p>-->
							</div>
							<div id="runners_box_right">
				        		<p>Finished: <span id='RunnersFinished'>&nbsp</span></p>
				        	</div>
				        	<div id="runners_box_center">
				        		<p>On Course: <span id='RunnersOnCourse'>&nbsp</span></p>
				        	</div>
						</div>
							
					</div>
				
					<div class="module" id="mod4">
						
						<h4> Weather </h4>
						<div id="weather">

					    <script src="js/weather.js"></script>
					    </div>
					</div>
					
					
					<div class="legend module" id="mod2">
						<h4>Map Legend</h4>
							<div id="map_legend">
								
								<div id="runner_legend">
									<p> <b>Runners:</b> </p>
									<p>Opened <span class="boxes gray"></span></p>
							        <p>0-1500 <span class="boxes green"></span></p>
							        <p >1500-3000 <span class="boxes yellow"> </p>
							        <p>3000-4500 <span class="boxes orange"> </p>
							        <p>4500+ <span class="boxes red"> </p>
							    </div>
							    
							    <div id="marker_legend">
									<p><b>Markers:</b> </p>
									<p> 8K Miles <span class="circles purple"></span></p>
									<p> Walk Miles <span class="boxes cream" style='border: 1px solid gray;'></span></p>
									<p> Aid Stations <span class="circles green"></span></p>			
									<p> AS (Closed) <span class="circles gray"></span></p>
								</div>
								
							</div>
					</div>
					
				
<!--
					<div class="density module" id="densityplotWrap">
						<h4> Runners Per Mile </h4>
                         <script src='js/densityLine.js' type='text/javascript'></script>
					</div>
					
-->

					


				</div>

				<div id="col2">

					<div class="medical module" id="medical">
					    <h4>Medical Tents (Occupancy)</h4>
					</div>
					   
					<div class="module" id="mod3">
						<h4> Aid Stations </h4>
							<div class="aidStations" id="aidStations">
								Occupancy
							</div>
							<div id="stress-chart">Stress</div>
						<script src = "js/stress.js" type = "text/javascript"></script>
					</div>

					<script src='js/medicalTents_desktop.js' type='text/javascript'></script>
					<script src='js/aidStations_desktop.js' type='text/javascript'></script>
			
				</div>

			</div>
			
			<div id="tooltip" class="hidden">
    			<p><span id="tooltipHeader">Aid Station</span></p>
    			<p><span id="value">100</span></p>
			</div>

		</div>

	</body>


	<script>
	
	updateMap();

	function mediaQueries() {

		//First is FC, Second is Desktop

                if (window.innerWidth > 1500){
						document.getElementById('map').style.width = '33%';
						document.getElementById('sidebar').style.width = '66%';
						document.getElementById('col1').style.width = '49.5%';
						document.getElementById('col2').style.width = '49.5%';
						document.getElementById('col1').style.height = '100%';
						document.getElementById('col2').style.height = '100%';
						document.getElementById('MarathonName').style.width= '20%';
						document.getElementById('MarathonName').style.backgroundSize = '100%';
						document.getElementById('NUlogo').style.display = 'inline-block';
						document.getElementById('raceTime').style.fontSize = '200%';
						document.getElementById('clockTime').style.fontSize = '200%';
						document.getElementById('alertText').style.fontSize = '150%';
						document.getElementById('info').style.fontSize = '1.7em';
						document.getElementById('runners_box').style.width = '100%';
						document.getElementById('runners_box').style.height = '60%';
						document.getElementById('runners_box').style.fontSize = '1.3em';
						document.getElementById('runners_box_center').style.fontSize = '1.4em';
						document.getElementById('weather').style.fontSize = '1.5em';
				        document.getElementById('map_legend').style.bottom = '170';
				        document.getElementById('map_legend').style.fontSize = '1.1em';
                        setTimeout(function(){
                          var text = document.getElementsByTagName("text");
                        for (var i=0; i<text.length; i++){
                                text[i].style.fontSize = '1.15vw';
                        }


                        }, 500);
                }
		else{
			document.getElementById('map').style.width = '33%';
			document.getElementById('sidebar').style.width = '66%';
			document.getElementById('col1').style.width = '49.5%';
			document.getElementById('col2').style.width = '49.5%';
			document.getElementById('col1').style.height = '100%';
			document.getElementById('col2').style.height = '100%';
			document.getElementById('MarathonName').style.width= '20%';
			document.getElementById('MarathonName').style.backgroundSize = '100%';
			document.getElementById('NUlogo').style.display = 'inline-block';
			document.getElementById('raceTime').style.fontSize = '150%';
			document.getElementById('clockTime').style.fontSize = '150%';
			document.getElementById('alertText').style.fontSize = '120%';
			document.getElementById('info').style.fontSize = '100%';
			document.getElementById('runners_box').style.width = '100%';
			document.getElementById('runners_box').style.height = '60%';
			document.getElementById('runners_box').style.fontSize = '1.1em';
			document.getElementById('runners_box_center').style.fontSize = '1.1em';
			document.getElementById('weather').style.fontSize = '1.3em';
	        document.getElementById('map_legend').style.bottom = '140';
			setTimeout(function(){
							var text = document.getElementsByTagName("text");
			for (var i=0; i<text.length; i++){
				text[i].style.fontSize = '1.15vw';
			}
				
				
			}, 500);

		}
	}

	mediaQueries();

	window.addEventListener("resize", mediaQueries);


	</script>




</html>
