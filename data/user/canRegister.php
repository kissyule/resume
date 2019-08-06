<?php
    //data/user/canRegister.php
    require_once('../init.php');
    @$phone = $_REQUEST['phone'];
    @$email = $_REQUEST['email'];
    $emailReg = '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
    $phoneReg = '/^1[3|4|5|7|8][0-9]{9}$/';
    if($phone||$email){
        if($phone){
            if(!preg_match($phoneReg,$phone)){
                echo '{"code":-3,"msg":"手机号格式不正确"}';
                exit;
            }
            $sql = "SELECT uid FROM lx_user WHERE phone='$phone'";
        }else if($email){
            if(!preg_match($emailReg,$email)){
                echo '{"code":-3,"msg":"邮箱格式不正确"}';
                exit;
            }
            $sql = "SELECT uid FROM lx_user WHERE email='$email'";
        }
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_row($result);
        if($row){
            if($phone){
                echo '{"code":-2,"msg":"手机号已被使用"}';
            }else if($email){
                echo '{"code":-2,"msg":"邮箱已被使用"}';
            }
        }else{
            echo '{"code":1,"msg":""}';
        }
    }else{
        echo '{"code":-1}';
    }
?>