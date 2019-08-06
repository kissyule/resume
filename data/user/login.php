<?php
session_start();
require("../init.php");
$uname=$_REQUEST["uname"];
$upwd=$_REQUEST["upwd"];

$uPattern='/(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8]\d{9}$)/';
if(!preg_match($uPattern,$uname)){
   echo '{"code":-2,"msg":"用户名格式不正确"}';
   exit;
}
$pPattern='/^[a-zA-Z0-9]{6,12}$/';
if(!preg_match($pPattern,$upwd)){
   echo '{"code":-2,"msg":"密码格式不正确"}';
   exit;
}
$email='/^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/';
$phone='/^1[3|4|5|8]\d{9}$/';
if(preg_match($email,$uname)){
    $sql="SELECT uid FROM mi_user WHERE email='$uname' AND";
    $sql.=" upwd=$upwd";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
}else if(preg_match($phone,$uname)){
    $sql="SELECT uid FROM mi_user WHERE phone='$uname' AND upwd=$upwd";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
}else{
   echo '{"code":-1,"msg":"登录失败"}';
}
$_SESSION['uid']=$row[0];

if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
if($row!=0){
   echo '{"code":1,"msg":"登录成功"}';
}else{
   echo '{"code":-1,"msg":"登录失败"}';
}
?>