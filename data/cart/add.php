<?php
/**
* 添加到购物车
*/
require_once('../init.php');
@$pid = $_REQUEST['pid'] or die('{"code":401,"msg":"lid required"}');
@$buyCount = $_REQUEST['buyCount'] or die('{"code":402,"msg":"buyCount required"}');

session_start();
if(! @$_SESSION['uid']){
  $_SESSION['pageToJump'] = 'cart.html';
  $_SESSION['toBuyPid'] = $pid;
  $_SESSION['toBuyApid'] = $apid;
  $_SESSION['toBuyFid'] = $fid;

  $_SESSION['toBuyCount'] = $buyCount;
  die('{"code":300, "msg":"login required"}');
}
$sql = "SELECT iid FROM mi_shoppingcart_item WHERE uid=$_SESSION[uid] AND pid=$pid";
$result = mysqli_query($conn, $sql);
if( mysqli_fetch_row($result) ){
  $sql = "UPDATE mi_shoppingcart_item SET count=count+1 WHERE uid=$_SESSION[uid] AND pid=$pid";
}else {
  $sql = "INSERT INTO mi_shoppingcart_item VALUES(NULL, $_SESSION[uid], $pid, $apid,$fid,$buyCount, false)";
}
$result = mysqli_query($conn, $sql);
if($result){
  echo '{"code":200, "msg":"add succ"}';
}else {
  echo '{"code":500, "msg":"add err"}';
}
