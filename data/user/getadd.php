<?php
//data/user/getadd.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="select address from mi_user where uid=$uid";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));
?>
