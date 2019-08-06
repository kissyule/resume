<?php
    require_once("../init.php");
    $picSize = $_FILES['avatar']['size']/1000;
    $picName = $_FILES['avatar']['name'];
    if($picSize>2048*1024){
        echo '{"code":-2,"msg":"图片大小不能超过2MB"}';
        exit;
    }
    $picTmp = $_FILES['avatar']['tmp_name'];
    $filename = "../../uploads/".time().rand(1,9999).strrchr($picName,'.');
    if(move_uploaded_file($picTmp, $filename)){
        $output=[
            "code"=>1,
            "url"=>$filename
        ];
        echo json_encode($output);
    }else{
        echo '{"code":-1,"msg":"上传失败"}'; 
    }
?>