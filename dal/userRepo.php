<?php include ("../helpers/dbConn.php");?>
<?php 
//header("Content-Type: text/html");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$data = $request->Data;
$callback = $request->Func;

// determine the method to call, if any
if ($callback!=''){
 	call_user_func($callback, $data[0], $conn);
}

// ---------- dal repository Methods ----------------

// Authenticates user agains the database
function AuthUserOld($data, $conn){
	$email = $data->email;
	$pass = $data->password;
		
	$sql="SELECT ID FROM `sampleusers` WHERE  Email='$email' and Password='$pass'";
	$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			echo true; 
		}
		else
		{
			echo false;
		}
};

function AuthUser($data, $conn){
	$email = $data->email;
	$pass = $data->password;
	$rows = array();

	$sql="SELECT * FROM sampleusers WHERE  Email='$email' and Password='$pass'";
	$result = $conn->query($sql);
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
};


// close databse connetion
$conn->close();
?>