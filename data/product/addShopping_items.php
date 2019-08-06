<?php
	//data/product/addShopping_items.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	@$pid = $_REQUEST["pid"];
	@$p_count = $_REQUEST["num"];
	@$service = $_REQUEST["service"];
	if($service===null){
		$service = "";
	}
	$pidReg = '/^[0-9]{1,5}$/';
    if(!preg_match($pidReg,$pid)){
        echo '{"code":-3,"msg":"商品编号格式不正确"}';
        exit;
    }
	//echo $uid;
	if($uid!==null){
		if($p_count!==null){
			$sql = "SELECT p_count,iid FROM lz_shopping_cart_items WHERE uid = $uid AND pid = $pid";
			$result = mysqli_query($conn,$sql);
			$row = mysqli_fetch_row($result);
			if(!$row){
				$sql = "INSERT INTO lz_shopping_cart_items(uid,pid,p_count,is_service) VALUES ($uid,$pid,$p_count,'$service')";
                mysqli_query($conn,$sql);
                $data = mysqli_affected_rows($conn);
                if($data!==0){
                    echo '{"code":1,"msg":"添加成功"}';
                }else{
                    echo '{"code":-1,"msg":"添加失败"}';
                }
			}else{
				$p_count = $p_count + $row[0];
				$sql = "UPDATE lz_shopping_cart_items SET p_count = $p_count, is_service = '$service' WHERE iid = $row[1]";
				mysqli_query($conn,$sql);
				$data = mysqli_affected_rows($conn);
                if($data!==0){
                    echo '{"code":1,"msg":"添加成功"}';
                }else{
                    echo '{"code":-1,"msg":"添加失败"}';
                }
			}
		}else{
			echo '{"code":-1,"msg":"添加失败"}';
		}
	}else{
		echo '{"code":-2,"msg":"请登陆"}';
	}
?>