<?php
	//data/cart/loadCart.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	//echo $uid;
	if($uid!==null){
		$sql = "SELECT y.iid,x.pid,x.images,x.title,x.subtitle,x.price,x.promise,y.p_count,y.is_choice,y.is_service FROM lx_product AS x INNER JOIN lz_shopping_cart_items AS y on x.pid=y.pid WHERE uid = $uid";
		$result = mysqli_query($conn,$sql);
		$data = mysqli_fetch_all($result,1);
		$sql = "SELECT lid,pid FROM lx_shopping_like WHERE uid = $uid AND is_like='1'";
		$result = mysqli_query($conn,$sql);
		$like = mysqli_fetch_all($result,1);
		if(!$like){
			$like = 0;
		}
		if(count($data)!==0){
			$output = [
        		"code"=>1,
				"data"=>$data,
				"like"=>$like
        	];
        	echo json_encode($output);
		}else{
			echo '{"code":-1,"msg":"购物车无商品"}';
		}
	}else{
		echo '{"code":-2,"msg":"请登陆"}';
	}
?>