<?php
    //data/user/personal.php
	require_once('../init.php');
	session_start();
    @$uid = $_SESSION['uid'];
    if($uid!==null){
        $sql = "SELECT uid,uname,phone,email,upwd,avatar,user_name,gender,home,birthday FROM lx_user WHERE uid = $uid";
        $result = mysqli_query($conn,$sql);
        $data = mysqli_fetch_assoc($result);
        if($data){
            $output = [
                "code"=>1,
                "data"=>$data
            ];
            echo json_encode($output);
        }else{
            echo '{"code":-1,"msg":"查询失败"}';
        }
    }else{
        echo '{"code":-2,"msg":"请登录"}';
    }
?>