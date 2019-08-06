<?php
	//data/products/getProductsByKw.php
	header("Content-Type:application/json");
	require_once("../init.php");
	@$kw=$_REQUEST["kw"];
	$sql="select * ,(select md from mi_product_pic where pid=pid limit 1) as md from `mi_phone_product`";
	if($kw){
		//将$kw按空格切开为数组$kws
		$kws=explode(" ",$kw);
		for($i=0;$i<count($kws);$i++){//遍历$kws
			$kws[$i]=" title like '%$kws[$i]%' ";//将$kws中当前位置的关键词替换为title like '%...%'
		}
		$where=implode(" and ",$kws);//将$kws用" and "连接为一个条件字符串$where
		$sql.=" where $where "; //$sql=$sql." where ".$where
	}
	$result=mysqli_query($conn,$sql);
	$data=mysqli_fetch_all($result,1);
	$count=count($data);
	@$pageNo=$_REQUEST["pageNo"];
	if($pageNo==null)$pageNo=1;
	@$pageSize=$_REQUEST["pageSize"];
	if($pageSize==null)$pageSize=9;
	$sql.=" limit ".($pageNo-1)*$pageSize.",$pageSize ";
	$result=mysqli_query($conn,$sql);
	$data=mysqli_fetch_all($result,1);
	$pageCount=ceil(($count/$pageSize));
	$output=[
		"pageNo"=>$pageNo,
		"pageSize"=>$pageSize,
		"count"=>$count,
		"pageCount"=>$pageCount,
		"data"=>$data
	];
	echo json_encode($output);
?>