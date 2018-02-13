<?php
    session_start();
    //checks if post values are set from front-end ajax
    if (isset($_POST['lineStart'],$_POST['lineEnd']) || isset($_POST['lineYear'])) {
        //attaches post values to session        
        $_SESSION['startMonth'] = $_POST['lineStart'];
        $_SESSION['endMonth'] = $_POST['lineEnd'];
        $_SESSION['lineYear'] = $_POST['lineYear'];
    }
?>