<?php 
session_start(); // Starting Session
if(!isset($_SESSION['login_user'])){
    header("location: index.php");
    
}
?>
<!DOCTYPE html>
<html>
<meta charset="utf-8"/>
<?php include('php/header.php'); ?>
<head>
    <title>Visualization User Guide </title>
    <style>
        .inputBox {
            text-align: center;
            width: 100%;
            height: 30px;
            margin: auto;
            border-radius: 10px;
            background: linear-gradient(rgb(135,206,235),rgb(173,216,230), white);
            
        }
        .wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            margin: auto;
            float: left;
        }
        
        .genInfoBox {
            border: 2px; 
            text-align: center;
            width: 200px;
            height: 50px;
            padding: 10px;
            background: linear-gradient(rgb(135,206,235),rgb(173,216,230), white);
            border-radius: 10px;
            float: left;
            margin: 10px;
        }
        
        .trackingBox {
            border: 2px ;
            text-align: center;
            width: 200px;
            height: 130px;
            padding: 10px;
            background: linear-gradient(rgb(135,206,235),rgb(173,216,230), white);
            border-radius: 10px;
            float: left;
            margin: 10px;
        }
        
        .AlertBox {
            border: 2px;
            text-align: center;
            width: 600px;
            height: 50px;
            padding: 10px;
            background: linear-gradient(rgb(135,206,235),rgb(173,216,230), white);
            border-radius: 10px;
            float: left;
            margin: 10px;
        }
        
        .emergBox {
            border: 2px;
            text-align: center;
            width: 200px;
            height: 150px;
            padding: 10px;
            background: linear-gradient(rgb(249,100,100),rgb(249,100,100), white);
            border-radius: 10px;
            float: left;
            margin: 10px;
        }
        
        .Titles {
            font-size: 120%;
  	        font-family: "Helvetica Neue", Geneva, sans-serif;
        }
        
        .Labels {
            font-size: 100%;
  	        font-family: "Helvetica Neue", Geneva, sans-serif;
        }
        .submitButton{
            width: 300px;
            height: 60px;
            font-size: 1.5em;
        }
        
        
        
    </style>
    <script src="js/googleAnalytics.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel='stylesheet' type='text/css' href='css/menu.css'>
        <link rel="shortcut icon" href="http://common.northwestern.edu/v8/css/images/northwestern-thumb.jpg" type="image/x-icon" />

</head>

