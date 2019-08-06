<?php
    //data/product/shopping_like.php
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
        $sql = "SELECT lid FROM lx_shopping_like WHERE uid = $uid AND pid = $pid";
        $result = mysqli_query($conn,$sql);
        $data = mysqli_fetch_row($result);
        if($data){
            $sql = "UPDATE lx_shopping_like SET is_like='1' WHERE lid = $data[0]";
        }else{
            $sql = "INSERT INTO lx_shopping_like VALUES(null,$uid,$pid,'1')";
        }
        mysqli_query($conn,$sql);
        $data = mysqli_affected_rows($conn);
        if($data!==0){
            echo '{"code":1,"msg":"添加成功"}';
        }else{
            echo '{"code":-1,"msg":"添加失败"}';
        }
    }else{
        echo '{"code":-2,"msg":"请登录"}';
    }
?>