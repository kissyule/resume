<?php
	//data/index/banner_sm.php
	require_once("../init.php");
	$sql = "SELECT href,title FROM lx_banner_sm";
	$result = mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>