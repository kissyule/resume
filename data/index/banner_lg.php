<?php
	//data/index/banner_lg.php
	require_once("../init.php");
	$sql = "SELECT img,href,title FROM lx_banner_lg";
	$result = mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>