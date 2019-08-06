<?php
	//data/index/floor.php
	require_once("../init.php");
	$sql = "SELECT floor,num,name,title,price,img,href,detail FROM lx_floor";
	$result = mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>