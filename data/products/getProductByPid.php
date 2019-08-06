<?php
	//data/products/getProductByLid.php
	header("Content-Type:application/json");
	require_once("../init.php");
	@$pid=$_REQUEST["pid"];
	$output=[];
	if($pid){
		$sql="SELECT * FROM `mi_phone_detail`where pid=$pid";
		$result=mysqli_query($conn,$sql);
		$product=(mysqli_fetch_all($result,1)[0]);//在mi_phone_product表中查询到对应pid的商品信息添加到数组中
		$output["product"]=$product;
		$fid=$product["fid"];
		$sql="SELECT fid,spec FROM `mi_phone_detail`where fid=$fid";
		$result=mysqli_query($conn,$sql);
		$output["specs"]=mysqli_fetch_all($result,1);//查询出商品特性添加到数组中
		$sql="SELECT * FROM `mi_product_pic`where pid=$pid";
		$result=mysqli_query($conn,$sql);
		$output["imgs"]=mysqli_fetch_all($result,1);//在`mi_product_pic表中查询到对应商品的图片信息添加到数组中
	}echo json_encode($output);
?>