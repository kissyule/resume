<?php
    //data/product/del_shopping_like.php
    require_once("../init.php");
    session_start();
    @$uid = $_SESSION["uid"];
    @$pid = $_REQUEST["pid"];
    $pidReg = '/^[0-9]{1,5}$/';
	if(!preg_match($pidReg,$pid)){
        echo '{"code":-3,"msg":"商品编号格式不正确"}';
        exit;
    }
    if($uid!==null){
        $sql = "UPDATE lx_shopping_like SET is_like='0' WHERE uid = $uid AND pid = $pid";
        mysqli_query($conn,$sql);
        $data = mysqli_affected_rows($conn);
        if($data>0){
            echo '{"code":1,"msg":"修改成功"}';
        }else{
            echo '{"code":-1,"msg":"修改失败"}';
        }
    }else{
        echo '{"code":-2,"msg":"请登录"}';
    }
?>