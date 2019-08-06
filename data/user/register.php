<?php
    //data/user/register.php
    require_once('../init.php');
    @$phone = $_REQUEST['phone'];
    @$email = $_REQUEST['email'];
    @$upwd = $_REQUEST['upwd'];
    $emailReg = '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
    $phoneReg = '/^1[3|4|5|7|8][0-9]{9}$/';
    $upwdReg = '/^[a-zA-Z][a-zA-Z0-9_.-]{7,19}$/';
    if($phone&&$email&&$upwd){
        if(!preg_match($upwdReg,$upwd)){
            echo '{"code":-4,"msg":"密码格式不正确"}';
            exit;
        }
        if(!preg_match($emailReg,$email)){
        	echo '{"code":-4,"msg":"邮箱格式不正确"}';
        	exit;
        }
        if(!preg_match($phoneReg,$phone)){
        	echo '{"code":-4,"msg":"手机号格式不正确"}';
        	exit;
        }
        $sql = "SELECT uid FROM lx_user WHERE phone = '$phone' or email = '$email'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_fetch_row($result)){
            echo '{"code":-3,"msg":"手机号或邮箱已被注册"}';
            exit;
        }
        $sql = "INSERT INTO lx_user(uid,uname,phone,email,upwd,registrationTime) VALUES(null,'$phone','$phone','$email',md5('$upwd'),now())";
        mysqli_query($conn,$sql);
        $result = mysqli_affected_rows($conn);
        if($result===1){
            echo '{"code":1,"msg":"注册成功"}';
        }else{
            echo '{"code":-1,"msg":"注册失败"}';
        }
    }else{
        echo '{"code":-2,"msg":"注册信息不全"}';
    }
?>