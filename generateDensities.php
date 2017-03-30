<!DOCTYPE html>
<html>
    <head>
        <title>Input Medical </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <script src="js/googleAnalytics.js"></script>

        <link rel='stylesheet' type='text/css' href='css/styling.css'>
    </head>
    <body>
        <?php include 'db/connect.php'; ?>
        
        <?php
            
            $temperature = (int)$_POST["temperature"];
            
            //now get all the 500 minutes of the race 
            $sql = "Select minute,mile,runners from RunnerPerMile where temperature=".$temperature." order by minute,mile;";
            $result = $db->query($sql);
            $pastMinute = -2;
            
            $density = array();
            
            if ($result->num_rows>0){
                while ($row = $result -> fetch_assoc()){
                    
                $minute = $row['minute']; 
                if ($minute>$pastMinute){
                    //new array
                    $density[$minute]=array();
                    $pastMinute = $minute;
                }
                $mile = $row['mile'];
                $density[$minute][$mile] = $row['runners'];                  
                    
                }
            }
            else {
                echo "0 results - error"; 
            }
            
            //now write a csv file that will 'write' the densities for that given temperature
            $myfile = fopen("data/Densities.csv","w") or die("unable to open file!");
            
            $txt = "raceMinute,started,atMile0,atMile1,atMile2,atMile3,atMile4,atMile5,atMile6,atMile7,atMile8,atMile9,atMile10,atMile11,atMile12,atMile13,atMile14,atMile15,atMile16,atMile17,atMile18,atMile19,atMile20,atMile21,atMile22,atMile23,atMile24,atMile25,atMile26,finished\n";
            
            $minute = 0;
            foreach($density as $raceminute){
                
                //each iteration of the loop will have the array to write
                $txt = $txt.$minute;
                
                //now write how many started and how many in the 0th mile
                $txt = $txt.",".$raceminute[-1].",".$raceminute[0]; 
                
                for ($i = 1; $i<=26; $i++){
                    $txt = $txt.",".$raceminute[$i];
                }
                
                //now how many finished and the end of line
                $txt = $txt.",".$raceminute[27]."\n";
                
                $minute++;
            }
            fwrite($myfile,$txt);
            fclose($myfile);
            
            echo "Success! densities table modified using temperature=".$temperature;
            
            
            ////////////////////////////////
            //now do the same for 5k 
            
            
            
            // $sql = "Select minute,segment,runners from Runner5k where temperature=".$temperature." order by minute,segment;";
            // $result = $db->query($sql);
            // $pastMinute = -2;
            
            // $density = array();
            
            // if ($result->num_rows>0){
            //     while ($row = $result -> fetch_assoc()){
                    
            //     $minute = $row['minute']; 
            //     if ($minute>$pastMinute){
            //         //new array
            //         $density[$minute]=array();
            //         $pastMinute = $minute;
            //     }
            //     $segment = $row['segment'];
            //     $density[$minute][$segment] = $row['runners'];                  
                    
            //     }
            // }
            // else {
            //     echo "0 results - error"; 
            // }
            
            // //now write a csv file that will 'write' the densities for that given temperature
            // $myfile = fopen("data/Densities5k.csv","w") or die("unable to open file!");
            
            // $txt = "raceMinute,started,at0K,at5K,at10K,at15K,at20K,at25K,at30K,at35K,at40K,finished\n";
            
            // $minute = 0;
            // foreach($density as $raceminute){
                
            //     //each iteration of the loop will have the array to write
            //     $txt = $txt.$minute;
                
            //     //now write how many started and how many in the 0th mile
            //     $txt = $txt.",".$raceminute[-1].",".$raceminute[-0]; 
                
            //     for ($i = 1; $i<=8; $i++){
            //         $txt = $txt.",".$raceminute[$i];
            //     }
                
            //     //now how many finished and the end of line
            //     $txt = $txt.",".$raceminute[9]."\n";
                
            //     $minute++;
            // }
            // fwrite($myfile,$txt);
            // fclose($myfile);
            
            // echo "Success! densities table modified using temperature=".$temperature;
            
            
            
            
            
            
            
        ?>
    </body>
</html>
            