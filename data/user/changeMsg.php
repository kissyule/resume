<?php
    //data/user/changeMsg.php
	require_once('../init.php');
	session_start();
    @$uid = $_SESSION['uid'];
    @$user_name = $_REQUEST["user_name"];
    @$gender = $_REQUEST["gender"];
    @$uname = $_REQUEST["uname"];
    @$birthday = $_REQUEST["birthday"];
    @$home = $_REQUEST["home"];
    if($uid!==null){
        $sql = "UPDATE lx_user SET uname = '$uname', user_name = '$user_name', birthday = $birthday, home = '$home', gender = '$gender' WHERE uid = $uid";
        mysqli_query($conn,$sql);
        $data = mysqli_affected_rows($conn);
        if($data===1){
            echo '{"code":1,"msg":"修改成功"}';
        }else{
            echo '{"code":-1,"msg":"修改失败"}';
        }
    }else{
        echo '{"code":-2,"msg":"请登录"}';
    }
?>