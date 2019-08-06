<?php
	//data/cart/loadChange.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	@$iid = $_REQUEST["iid"];
	@$p_count = $_REQUEST["num"];
	@$is_choice = $_REQUEST["is_choice"];
	$iidReg = '/^[0-9]{1,5}$/';
    if(!preg_match($iidReg,$iid)){
        echo '{"code":-3,"msg":"编号格式不正确"}';
        exit;
    }
	//echo $uid;
	if($uid!==null){
		if($p_count!==null && $is_choice!==null){
			$sql = "UPDATE lz_shopping_cart_items SET p_count = $p_count,is_choice = '$is_choice' WHERE iid = $iid";
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