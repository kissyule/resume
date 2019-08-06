<?php
	//data/index/banner_md.php
	require_once("../init.php");
	$sql = "SELECT img,href,name,title,price FROM lx_banner_md";
	$result = mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>