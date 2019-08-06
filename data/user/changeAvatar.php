<?php
    require_once("../init.php");
    //header('Content-Type: image/png');
    session_start();
    @$uid = $_SESSION["uid"];
    if($uid!==null){
        @$imageName = $_REQUEST["image"];
        @$oldImage = $_REQUEST["oImage"];
        @$x = $_REQUEST["x"];
        @$y = $_REQUEST["y"];
        @$height = $_REQUEST["height"];
        @$width = $_REQUEST["width"];
        if($imageName!==null&&$x>=0&&$y>=0&&$width>0&&$height>0){
            $imageType = strrchr($imageName,'.');
            if($imageType==".jpg"||$imageType==".jpeg"){
                $image = imagecreatefromjpeg("../../uploads/".$imageName);
            }else if($imageType==".png"){
                $image = imagecreatefrompng("../../uploads/".$imageName);
            }
            $newImage = imagecreatetruecolor(150,150);
            $color = imagecolorAllocate($newImage,255,255,255);
            imagefill($newImage,0,0,$color) ;
            if(imagecopyresampled($newImage,$image,0,0,$x,$y,150,150,$width,$height)){
                if(imagejpeg($newImage,"../../images/user/".$imageName)){
                    $isOk = true;  
                }else{  
                    $isOk = false;  
                }  
            }else{
                $isOk = false;
            }
            imagedestroy($newImage);
            imagedestroy($image);
            unlink("../../uploads/".$imageName);
            if($isOk){
                if($oldImage!=="images/header/user.png"&&file_exists('../../'.$oldImage)){
                    unlink('../../'.$oldImage);
                }
                $name = 'images/user/'.$imageName;
                $sql = "UPDATE lx_user SET avatar = '$name' WHERE uid = $uid";
                mysqli_query($conn,$sql);
                $data = mysqli_affected_rows($conn);
                if($data>0){
                    echo '{"code":1,"msg":"修改成功"}';
                }else{
                    echo '{"code":-1,"msg":"修改失败"}';
                }
            }else{
                echo '{"code":-1,"msg":"修改失败"}';
            }
        }else{
            if(file_exists("../../uploads/".$imageName)){
                unlink("../../uploads/".$imageName);
            }
            echo '{"code":-2,"msg":"图片信息为空"}';
        }
    }else{
        echo '{"code":-3,"msg":"请登录"}';
    }
    
?>