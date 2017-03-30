<?php 

include('session.php');

include('php/isMobile.php');
echo "  <ul class='menuHolder nav nav-pills'>";
echo "
    <li class='actives'><a class='link' href='profile.php'>Home</a></li>
";
if ($mobile==true){
    
    echo "<li class='actives'><a class='link' href='getMobile.php'>Mobile Version</a></li>";
}
else {
    echo "
            <li  class='actives'><a class='link' href='desktop.php'>Desktop</a></li>
    ";
}

if ($level_session==0){
    echo "
            <li class='actives'><a class='link' href='input_medical.php'>Medical Input</a></li>
            <li class='actives'><a class='link' href='input_geninfo.php'>General Input</a></li>
            <li class='actives'><a class='link' href='inputStress.php'>Stress Level Input</a></li>
            <li class='actives'><a class='link' href='instructions.php'>Instruction Page</a></li>


    ";
}
            
            
//write name just as a reminder of who is logged in            
echo "
            <li class='actives'><a class='link' href='#'>$login_session</a></li>
            <li class='actives'><a class='link' href='php/logout.php'>Logout </a><li>
        </ul>
";


?>