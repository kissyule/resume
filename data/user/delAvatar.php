<?php
    //data/user/delAvatar.php
    require_once("../init.php");
    @$image = $_REQUEST["image"];
    if(!strpos($image,"/")&&$image!==null){
        $image = "../../uploads/".$image;
        if(file_exists($image)){
            unlink($image);
            echo '{"code":1,"msg":"删除成功"}';
        }else{
            echo '{"code":-1,"msg":"未找到文件"}';
        }
    }else{
        echo '{"code":-2,"msg":"文件名错误"}';
    }
?>