<body>

        <h1 style="text-align: center;">Data Visualization User Guide</h1>
        <h4 style="text-align: center">Below is a list of features supported by our system, and how to interpret the information</h4>
        <h5 style="text-align: center">Note: Our system is optimized for the 1080 x 1920 and 1920 x 1080 display screens in Forward Command - not for mobile!</h5>
        
        <div style="width:80%; margin: 40px auto;">
        <img src="img/shamrock_screenshot.png" style="width: 100%; margin: 0 auto"></img>
        </div>
                    
        <ul class="inst-list" style="margin-right: 10%; margin-left:5%">

            <br>
            <li><span style="font-weight: bold">Top Bar</span>: The color of the top bar reflects the current event alert status level 
            (e.g. if the top bar is green, the alert level is green)</li>
            <li><span style="font-weight: bold">Logos</span>: Click on the BACSS logo to redirect back to the main menu, 
            and clicking on the Northwestern logo directs to the Northwestern Industrial Engineering homepage</li>
            <li><span style="font-weight: bold">Weather</span>: The weather section will display the Wet Bulb Globe Temperature, updated hourly</li>
            <li><span style="font-weight: bold">Clock</span>: Current time and the race gun time, both updated in real-time</li>
            <li><span style="font-weight: bold">Alert Bar</span>: The white message bar displays race-related messages and general notifications as the race progresses 
            (e.g. “All corrals have started”, “The lead runner has crossed the finish line”). 
            If you have any notifications you would like to relay to the Forward Command tent, 
            please speak to a member of the data visualization team and we can add it to the display.</li>
            <br>
            <li><span style="font-weight: bold">Course Map</span>:
            <br>
            <ul>
                <li><span style = "text-decoration: underline">Mile Segments</span>:
                <ul>
                    <li>The course is separated into colored mile-long segments. 
                    The colors represent the segment’s current density of runners. 
                    Green segments have low runner density, 
                    while red miles have a large number of runners along the segments. </li>
                    <li>Clicking on the colored segment will display the number of runners in that mile; 
                    the Runners Per Mile Graph also visualizes this information. </li>
                    <li>The key for the range of runners corresponding to each color 
                    can be found in the legend on the right.</li>
                    <li>Additionally, the purple teardrop-shaped symbols along the course represent 
                    the mile markers along the course</li>
                </ul></li>
                <li><span style = "text-decoration: underline">Aid Station Markers</span>: 
                <ul>
                    <li>Each green, yellow, or red teardrop-shaped symbol represents an aid station along the course, 
                    and its current bed occupancy level in relation to its total capacity. </li>
                    <li>Clicking on the markers will display the current number of patients at the aid station</li>
                </ul></li>
                <li><span style = "text-decoration: underline">GPS Trackers</span>: 
                <ul>
                    <li>The blue circles along the course represent runners designated to hold GPS units.</li>
                    <li>GPS units will track the lead runner, lead female runner, last runner, 
                    as well as designated pacers to contextualize runner density</li>
                    <li>Legend for the pacers on the map:
                    <ul>
                        <li><span style="font-style: italic">LM</span>: Lead Male Runner</li>
                        <li><span style="font-style: italic">LW</span>: Lead Female Runner</li>
                        <li><span style="font-style: italic">T</span>:  Final Runner</li>
                        <li><span style="font-style: italic">LWh</span>: Lead Wheelchair</li>
                        <li><span style="font-style: italic">FWh</span>: Final Wheelchair</li>
                        <li><span style="font-style: italic">LWk</span>: Lead Walker</li>
                        <li><span style="font-style: italic">FWk</span>: Final Walker</li>
                    </ul></li>
                    </ul></li>
                </ul></li>
                <br>
                <li><span style="font-weight: bold">Medical Tents Graph</span>: 
                <ul>
                    <li>The bar chart displays the current bed occupancy for each of the medical tents along the course 
                    and at the finish line. Grey bars represent the total number of beds held by the medical tent 
                    (total capacity), and overlaid colored bars represent the number of patients 
                    currently in each respective medical tent. 
                    The colors (green, yellow, and red) correspond to increasing occupancy, 
                    where a more granular breakdown shown in the legend. 
                    For more detailed information, 
                    hover over each colored bar to display the name of the medical tent 
                    and the exact number of patients currently checked in.</li>
                </ul></li>
                <br>
                <li><span style = "font-weight: bold">Stress Level</span>: 
                    <ul>
                        <li>The last row of the aid station section displays stress levels. 
                        The stress levels are updated every 15 minutes, and take into account patient load, staffing and supplies. </li>
                        <ul>
                        <li>Stress Level 1 - No stress (<span style= "color:green">Green</span>): 
                            Handling patient load, plenty of available beds; plenty of staff; plenty of supplies.</li>
 
                            <li>Stress Level 2 – Slight stress (<span style="color:	#CCCC00">Yellow</span>): 
                            Handling patient load, available beds; staff available; good supplies. </li>
 
                            <li>Stress Level 3 – Feeling pressure (<span style="color:#F19132">Light Orange</span>): 
                            No available beds, patients spilling into street; all staff with patients, 
                            but have support (ambulance nearby); supplies getting thin. </li>
 
                            <li>Stress Level 4 – Feeling much pressure (<span style="color:#D8822D">Dark Orange</span>): 
                            No available beds, patients in street; not enough staff, no support (no ambulance); diminishing supplies.</li>
 
                            <li>Stress Level 5 – Overwhelmed (<span style="color:Red">Red</span>): 
                            Too many patients, no available beds and patients crowding street; not enough staff, no support (no ambulance); some supplies depleted.</li>
                        </ul>
                    </ul></li>
                <br>
        </ul>
        
                <div style="width:80%; margin: 40px auto;">
        </div>
        
</body>

</html>