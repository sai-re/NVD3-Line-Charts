<?php
    session_start();
    require_once 'calender/filter.php';
    require_once '../info.php';
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="assets/styles.css">
    <link href="assets/nv.d3.css" rel="stylesheet">
    <link rel="stylesheet" href="calender/styles.css">
</head>

<body class='with-3d-shadow with-transitions'>

    <main>

        <h2 id="page-title">Data Line Charts</h2>

        <div class="filter-forms">
            <div class="calenderContainer">
                <!--<button class="calenderApp__toggle">Data Filter</button>-->
                <div class="calenderApp">
                    <h1 class="calenderApp__main-title">Select a Date Range</h1>

                    <div class="title-container">
                        <p class="calenderApp__title1">MONTH</p>
                        <p class="calenderApp__title2">YEAR</p>
                    </div>
                    <p class="calenderApp__message"></p>

                    <p class="calenderApp__success"></p>
                    <div class="calenderApp__calender">
                    </div>

                    <div class="calenderApp__dropdown">
                    <?php
                        try {
                            filter($hostname, $db, $user, $pass);
                            $dbh2 = null;
                        }
                        catch(PDOException $e) {
                            echo $e -> getMessage();
                        }
                    ?>
                    </div>
                    <input class="calenderApp__filterButton" type="button" value="Update"></input>
                    <input class="calenderApp__clearButton calenderApp__clearButton--update" type="button" value="Clear"></input>
                </div>
            </div>
        </div>

        <section class="lineContainer">
            <ul class="tab">
                <li><a href="javascript:void(0);" class="tablinks" id="tab1">Age</a></li>
                <li><a href="javascript:void(0);" class="tablinks" id="tab2">Nationality</a></li>
                <li><a href="javascript:void(0);" class="tablinks" id="tab3">Relationship</a></li>
            </ul>

            <div id="age" class="tabcontent">
                <div id="chart1"></div>
            </div>

            <div id="nationality" class="tabcontent">
                <div id="chart2"></div>
            </div>

            <div id="relationship" class="tabcontent">
                <div id="chart3"></div>
            </div>
        </section>

    </main>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>
    <script src="assets/nv.d3.js"></script>
    <script src="assets/script.js"></script>
    <script src="calender/scripts.js"></script>
</body>

</html>