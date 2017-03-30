<!DOCTYPE html>
<html>
    <head>
        <title>General Info </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <link rel='stylesheet' type='text/css' href='css/styling.css'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel='stylesheet' type='text/css' href='css/menu.css'>
        <script src="js/googleAnalytics.js"></script>

    </head>
    <body>
        <?php include('php/header.php'); ?>
        <?php include 'db/connect.php'; ?>
        
        <?php
        $AidStations = array();
        
        
        foreach($_POST as $var){
            echo $var;
            echo "\n - ";
        }
        
        //get previous data to see if we should put it
        $sql = "SELECT *
                    FROM GeneralInformation
                    WHERE GeneralInformation.id = (
                    SELECT MAX( id )
                    FROM GeneralInformation ) ;";
        $result = $db->query($sql);
        
        if ($result->num_rows>0){
            //output data of each row as a variable in php
            while ($row = $result -> fetch_assoc()){
               print_r($row); 
                if (((int)$_POST['AlertStatus'])==55){
                    $alertStatus=$row['AlertStatus'];
                }
                else{
                    $alertStatus = (int)$_POST['AlertStatus']; 
                }
                
                if (((int)$_POST['runnersOC'])==$row['RunnersOnCourse']){
                        $runnersOc = $row['RunnersOnCourse'];
                    }
                    else{
                        $runnersOc = (int)$_POST['runnersOC']; 
                }
                
                if (((int)$_POST['started'])==$row['StartedRunners']){
                        $started = $row['StartedRunners'];
                    }
                    else{
                        $started = (int)$_POST['started']; 
                }
                
                if (((int)$_POST['finished'])==$row['FinishedRunners']){
                        $finished = $row['FinishedRunners'];
                    }
                    else{
                        $finished = (int)$_POST['finished']; 
                }
                
                 if (((int)$_POST['transports'])==$row['HospitalTransports'])
                 {
                        $transports = $row['HospitalTransports'];
                    }
                    else{
                        $transports= (int)$_POST['transports']; 
                }
                
                
                if (((int)$_POST['pSeen'])==$row['PatientsSeen']){
                        $pSeen = $row['PatientsSeen'];
                    }
                    else{
                        $pSeen = (int)$_POST['pSeen']; 
                }
                
                
                /*if ((floatval($_POST['latLM'])==0)){
                        $latLM = $row['LeadMaleLat'];
                    }
                    else{
                        $latLM = floatval($_POST['latLM']); 
                }
                
                
                if ((floatval($_POST['longLM'])==0)){
                        $longLM = $row['LeadMaleLong'];
                    }
                    else{
                        $longLM = floatval($_POST['longLM']); 
                }
                
                
                if ((floatval($_POST['latLF'])==0)){
                        $latLF = $row['LeadFemaleLat'];
                    }
                    else{
                        $latLF = floatval($_POST['latLF']); 
                }
                
                if ((floatval($_POST['longLF'])==0)){
                        $longLF = $row['LeadFemaleLong'];
                    }
                    else{
                        $longLF = floatval($_POST['longLF']); 
                }
                
                if ((floatval($_POST['latT'])==0)){
                        $latLF = $row['TurtleLat'];
                    }
                    else{
                        $latLF = floatval($_POST['latT']); 
                }
                
                if ((floatval($_POST['longT'])==0)){
                        $longLF = $row['TurtleLong'];
                    }
                    else{
                        $longLF = floatval($_POST['longT']); 
                }

                if ((floatval($_POST['latLMW'])==0)){
                        $latLMW = $row['LeadWheelchairMaleLat'];
                    }
                    else{
                        $latLMW = floatval($_POST['latLMW']); 
                }
                
                
                if ((floatval($_POST['longLMW'])==0)){
                        $longLMW = $row['LeadWheelchairMaleLong'];
                    }
                    else{
                        $longLMW = floatval($_POST['longLMW']); 
                }
                
                if ((floatval($_POST['latLFW'])==0)){
                        $latLFW = $row['LeadWheelchairFemaleLat'];
                    }
                    else{
                        $latLFW = floatval($_POST['latLFW']); 
                }
                
                
                if ((floatval($_POST['longLFW'])==0)){
                        $longLFW = $row['LeadWheelchairFemaleLong'];
                    }
                    else{
                        $longLFW = floatval($_POST['longLFW']); 
                }

                if ((floatval($_POST['latFW'])==0)){
                        $latFW = $row['FinalWheelchairLat'];
                    }
                    else{
                        $latFW = floatval($_POST['latFW']); 
                }
                
                
                if (floatval($_POST['longFW'])==0){
                        $longFW = $row['FinalWheelchairLong'];
                    }
                    else{
                        $longFW = floatval($_POST['longFW']); 
                }*/
                
                //echo $_POST['alert'];
                 if (($_POST['alert'])=="0"){
                    $alert = $row['Alert'];
                }
                else{
                    $alert = $_POST['alert']; 
                }

               // weather
               echo "<br>";
                echo $_POST['temperature'];
                echo "<br>";
                 if (($_POST['temperature'])==$row['temperature']){
                    $temperature = $row['temperature'];
                }
                else{
                    $temperature = $_POST['temperature']; 
                }
                
                
                //echo $_POST['alert'];
                 if (($_POST['windSpeed'])==$row['windSpeed']){
                    $windSpeed = $row['windSpeed'];
                }
                else{
                    $windSpeed = $_POST['windSpeed']; 
                }
                
                
                //echo $_POST['alert'];
                 if (($_POST['windDirection'])==$row['windDirection']){
                    $windDirection = $row['windDirection'];
                }
                else{
                    $windDirection = $_POST['windDirection']; 
                }
                
                
                //echo $_POST['alert'];
                 if (($_POST['humidity'])==$row['humidity']){
                    $humidity = $row['humidity'];
                }
                else{
                    $humidity = $_POST['humidity']; 
                }
                
                //echo $_POST['alert'];
                 if (($_POST['emergencyCheck'])){
                    $emergencyCheck = 1;
                }
                else{
                    $emergencyCheck = 0; 
                }
                
                if (floatval($_POST['latAl'])==0){
                    $latAl = $row['AlertLat'];
                }
                else{
                    $latAl = floatval($_POST['latAl']); 
                }
                
                if (floatval($_POST['longAl'])==0){
                    $longAl = $row['AlertLong'];
                }
                else{
                    $longAl = floatval($_POST['longAl']); 
                }
                
                if (($_POST['shelterDisplay'])){
                    $shelterDisplay = 1;
                }
                else{
                    $shelterDisplay = 0;
                }
                
                if (($_POST['shelterGP'])){
                    $shelterGP = 1;
                }
                else{
                    $shelterGP = 0;
                }
                print_r($row); 
                $latLM = $row['LeadMaleLat'];
                $longLM = $row['LeadMaleLong'];
                $latLF = $row['LeadFemaleLat'];
                $longLF = $row['LeadFemaleLong'];
                $latT = $row['TurtleLat'];
                $longT = $row['TurtleLong'];
                $latLWM = $row['LeadWheelchairMaleLat'];
                $longLWM = $row['LeadWheelchairMaleLong'];
                $latLWF = $row['LeadWheelchairFemaleLat'];
                $longLWF = $row['LeadWheelchairFemaleLong'];
                $latFW = $row['FinalWheelchairLat'];
                $longFW = $row['FinalWheelchairLong'];
                $lat350 = $row['pace350Lat'];
                $long350 = $row['pace350Long'];
                $lat355 = $row['pace355Lat'];
                $long355 = $row['pace355Long'];
                $lat425 = $row['pace425Lat'];
                $long425 = $row['pace425Long'];
                $lat430 = $row['pace430Lat'];
                $long430 = $row['pace430Long'];
                $lat500 = $row['pace500Lat'];
                $long500 = $row['pace500Long'];
                $lat510 = $row['pace510Lat'];
                $long510 = $row['pace510Long'];
                
            }
        }
        else {
            echo "0 results";
        }
        
        
        $sql = "INSERT INTO GeneralInformation (time, AlertStatus, temperature, windSpeed, windDirection, 
            humidity, StartedRunners, RunnersOnCourse, FinishedRunners, HospitalTransports,
            PatientsSeen, LeadMaleLat, LeadMaleLong, LeadFemaleLat, LeadFemaleLong, TurtleLat, TurtleLong,
            LeadWheelchairMaleLat,LeadWheelchairMaleLong, LeadWheelchairFemaleLat, LeadWheelchairFemaleLong,
            FinalWheelchairLat, FinalWheelchairLong,
            pace350Lat, pace350Long, pace355Lat, pace355Long,
            pace425Lat, pace425Long, pace430Lat, pace430Long, 
            pace500Lat, pace500Long, pace510Lat, pace510Long,
            Alert,emergencyCheck, AlertLat, AlertLong,shelterDisplay,shelterGP)
            VALUES (
                NOW(),
                ".$alertStatus.",
                ".$temperature.",
                ".$windSpeed.",
                \"".$windDirection."\",
                ".$humidity.",
                ".$started.",
                ".$runnersOc.",
                ".$finished.",
                ".$transports.",
                ".$pSeen.",
                
                ".$latLM.",
                ".$longLM.",
                ".$latLF.",
                ".$longLF.",
                ".$latT.",
                ".$longT.",
                
                ".$latLWM.",
                ".$longLWM.",
                ".$latLWF.",
                ".$longLWF.",
                ".$latFW.",
                ".$longFW.",
                
                ".$lat350.",
                ".$long350.",
                ".$lat355.",
                ".$long355.",
                ".$lat425.",
                ".$long425.",
                ".$lat430.",
                ".$long430.",
                ".$lat500.",
                ".$long500.",
                ".$lat510.",
                ".$long510.",
                
                \"".$alert."\" ,
                ".$emergencyCheck.",
                ".$latAl.",
                ".$longAl.",
                ".$shelterDisplay.",
                ".$shelterGP."
                );";
                
                    
        if ($db->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            //echo "Error: " . $sql . "<br>" . $conn->error;
            echo $sql. "Update Failed:" . "<br>" . mysqli_error($db);
        }
        
        $db->close();
        
        $myfile = fopen("data/gen_info.csv","w") or die("Error opening file");
        
        $txt = "Time,AlertStatus,temperature,windSpeed,windDirection,humidity,runnersStarted,";
        $txt = $txt."runnersOnCourse,runnersFinished,hospitalTransports,patientsSeen,";
        $txt = $txt."LeadMaleLat,LeadMaleLong,LeadFemaleLat,LeadFemaleLong,";
        $txt = $txt."TurtleLat,TurtleLong,";
        $txt = $txt."LeadWheelchairMaleLat,LeadWheelchairMaleLong,LeadWheelchairFemaleLat,LeadWheelchairFemaleLong,FinalWheelchairLat,FinalWheelchairLong,";
        $txt = $txt."pace350Lat,pace350Long,pace355Lat,pace355Long,pace425Lat,pace425Long,pace430Lat,pace430Long,pace500Lat,pace500Long,pace510Lat,pace510Long,Alert,emergencyCheck,AlertLat,AlertLong,shelterDisplay,shelterGP\n";
        
        $txt = $txt.$time.",";
        $txt = $txt.$alertStatus.",";
        $txt = $txt.$temperature.",";
        $txt = $txt.$windSpeed.",";
        $txt = $txt."\"".$windDirection."\",";
        $txt = $txt.$humidity.",";
        $txt = $txt.$started.",";
        $txt = $txt.$runnersOc.",";
        $txt = $txt.$finished.",";
        $txt = $txt.$transports.",";
        $txt = $txt.$pSeen.",";
        
        $txt = $txt.$latLM.",";
        $txt = $txt.$longLM.",";
        $txt = $txt.$latLF.",";
        $txt = $txt.$longLF.",";
        $txt = $txt.$latT.",";
        $txt = $txt.$longT.",";

        $txt = $txt.$latLWM.",";
        $txt = $txt.$longLWM.",";
        $txt = $txt.$latLWF.",";
        $txt = $txt.$longLWF.",";
        $txt = $txt.$latFW.",";
        $txt = $txt.$longFW.",";
        
        $txt = $txt.$lat350.",";
        $txt = $txt.$long350.",";
        $txt = $txt.$lat355.",";
        $txt = $txt.$long355.",";
        $txt = $txt.$lat425.",";
        $txt = $txt.$long425.",";
        $txt = $txt.$lat430.",";
        $txt = $txt.$long430.",";
        $txt = $txt.$lat500.",";
        $txt = $txt.$long500.",";
        $txt = $txt.$lat510.",";
        $txt = $txt.$long510.",";
        
        $txt = $txt."\"".$alert."\",";
        $txt = $txt.$emergencyCheck.",";
        $txt = $txt.$latAl.",";
        $txt = $txt.$longAl.",";
        $txt = $txt.$shelterDisplay.",";
        $txt = $txt.$shelterGP;
        
        echo $txt;
        
        fwrite($myfile,$txt);
        fclose($myfile); 

        
        ?> 
        
    <br><br><br><br>
    <a href='input_geninfo.php' >Go back to form</a>
    </body>
</html>
