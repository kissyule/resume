<?php
//data/user/address.php
	require_once("../init.php");
	session_start();
	@$uid=$_SESSION["uid"];
	@$address=$_REQUEST['address'];
	if($uid != null){
		$sql="SELECT address from mi_user WHERE uid = $uid";
		$result = mysqli_query($conn,$sql);
		$address_old = mysqli_fetch_row($result)[0]; 
		if($address_old===$address){
			echo '{"code":-2,"msg":"输入地址与原地址相同"}';
			exit;
		}
		$sql="UPDATE  mi_user SET address='$address' WHERE uid=$uid";
		//echo $sql;
		mysqli_query($conn,$sql);
		$data = mysqli_affected_rows($conn);
		if($data>0){
			echo ('{"code":1,"msg":"更新成功"}');
		}else{
			echo ('{"code":-1,"msg":"更新失败"}');
		}
	}
?>