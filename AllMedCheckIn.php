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
//check if it's been active for 1 hour, otherwise close it
if ($_SESSION['start'] + (2*60*60) < time()) {
     header("location: php/logout.php");
  }
?>



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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>


        <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
        <script src="js/leaflet.awesome-markers.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato">
        <link rel='stylesheet' href='css/newStyle.css'>



        <script src='js/updateAll.js' type='text/javascript'></script>
        
        <style>
          
          #mod3{
            height: 85%;
          }
        </style>
        
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

    <script src='js/GeneralInfo.js' type='text/javascript'></script>


					<div class="module" id="mod3">
						<h4> Medical Staffing </h4>
							<div id="chart"></div>
						<script src = "js/medCheckInAll.js" type = "text/javascript"></script>
					</div>
				
			
			<div id="tooltip" class="hidden">
    			<p><span id="tooltipHeader">Aid Station</span></p>
    			<p><span id="value">100</span></p>
			</div>

		</div>

	</body>


	<script>
	
	

	function mediaQueries() {

		//First is FC, Second is Desktop

                if (window.innerWidth < window.innerHeight){
                        document.getElementById('MarathonName').style.width= '400px';
                        document.getElementById('MarathonName').style.backgroundSize =  '80%';
                        document.getElementById('NUlogo').style.display = 'none';
                        document.getElementById('raceTime').style.fontSize = '240%';
                        document.getElementById('clockTime').style.fontSize = '240%';
                        document.getElementById('alertText').style.fontSize = '170%';
                        setTimeout(function(){
                                                        var text = document.getElementsByTagName("text");
                        for (var i=0; i<text.length; i++){
                                text[i].style.fontSize = '2.4vw';
                        }


                        }, 500);
                }
		else{
			document.getElementById('MarathonName').style.width= '20%';
			document.getElementById('MarathonName').style.backgroundSize = '100%';
			document.getElementById('NUlogo').style.display = 'inline-block';
			document.getElementById('raceTime').style.fontSize = '150%';
			document.getElementById('clockTime').style.fontSize = '150%';
			document.getElementById('alertText').style.fontSize = '100%';
			setTimeout(function(){
							var text = document.getElementsByTagName("text");
			for (var i=0; i<text.length; i++){
				text[i].style.fontSize = '1.5vw';
			}
				
				
			}, 500);

		}
	}

	mediaQueries();

	window.addEventListener("resize", mediaQueries);



	</script>




</html>
