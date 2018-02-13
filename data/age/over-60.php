<?php
    session_start();
	require_once '../../../info.php';

	$dbh = new PDO("mysql:host=$hostname; dbname=$db; charset=utf8", $user, $pass, 	array(PDO::ATTR_EMULATE_PREPARES => false,
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

	try {
        $filters = [
            "age_id = 4",
        ];

        if (isset($_SESSION['lineYear'])) {
            if($_SESSION['lineYear'] == "0") {
                unset($_SESSION['lineYear']);
            } else {
                $filters[] = "year = {$_SESSION['lineYear']}";
            }
		}
		
		//check if other sessions are active
		if (isset($_SESSION['startMonth'],$_SESSION['endMonth'])) {
			//adds query string between two dates to array
			$filters[] = "month BETWEEN {$_SESSION['startMonth']} AND {$_SESSION['endMonth']}";
		}

        $sql = "
            SELECT  month, COUNT(age_id) AS count
            FROM data
            WHERE " . implode(' AND ', $filters) . "
            GROUP BY month;";

		$result = $dbh->prepare($sql);//prepares query
		$result->execute();
		$result->setFetchMode(PDO::FETCH_ASSOC); //fetching results as associative array

	 	$emparray[] = array();

		while ($row = $result->fetch()):
			$emparray[] = $row;
		endwhile;

		unset($emparray[0]);
		$emparray = array_values($emparray);
		echo json_encode($emparray);

		$dbh = null; //closes database connection
	}

	catch(PDOException $e) {
		echo $e -> getMessage();
	}
?>
