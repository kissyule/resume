<?php
/*项目初始化页面，用于声明其他页面都需要的变量或函数，可以声明在一个公共文件中，如init.php。所有其他页面都声明包含此页面即可*/
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Origin:http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
$conn = mysqli_connect("127.0.0.1","root","","mi",3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);