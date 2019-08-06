<?php
	//data/index/getFloor1.php
	header("Content-Type:application/json");
	require_once("../init.php");
	$sql="SELECT title ,details,nprice,oprice,pic,flag,review,author,floor_num FROM mi_index_product WHERE floor=1";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>
