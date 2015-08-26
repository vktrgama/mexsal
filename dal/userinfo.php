<?php include ("../helpers/dbConn.php");?>
<?php

$email= "renesanchez@mexsal.com"; // $_POST['email'];
$result = $conn->query("SELECT * FROM sampleusers WHERE Email='$email'");

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);

$conn->close();
?>