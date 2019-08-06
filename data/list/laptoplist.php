<?php
//data/list/laptoplist.php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from mi_laptop_family";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));