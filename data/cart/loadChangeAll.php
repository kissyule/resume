<?php
	//data/cart/loadChangeAll.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	@$is_choice = $_REQUEST["is_choice"];
	//echo $uid;
	if($uid!==null){
		if($is_choice!==null){
			$sql = "UPDATE lz_shopping_cart_items SET is_choice = '$is_choice' WHERE uid = $uid";
            mysqli_query($conn,$sql);
            $data = mysqli_affected_rows($conn);
            if($data!==0){
                echo '{"code":1,"msg":"修改成功"}';
            }else{
                echo '{"code":-1,"msg":"修改失败"}';
            }
		}else{
			echo '{"code":-1,"msg":"修改失败"}';
		}
	}else{
		echo '{"code":-2,"msg":"请登陆"}';
	}
?>