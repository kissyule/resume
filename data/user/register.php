<?php
session_start();
require("../init.php");
$uname=$_REQUEST["uname"];
$sql="SELECT uid FROM mi_user WHERE phone=$uname";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);

if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
if($row!=0){
   echo ('{"code":-1,"msg":"电话号码已被使用"}');
}else{
   echo ('{"code":1,"msg":"可使用"}');
}
?>