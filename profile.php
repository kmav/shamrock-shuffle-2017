<?php
    include('session.php');
    include('php/isMobile.php');

?>
<!DOCTYPE html>
<html>
<head>
<title>Bank of America Shamrock Shuffle 2017</title>
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto">
        <link rel="shortcut icon" href="http://common.northwestern.edu/v8/css/images/northwestern-thumb.jpg" type="image/x-icon" />

<link href="css/styled_login.css" rel="stylesheet" type="text/css">
<script src="js/googleAnalytics.js"></script>

</head>

<body>
<div id="main">
    <h1>Bank of America Shamrock Shuffle 2017 </h1>
    <h2 style="font-weight:normal;">Data Visualization System</h2>
    <div id="login">
    <h2 style='font-weight: bold;'>Welcome: <?php echo $login_session ?></h2>
    <?php 
        if (isset($_SESSION['firstTime'])){
            if ($_SESSION['firstTime']==true){
                echo "<h2 style='font-weight: bold; color:#009933'> Welcome to your member portal. Your new account has been created.</h2><br>
                
                <h3 style='font-weight: bold'> Please remember that your account is personal and linked to your security level. If you believe you do not have the correct security access, contact us at marathondvs@gmail.com </h3>";
            }
        }
    
    ?>
    <h3>Click on your browser's back button or on the Shamrock Shuffle logo at the top left of the displays to come back to this page. Feel free to email comments, complaints, and questions to marathondvs@gmail.com </h3>
    
    <?php
       /* if ($mobile){
            echo "<span style='font-weight:bold; color:black'> **You are on a mobile device, therefore you will not have access to the DVS but rather to the mobile-friendly display </span>";
        } 
        */
        //check for mobile version and put the appropriate links
        if ($level_session==2 || $level_session==1){
         //   $mobile = true;
        //}
        //if ($mobile==true){
            
            //echo "<br><br><span style='font-weight:normal'> After selecting the display, please allow a few seconds for data to load </span>";
            echo "<a href='desktop.php'><div class='pagelink'>Data Visualization System</div></a>";
            echo "<a href='instructions.php'><div class='pagelink'>Instruction Page</div></a>";
            //echo "<a href='AllMedCheckIn.php'><div class='pagelink'>Medical Staffing</div></a>";
        }
        //check for authorization to input_medical and input_geninfo.php
        else if ($level_session<=0){
            echo "<a href='desktop.php'><div class='pagelink'>Main Display</div></a>";
            //echo "<a href='AllMedCheckIn.php'><div class='pagelink'>Medical Staffing</div></a>";
            echo "<a href='instructions.php'><div class='pagelink'>Instruction Page</div></a>";
            //echo "<a href='getMobile.php'><div class='pagelink'>Mobile Version</div></a>";
            //echo "<a href='medicalCheckIn.php'><div class='pagelink'>Medical Check-In Input</div></a>";
            echo "<a href='input_medical.php'><div class='pagelink'>Medical Input</div></a>";
            echo " <a href='input_geninfo.php'><div class='pagelink'>General Input</div></a>";
            echo "<a href='inputStress.php'><div class='pagelink'>Stress Level Input</div></a>";
        }
        
        $admin = "rsquared11";
        if (strcmp($admin,$login_session)==0){
           // echo "<a href='users.php'><div class='pagelink'> User table </div></a>";
        }
    
    ?>

    <a href='php/logout.php'><div class='pagelink'>Logout</div></a>
 
    <span><?php echo $error; ?></span>
    </form>
    </div>
</div>
</body>
</html>