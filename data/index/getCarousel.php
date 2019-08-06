<?php
//data/index/getCarousel.php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from mi_index_carousel";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,1);
echo json_encode($row);
