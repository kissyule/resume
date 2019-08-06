<?php
	//data/product/product_detail.php
	require_once("../init.php");
	session_start();
	@$uid = $_SESSION["uid"];
	@$pid = $_REQUEST["pid"];
	$pidReg = '/^[0-9]{1,5}$/';
	if(!preg_match($pidReg,$pid)){
        echo '{"code":-4,"msg":"商品编号格式不正确"}';
        exit;
    }
	$sql = "SELECT category FROM lx_product WHERE pid = $pid";
	$result = mysqli_query($conn,$sql);
	$data = mysqli_fetch_row($result)[0];
	$key = substr($data,0,4);
	$sql = "SELECT pid,subtitle FROM lx_product WHERE category LIKE '$key%'";
	$result = mysqli_query($conn,$sql);
	$subtitles = mysqli_fetch_all($result,1);
	$sql = "SELECT pid,category,title,subtitle,price,promise,service,cpu,dos,screen,memory,disk,video_card,cd_drive,inter_face,network,multi_media,input_device,power,machine,software,service_all,images,detail FROM lx_product WHERE pid = $pid";
	$result = mysqli_query($conn,$sql);
	$data = mysqli_fetch_assoc($result);
	$like = 0;
	if($uid!==null){
		$sql = "SELECT lid FROM lx_shopping_like WHERE uid = $uid AND pid = $pid AND is_like='1'";
		$result = mysqli_query($conn,$sql);
		$like = mysqli_fetch_row($result);
		if($like){
			$like = 1;
		}else{
			$like = 0;
		}
	}
	if($data){
		$output = [
			"code"=>1,
			"data"=>$data,
			"subtitles"=>$subtitles,
			"like"=>$like
		];
		echo json_encode($output);
	}else{
		echo '{"code":-1,"msg":"查询失败"}';
	}
?>