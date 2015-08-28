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

function GetSites($data, $conn){
	$email = $data->email;
	$rows = array();

	$sql="SELECT * FROM `telecomtracker` WHERE `Carrier_PM`= '$email' 
			OR `Carrier_Admin`= '$email' 
			OR  `AE_PM`= '$email' 
			OR `SAC_PM`= '$email' 
			OR `SAC_Leasing`= '$email' 
			OR `SAC_Planner`= '$email' 
			OR `SAC_CM`= '$email' 
			OR `SAC_Admin`= '$email'";
	$result = $conn->query($sql);
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
};


// close databse connetion
$conn->close();
?>