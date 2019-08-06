<?php
	//data/users/isLogin.php
	header("Content-Type:application/json");
	require_once("../init.php");
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid==null)
		echo json_encode(["ok"=>0]);
	else{
		$sql="select phone from mi_user where uid=$uid";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_row($result);
		echo json_encode(["ok"=>1,"uname"=>$row[0]]);
	}
?>