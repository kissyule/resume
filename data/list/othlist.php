<?php
//data/list/othlist.php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from mi_oth_family";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));