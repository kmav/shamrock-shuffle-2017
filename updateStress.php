<?php 
include('php/isMobile.php');

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Input Stress </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <script src="js/googleAnalytics.js"></script>

        <link rel='stylesheet' type='text/css' href='css/styling.css'>
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel='stylesheet' type='text/css' href='css/menu.css'>
    </head>
    <body>
        <?php include('php/header.php'); ?>
            <a href='inputStress.php' >Go back to form</a>
<br><br>
        <?php include 'db/connect.php'; ?>
        
        <?php
        $StressLevel = array();

        $sql = "SELECT * FROM StressLevel";
        $result = $db->query($sql);
        
        if ($result->num_rows>0){
            //output data of each row as a variable in php
            while ($row = $result -> fetch_assoc()){
                
                $tempArray = array(
                    "Key"=>$row['Location'],
                    "TimeUpdate"=>((string)$row['timeUpdate']),
                    "Location"=>$row['Location'],
                    "Stress"=>$row['Stress']
                    );
                echo $tempArray;
                //echo "<br>";
                array_push($StressLevel,$tempArray);
            }
            echo $StressLevel;
        }
        else {
            echo "0 results";
        }


        //get the values passed to me from the form medicalCheckIn.php
        $counter = 1;
        
        //$names = array('Display', 'ATC', 'Attending', 'Res_Fellow', 'EMT', 'Massage', 'PA', 'PT', 'RN_NP', 'DPM', 'Med_Records', 'Stress');

        foreach($StressLevel as &$station){
            //now check and/or change as needed
            
                //echo "<br>$$$$".$counter."$$$$$<br>";
                //echo $_POST["AS_Current".$counter];
                //echo $_POST["AS_Cumulative".$counter];
                
  
            $station['Stress'] = (int)$_POST['Stress'.$counter];
  

            $sql = "UPDATE StressLevel
                SET timeUpdate=NOW(),Stress=".$station["Stress"]." 
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

        $txt = "aidStation,stress\n";
        $myfile = fopen("data/allStress.csv","w") or die("unable to open file!");
        fwrite($myfile,$txt);
        $counter=1;

        foreach($StressLevel as $station){
            
            $txt = "";
            $txt = $txt.$station["Location"].",";
            $txt = $txt.$station["Stress"]."\n";
            echo $txt."<br>";
            fwrite($myfile,$txt);
            $counter++;
        }
        
        
        
        
        fclose($myfile);
        
       ?>
        
 
        
        
    <br><br><br><br>
    </body>
</html>