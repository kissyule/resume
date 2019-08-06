<?php
//data/category/01_category_list.php
header("Content-Type:application/json");
require_once("../init.php");
$sql0 = "SELECT fname FROM mi_family";
$result = mysqli_query($conn,$sql0);
$row0 = mysqli_fetch_all($result,1);

$sql1 = "SELECT n.name,n.fid,n.apid,p.xs,p.sm FROM mi_product n,mi_product_pic p WHERE n.apid=p.apid AND n.fid=p.fid";
$result = mysqli_query($conn,$sql1);
$row1 = mysqli_fetch_all($result,1);
$data=[
    $row0,
    $row1
];
echo json_encode($data);
