<?php
//data/cart/list.php
require_once("../init.php");
session_start();
@$uid=$_SESSION['uid'];

if(! @$_SESSION['uid']){
  $_SESSION['pageToJump'] = 'cart.html';
  die('{"code":300, "msg":"login required"}');
}

$sql =" SELECT c.iid,c.uid,c.fid,c.pid,c.apid,c.count,c.is_checked, ";
$sql.=" p.fid,p.pid,p.apid,p.sm, ";
$sql.=" d.pid,d.pid,d.apid,d.title,d.nprice,d.pname,d.subtitle,d.spec,d.memory,d.video_memory,d.color,d.fuselage,d.insure_price ";
$sql.=" FROM mi_shoppingcart_item AS c ";
$sql.=" INNER JOIN	mi_product_pic AS p ON c.apid=p.apid AND c.pid=p.pid AND c.fid=p.fid ";
$sql.=" INNER JOIN	mi_product_detail AS d ON c.apid=d.apid AND c.pid=d.pid AND c.fid=d.fid ";
$sql.=" WHERE c.uid=$uid";
if(mysqli_error($conn)){
    echo mysqli_error($conn);
}
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,1);

$output = [
  'code'=>200,
  'data'=>$list
];
echo json_encode($output);