<?php
	//data/user/login.php
	require_once('../init.php');
	@$phone = $_REQUEST['phone'];
	@$email = $_REQUEST['email'];
	@$upwd = $_REQUEST['upwd'];
	$emailReg = '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/';
	$phoneReg = '/^1[3|4|5|7|8][0-9]{9}$/';
	$upwdReg = '/^[a-zA-Z][a-zA-Z0-9_.-]{7,19}$/';
	if($phone==null&&$email==null){
	    echo '{"code":-3,"msg":"手机号或邮箱为空"}';
	    exit;
	}
    if($upwd==null){
    	echo '{"code":-3,"msg":"密码为空"}';
        exit;
    }
	if(!preg_match($upwdReg,$upwd)){
        echo '{"code":-4,"msg":"密码格式不正确"}';
        exit;
    }
	if(($phone||$email)&&$upwd){
		if($phone){
			if(!preg_match($phoneReg,$phone)){
				echo '{"code":-4,"msg":"手机号格式不正确"}';
				exit;
			}
			$sql = "SELECT uid,phone FROM lx_user WHERE phone = '$phone' AND BINARY upwd = md5('$upwd')";
		}else{
			if(!preg_match($emailReg,$email)){
				echo '{"code":-4,"msg":"邮箱格式不正确"}';
				exit;
			}
			$sql = "SELECT uid,phone FROM lx_user WHERE email = '$email' AND BINARY upwd = md5('$upwd')";
		}
		$result = mysqli_query($conn,$sql);
		$row = mysqli_fetch_assoc($result);
		if($row){
			session_start();
			$_SESSION['uid'] = $row['uid'];
			$output = [
				'code'=>1,
				'msg'=>'登陆成功',
				'data'=>$row
			];
			echo json_encode($output);
		}else{
			if($phone){
				echo '{"code":-1,"msg":"手机号或密码错误"}';
			}else{
				echo '{"code":-2,"msg":"邮箱或密码错误"}';
			}
		}
	}
?>