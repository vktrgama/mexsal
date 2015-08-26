<?php include ("../helpers/dbConn.php");?>
<?php 

$email= $_POST['email'];
$pass= $_POST['password'];
$sql="SELECT ID FROM `sampleusers` WHERE  Email='$email' and Password='$pass'";

$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		echo 'true'; 
	}
	else
	{
		echo 'false';
	}

// close databse connetion
$conn->close();
?>