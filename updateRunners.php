<!DOCTYPE html>
<html>
    <head>
        <title>General Info </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
        <link rel='stylesheet' type='text/css' href='css/styling.css'>
        <script src="js/googleAnalytics.js"></script>

    </head>
    <body>
        <?php include 'db/connect.php'; ?>
        
        <?php 
        
            //get data from the inputs and put it in the database as new entry
        
        
        $sql = "INSERT INTO RunnerData (time,start,at5k,at10k,at15k,at20k,at25k,at30k,at35k,at40k,finish) VALUES (CURRENT_TIME(),";
        
        $sql = $sql . $_POST['start'].',';
        $sql = $sql . $_POST['at5k'].',';
        $sql = $sql . $_POST['at10k'].',';
        $sql = $sql . $_POST['at15k'].',';
        $sql = $sql . $_POST['at20k'].',';
        $sql = $sql . $_POST['at25k'].',';
        $sql = $sql . $_POST['at30k'].',';
        $sql = $sql . $_POST['at35k'].',';
        $sql = $sql . $_POST['at40k'].',';
        $sql = $sql . $_POST['finished'].');';
        
        if ($db->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
        $db->close();
        
        echo "\n\n ";
        echo $sql;
        
        ?>
        
    </body>
    
</html>
        
        