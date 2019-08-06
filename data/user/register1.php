<?php
session_start();
require("../init.php");
$uname=$_REQUEST["uname"];
$upwd=$_REQUEST["upwd"];
$sql="INSERT INTO mi_user (uid,uname,upwd,email,phone,avatar,user_name,gender)
    VALUES(NULL,'','$upwd','','$uname', NULL, NULL, NULL);";
$result=mysqli_query($conn,$sql);

if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
echo '{"code":1,"msg":"注册成功"}';
?>