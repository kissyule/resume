<?php
	//data/cart/delete_items.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	@$iid = $_REQUEST["iid"];
	$iidReg = '/^[0-9]{1,5}$/';
	if(!preg_match($iidReg,$iid)){
        echo '{"code":-3,"msg":"编号格式不正确"}';
        exit;
	}
	//echo $uid;
	if($uid!==null){
		if($iid!=0){
            $sql = "DELETE FROM lz_shopping_cart_items WHERE iid = $iid AND uid = $uid";
		}else{
			$sql = "DELETE FROM lz_shopping_cart_items WHERE uid = $uid AND is_choice = '1'";
		}
		mysqli_query($conn,$sql);
		$data = mysqli_affected_rows($conn);
		if($data!==0){
            echo '{"code":1,"msg":"删除成功"}';
        }else{
            echo '{"code":-1,"msg":"删除失败"}';
        }
	}else{
		echo '{"code":-2,"msg":"请登陆"}';
	}
?>