<?php
	//data/user/isLogin.php
	require_once('../init.php');
	session_start();
	@$uid = $_SESSION['uid'];
	if($uid==null){
		echo json_encode(['ok'=>0]);
	}else{
		$sql = "SELECT phone,avatar FROM lx_user WHERE uid = $uid";
		$result = mysqli_query($conn,$sql);
		$data = mysqli_fetch_assoc($result);
		$sql = "SELECT count(iid) AS num FROM lz_shopping_cart_items WHERE uid = $uid";
		$result = mysqli_query($conn,$sql);
		$num = mysqli_fetch_row($result);
		$output=[
		    'ok'=>1,
			"num"=>$num[0],
		    'data'=>$data
		];
		echo json_encode($output);
	}
?>