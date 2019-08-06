<?php
    //data/user/changPwd.php
    require_once("../init.php");
    session_start();
    @$uid = $_SESSION["uid"];
    @$oldPwd = $_REQUEST["oldPwd"];
    @$pwd = $_REQUEST["pwd"];
	$upwdReg = '/^[a-zA-Z][a-zA-Z0-9_.-]{7,19}$/';
    if($uid!==null){
        if($oldPwd===null||$pwd===null){
            echo '{"code":-5,"msg":"原始密码或新密码为空"}';
            exit;
        }
        if(!preg_match($upwdReg,$oldPwd)){
            echo '{"code":-4,"msg":"原始密码格式不正确"}';
            exit;
        }
        if(!preg_match($upwdReg,$pwd)){
            echo '{"code":-3,"msg":"新密码格式不正确"}';
            exit;
        }
        $sql = "SELECT uid FROM lx_user WHERE uid = $uid AND BINARY upwd = md5('$oldPwd')";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        if($row['uid']!=$uid){
            echo '{"code":-2,"msg":"原始密码不正确"}';
            exit;
        }
        $sql = "UPDATE lx_user SET upwd = md5('$pwd') WHERE uid = $uid AND BINARY upwd = md5('$oldPwd')";
        mysqli_query($conn,$sql);
        $data = mysqli_affected_rows($conn);
        if($data>0){
            echo '{"code":1,"msg":"修改成功"}';
        }else{
            echo '{"code":-1,"msg":"修改失败"}';
        }
    }else{
        echo '{"code":-6,"msg":"请登录后尝试"}';
    }
?>