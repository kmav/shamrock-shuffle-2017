<?php 
include('php/isMobile.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Input Medical </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <script src="js/googleAnalytics.js"></script>

        <link rel='stylesheet' type='text/css' href='css/styling.css'>
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel='stylesheet' type='text/css' href='css/menu.css'>
    </head>
    <body>
        <?php include('php/header.php'); ?>
            <a href='medicalCheckIn.php' >Go back to form</a>
<br><br>
        <?php include 'db/connect.php'; ?>
        
        <?php
        $MedCheckIn = array();
        $sql = "SELECT * FROM MedCheckIn";
        $result = $db->query($sql);
        
        if ($result->num_rows>0){
            //output data of each row as a variable in php
            while ($row = $result -> fetch_assoc()){
                
                $tempArray = array(
                    "Key"=>$row['Location'],
                    "Type"=>$row['StationType'],
                    "TimeUpdate"=>((string)$row['timeUpdate']),
                    "Location"=>$row['Location'],
                    "Display"=>$row['Display'],
                    "ATC"=>$row['ATC'],
                    "Attending"=>$row['Attending'],
                    "Res_Fellow"=>$row['Res_Fellow'],
                    "EMT"=>$row['EMT'],
                    "Massage"=>$row['Massage'],
                    "PA"=>$row['PA'],
                    "PT"=>$row['PT'],
                    "RN_NP"=>$row['RN_NP'],
                    "Med_Records"=>$row['Med_Records'],
                    "DPM"=>$row['DPM'],
                    "ATC_Recruit"=>$row['ATC_Recruit'],
                    "Attending_Recruit"=>$row['Attending_Recruit'],
                    "Res_Fellow_Recruit"=>$row['Res_Fellow_Recruit'],
                    "EMT_Recruit"=>$row['EMT_Recruit'],
                    "Massage_Recruit"=>$row['Massage_Recruit'],
                    "PA_Recruit"=>$row['PA_Recruit'],
                    "PT_Recruit"=>$row['PT_Recruit'],
                    "RN_NP_Recruit"=>$row['RN_NP_Recruit'],
                    "Med_Records_Recruit"=>$row['Med_Records_Recruit'],
                    "DPM_Recruit"=>$row['DPM_Recruit'],
                    "Stress"=>$row['Stress']
                    );
                //echo $tempArray["Location"];
                //echo "<br>";
                array_push($MedCheckIn,$tempArray);
            }
        }
        else {
            echo "0 results";
        }
        //get the values passed to me from the form medicalCheckIn.php
        $counter = 1;
        
        $names = array('Display', 'ATC', 'Attending', 'Res_Fellow', 'EMT', 'Massage', 'PA', 'PT', 'RN_NP', 'DPM', 'Med_Records');
        foreach($MedCheckIn as &$station){
            //now check and/or change as needed
            
                //echo "<br>$$$$".$counter."$$$$$<br>";
                //echo $_POST["AS_Current".$counter];
                //echo $_POST["AS_Cumulative".$counter];
                for ($x = 0; $x < count($names); $x++ ){
                    $station[$names[$x]] = (int)$_POST[$names[$x].$counter];
                }
                $str = "Display".$counter;      
                $station["Display"] = $_POST[$str];
                if ($station["Display"]==true){
                    $station["Display"]=1;
                }
                else{
                    $station["Display"]=0;
                }
            $sql = "UPDATE MedCheckIn
                SET timeUpdate=NOW(), Display=".$station["Display"].",ATC=".$station["ATC"] .", Attending=".$station["Attending"] .", Res_Fellow=".$station["Res_Fellow"]."
                ,EMT=".$station["EMT"].",Massage=".$station["Massage"].",PA=".$station["PA"].",PT=".$station["PT"]."
                ,RN_NP=".$station["RN_NP"].",DPM=".$station["DPM"].",Med_Records=".$station["Med_Records"].",Stress=".$station["Stress"]." 
                WHERE Location=".$station["Key"].";";
            echo $sql;
            echo $station["Location"];
            echo "<br>";
            if ($db->query($sql) === TRUE) {
                echo "Record ".$station["id"] ."updated successfully";
            } else {
                echo "Error updating record: ".$station["id"]." -- ERROR: ". $db->error;
            }
            $counter++;
        }
        
        //$txt = "Location,StationType,timeUpdate,ATC,Attending,Res_Fellow,EMT,Massage,PA,PT,RN_NP,DPM,Med_Records,Display,ATC_Recruit,Attending_Recruit,Res_Fellow_Recruit,EMT_Recruit,Massage_Recruit,PA_Recruit,PT_Recruit,RN_NP_Recruit,DPM_Recruit,Med_Records_Recruit,Stress\n";
        $profesh = array('ATC', 'Attending', 'Res_Fellow', 'EMT', 'Massage', 'PA', 'PT', 'RN_NP', 'DPM', 'Med_Records');
        $txt = "professional,day,hour,value,display\n";
        //professional is text (e.g. ATC), day is index of professional (e.g. 0), hour is which station, value is number recruited (or registered)
        $myfile = fopen("data/MedCheckInTest.csv","w") or die("unable to open file!");
        fwrite($myfile,$txt);
        $counter=1;
        foreach($MedCheckIn as $station){
            //ERROR -> for some reason, the last key and location gets changed back to 19 instead of 20
            //fixed it with a counter, but should check on this!
            //echo $station["Key"];
            //echo $counter;
            //write a new line
            
            
            for ($x = 0; $x < count($profesh); $x++ ){
                    // $txt = $counter."\t";
                    // $txt = $txt.$x."\t";
                    $txt = "";
                    $txt = $txt.$profesh[$x].",";
                    $txt = $txt.$x.",";
                    $txt = $txt.$counter.",";
                    
                    $recruit = $station[$profesh[$x]."_Recruit"];
                    $type = $station[$profesh[$x]];
                    
                    if ($recruit == 0){
                        $recruitPercentage = 1;
                    }
                    else{
                        $recruitPercentage = $type / $recruit;
                    }
                    
                    
                    $txt = $txt.$recruitPercentage.",";
                    $txt = $txt.$station['Display']."\n";
                    
                    
                    fwrite($myfile,$txt);
            }
        
                $counter++;   
            
        }
        
        
        
        
        fclose($myfile);
        
       ?>
        
        
    <br><br><br><br>
    </body>
</html>