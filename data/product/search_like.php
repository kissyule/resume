<?php
    //data/product/search_like.php
    require_once("../init.php");
    session_start();
    @$uid = $_SESSION["uid"];
    if($uid!==null){
        $sql =  "SELECT x.pid,x.title,x.price,x.images,y.lid FROM lx_product AS x INNER JOIN lx_shopping_like AS y ON x.pid = y.pid WHERE uid= $uid AND is_like=1";
        $result = mysqli_query($conn,$sql);
        $data = mysqli_fetch_all($result,1);
        if($data!==null){
            $output = [
                "code"=>1,
                "msg"=>"查询成功",
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