$(()=>{
    const unameReg = /^[a-zA-Z0-9\-_\u4e00-\u9fa5]{4,20}$/,
        user_nameReg = /^([a-zA-Z·]{4,20})|([\u4e00-\u9fa5]{2,10})$/,
        upwdReg = /^[a-zA-Z][a-zA-Z0-9_.-]{7,19}$/
    let HEIGHT = 0,
        WIDTH = 0,
        imageHeight = 0,
        imageWidth = 0,
        LENGTH = 0,
        viewTop = 0,
        viewLeft = 0,
        lengthChange = 0,
        viewDTop = 0,
        viewDLeft = 0,
        backX = 0,
        backY= 0,
        X = 0,
        Y = 0,
        XMove = 0,
        YMove = 0,
        sthMove = "",
        avatarCanMove = false,
        avatarCanUp = false,
        avatarCanLeft = false,
        tfMove = false,
        trMove = false,
        bfMove = false,
        brMove = false,
        clickMove = false
    $.ajax({
        type:"GET",
        url:"data/user/isLogin.php",
        xhrFields:{withCredentials:true}
    }).then(output=>{
        if(output.ok!==1){
            location.href = "index.html"
        }
        personalLoad()
        $(".user-lf .user-list [data-num]").on("click","a",e=>{
            e.preventDefault()
            let $tar = $(e.target)
            if($tar.parent().is(":not(.active)")){
                let aParent = $tar.parent(),
                    image = $(".personal").find("#newAvatar")
                if(image!==undefined){
                    image = image.attr("src")
                    delAvatar(image)
                }
                $(".user-lf .user-list [data-num]").removeClass("active")
                aParent.addClass("active")
                if(aParent.data("num")===1){
                    personalLoad()
                }else if(aParent.data("num")===2){
                    avatarLoad()
                }else if(aParent.data("num")===3){
                    passwordLoad()
                }else if(aParent.data("num")===4){
                    likeLoad()
                }
            }
        })
        $(".user-rt>div").on("click",".msg-change>.submit",e=>{ //个人信息点击表单验证
            let uname = $("[data-msg=uname]").val(),
                gender = $("[name=gender]:checked").val(),
                birthday = new Date($("[data-msg=birthday]").val()),
                user_name = $("[data-msg=user_name]").val(),
                province = $("#province").val(),
                city = $("#city").val(),
                area = $("#area").val(),
                home = ""
                canUname = false,
                canGender = false,
                canBirthday = false,
                canUserName = false,
                canHome = false
            if(uname!==undefined&&uname!==""&&unameReg.test(uname)){
                canUname = true
            }else{
                $("[data-msg=uname]").css("borderColor","red")
            }
            if(gender!==undefined&&gender!==""){
                canGender = true
            }
            if(user_name!==undefined&&user_name!==""&&user_nameReg.test(user_name)){
                canUserName = true
            }else{
                $("[data-msg=user_name]").css("borderColor","red")
            }
            if(birthday!=="Invalid Date" && !(birthday !== birthday)){
                birthday = parseInt(birthday.getTime())
                canBirthday = true
            }else{
                birthday = 0
                $("[data-msg=birthday]").css("borderColor","red")
            }
            if($("#province").val()!=="0"&&$("#city").val()!=="0"&&$("#area").val()!=="0"){
                home = `${province}/${city}/${area}`
                canHome = true
            }else{
                if($("#province").val()==="0"){
                    $("#province").css("borderColor","red")
                }
                if($("#city").val()==="0"){
                    $("#city").css("borderColor","red")
                }
                if($("#area").val()==="0"){
                    $("#area").css("borderColor","red")
                }
            }
            if(canUname&&canUserName&&canGender&&canBirthday&&canHome){
                //发送请求修改数据
                console.log(uname,gender,birthday,user_name,home)
                $.ajax({
                    type:"POST",
                    url:"data/user/changeMsg.php",
                    data:{uname,gender,user_name,birthday,home},
                    xhrFields:{withCredentials:true}
                }).then(output=>{
                    if(output.code>0){
                        alert(output.msg)
                        personalLoad()
                    }
                })
            }
        }).on("focus","[data-msg],#province,#city,#area",e=>{ //个人信息页input获得焦点事件
            let $tar = $(e.target)
            $tar.css("borderColor","#d2d2d2")
        }).on("click",".msg-avatar .old-avatar",e=>{ //个人信息页跳转修改头像页
            avatarLoad()
        }).on("mousedown",".newAvatar-box>.newAvatar-black>.view-up",e=>{ //修改头像页图片鼠标点下事件
            viewTop = viewDTop = e.offsetY
            viewLeft = viewDLeft = e.offsetX
            X = viewDLeft - parseFloat($(".newAvatar-box .newAvatar-black>.view-box").css("left"))
            Y = viewDTop - parseFloat($(".newAvatar-box .newAvatar-black>.view-box").css("top"))
            if(tfMove||trMove||bfMove||brMove){
                if(tfMove){
                    sthMove = "tf"
                }else if(trMove){
                    sthMove = "tr"
                }else if(bfMove){
                    sthMove = "bf"
                }else if(brMove){
                    sthMove = "br"
                }
                clickMove = true
            }else{
                avatarCanMove = true
            }
        }).on("mouseup",".newAvatar-box>.newAvatar-black>.view-up",e=>{ //修改头像页图片鼠标松起事件
            avatarCanMove = false
            clickMove = false
            sthMove = ""
        }).on("mousemove",".newAvatar-box .newAvatar-black>.view-up",e=>{ //修改头像页图片鼠标移动
            let $tar = $(e.target),
                tar = $(".newAvatar-box>.newAvatar-black>.view-box")
            viewTop  = e.offsetY
            viewLeft = e.offsetX
            XMove = viewLeft - parseFloat(tar.css("left"))
            YMove = viewTop - parseFloat(tar.css("top"))
            if(parseFloat(tar.css("top"))<=viewTop&&(parseFloat(tar.css("top"))+LENGTH)>=viewTop){
                avatarCanUp = true
            }else{
                avatarCanUp = false
            }
            if(parseFloat(tar.css("left"))<=viewLeft&&(parseFloat(tar.css("left"))+LENGTH)>=viewLeft){
                avatarCanLeft = true
            }else{
                avatarCanLeft = false
            }
            if(avatarCanLeft&&avatarCanUp&&avatarCanMove){
                $tar.css("cursor","move")
                let thisX = 0,thisY = 0
                thisX = viewLeft - X
                thisY = viewTop - Y
                if(thisX<=0){
                    thisX = 0
                }else if((thisX+LENGTH)>=WIDTH){
                    thisX = WIDTH-LENGTH
                }
                if(thisY<=0){
                    thisY = 0
                }else if((thisY+LENGTH)>=HEIGHT){
                    thisY = HEIGHT-LENGTH
                }
                backX = -thisX
                backY = -thisY
                tar.css({
                    "top":thisY,
                    "left":thisX,
                    "backgroundPositionX":backX,
                    "backgroundPositionY":backY
                })
                $("#avatarMd").css({
                    "top":backY/LENGTH*100,
                    "left":backX/LENGTH*100
                })
                $("#avatarSm").css({
                    "top":backY/LENGTH*50,
                    "left":backX/LENGTH*50
                })
            }
            if((XMove>=-2&&XMove<=2)&&(YMove>=-2&&YMove<=2)){
                $tar.css("cursor","nw-resize")
                tfMove = true
            }else if((XMove>=LENGTH-2&&XMove<=LENGTH+2)&&(YMove>=-2&&YMove<=2)){
                $tar.css("cursor","sw-resize")
                trMove = true
            }else if((XMove>=-2&&XMove<=2)&&(YMove>=LENGTH-2&&YMove<=LENGTH+2)){
                $tar.css("cursor","sw-resize")
                bfMove = true
            }else if((XMove>=LENGTH-2&&XMove<=LENGTH+2)&&(YMove>=LENGTH-2&&YMove<=LENGTH+2)){
                $tar.css("cursor","nw-resize")
                brMove = true
            }else if(avatarCanLeft&&avatarCanUp){
                $tar.css("cursor","move")
                tfMove = trMove = bfMove = brMove = false
            }else{
                $tar.css("cursor","crosshair")
                tfMove = trMove = bfMove = brMove = false
            }
            if(clickMove){
                let xChange = viewDLeft-viewLeft,
                    yChange = viewDTop-viewTop,
                    changeOnce = lengthChange,
                    xGo = 0,
                    yGo = 0
                if(sthMove==="tf"){
                    lengthChange = xChange
                }else if(sthMove==="tr"){
                    lengthChange = yChange
                }else if(sthMove==="bf"){
                    lengthChange = -yChange
                }else if(sthMove==="br"){
                    lengthChange = -xChange
                }
                changeOnce = lengthChange-changeOnce
                LENGTH =LENGTH + changeOnce
                backX += changeOnce
                backY += changeOnce
                if((parseFloat(tar.css("left"))-changeOnce)<=0){
                    xGo = 0
                }else if((parseFloat(tar.css("left"))-changeOnce)>=(WIDTH-LENGTH)){
                    xGo = WIDTH -LENGTH
                }else{
                    xGo = parseFloat(tar.css("left"))-changeOnce
                }
                if((parseFloat(tar.css("top"))-changeOnce)<=0){
                    yGo = 0
                }else if((parseFloat(tar.css("top"))-changeOnce)>=(HEIGHT-LENGTH)){
                    yGo = HEIGHT -LENGTH
                }else{
                    yGo = parseFloat(tar.css("top"))-changeOnce
                }
                if(sthMove === "tf"){
                    tar.css({
                        "height":LENGTH,
                        "width":LENGTH,
                        "left":xGo,
                        "top":yGo,
                        "backgroundPositionX":backX,
                        "backgroundPositionY":backY
                    })
                    $(".view-box>.lf").css("height",LENGTH)
                    $(".view-box>.rt").css("height",LENGTH)
                    $(".view-box>.tp").css("width",LENGTH)
                    $(".view-box>.bt").css("width",LENGTH)
                    $("#avatarMd").css({
                        "width":WIDTH/LENGTH*100,
                        "height":HEIGHT/LENGTH*100,
                        "top":backY/LENGTH*100,
                        "left":backX/LENGTH*100
                    })
                    $("#avatarSm").css({
                        "width":WIDTH/LENGTH*50,
                        "height":HEIGHT/LENGTH*50,
                        "top":backY/LENGTH*50,
                        "left":backX/LENGTH*50
                    })
                }else if(sthMove ==="tr"){
                    tar.css({
                        "height":LENGTH,
                        "width":LENGTH,
                        "top":yGo,
                        "backgroundPositionY":backY
                    })
                    $(".view-box>.lf").css("height",LENGTH)
                    $(".view-box>.rt").css("height",LENGTH)
                    $(".view-box>.tp").css("width",LENGTH)
                    $(".view-box>.bt").css("width",LENGTH)
                    $("#avatarMd").css({
                        "width":WIDTH/LENGTH*100,
                        "height":HEIGHT/LENGTH*100,
                        "top":backY/LENGTH*100
                    })
                    $("#avatarSm").css({
                        "width":WIDTH/LENGTH*50,
                        "height":HEIGHT/LENGTH*50,
                        "top":backY/LENGTH*50
                    })
                }else if(sthMove ==="bf"){
                    tar.css({
                        "height":LENGTH,
                        "width":LENGTH,
                        "left":xGo,
                        "backgroundPositionX":backX
                    })
                    $(".view-box>.lf").css("height",LENGTH)
                    $(".view-box>.rt").css("height",LENGTH)
                    $(".view-box>.tp").css("width",LENGTH)
                    $(".view-box>.bt").css("width",LENGTH)
                    $("#avatarMd").css({
                        "width":WIDTH/LENGTH*100,
                        "height":HEIGHT/LENGTH*100,
                        "left":backX/LENGTH*100
                    })
                    $("#avatarSm").css({
                        "width":WIDTH/LENGTH*50,
                        "height":HEIGHT/LENGTH*50,
                        "left":backX/LENGTH*50
                    })
                }else if(sthMove==="br"){
                    tar.css({
                        "height":LENGTH,
                        "width":LENGTH
                    })
                    $(".view-box>.lf").css("height",LENGTH)
                    $(".view-box>.rt").css("height",LENGTH)
                    $(".view-box>.tp").css("width",LENGTH)
                    $(".view-box>.bt").css("width",LENGTH)
                    $("#avatarMd").css({
                        "width":WIDTH/LENGTH*100,
                        "height":HEIGHT/LENGTH*100
                    })
                    $("#avatarSm").css({
                        "width":WIDTH/LENGTH*50,
                        "height":HEIGHT/LENGTH*50
                    })
                }
            }else{
                lengthChange = 0
            }
        }).on("click",".uphead-box>.avatar-click>a",e=>{ //修改头像页保存或取消按钮
            let $tar = $(e.target),
                image = $("#newAvatar").attr("src")
            if(!$tar.is(".unChecked")){
                if($tar.is("#cancelImg")){
                    delAvatar(image)
                }else if($tar.is("#uploadImg")){
                    if(image.match(/.jpg|.png/i)){
                        $("#newAvatar").attr("src","")
                        $("#avatarMd").attr("src","")
                        $("#avatarSm").attr("src","")
                        $(".newAvatar-box").removeClass("out")
                        image=image.slice(image.lastIndexOf("/")+1)
                        let Y = parseFloat($(".newAvatar-box .view-box").css("top")),
                            X = parseFloat($(".newAvatar-box .view-box").css("left")), 
                            Width = parseFloat($(".newAvatar-box .view-box").css("width")), 
                            Height = parseFloat($(".newAvatar-box .view-box").css("height")),
                            scale = (imageWidth/WIDTH+imageHeight/HEIGHT)/2
                        $.ajax({
                            type:"GET",
                            url:"data/user/changeAvatar.php",
                            data:{
                                x:X*scale,
                                y:Y*scale,
                                width:Width*scale,
                                height:Height*scale,
                                image:image,
                                oImage:$(".user-rt>.title").data("avatar")
                            },
                            xhrFields:{withCredentials:true}
                        }).then(output=>{
                            if(output.code<0){
                                alert(output.msg+"! 请重新尝试。")
                            }else{
                                alert("修改成功")
                                location.reload(true)
                            }
                        })
                    }else{
                        alert("仅支持jpg与png格式的图片")
                    }
                }
            }
        }).on("click",".pw-body .pass-btn",e=>{ //修改密码页点击确定按钮
            let $tar = $(e.target),
                forms = $tar.parent().parent(),
                oldPwd = forms.find("[name=oldPassword]").val()
                pwd = forms.find("[name=upwd]").val()
                pwd2 = forms.find("[name=upwd2]").val(),
                msg = ''
            if(!upwdReg.test(oldPwd)||oldPwd===""){
                forms.find("[name=oldPassword]").css("borderColor","red")
            }
            if(!upwdReg.test(pwd)||pwd===""||oldPwd===pwd){
                forms.find("[name=upwd]").css("borderColor","red")
            }
            if(!upwdReg.test(pwd2)||pwd2===""||pwd!==pwd2){
                forms.find("[name=upwd2]").css("borderColor","red")
            }
            if(oldPwd===""){
                msg = "原始密码不能为空！"
            }else if(!upwdReg.test(oldPwd)){
                msg = "原始密码格式不正确！"
            }else if(pwd===""){
                msg = "新密码不能为空！"
            }else if(!upwdReg.test(pwd)){
                msg = "新密码格式不正确！"
            }else if(oldPwd===pwd){
                msg = "新密码与原始密码不能相同！"
            }else if(pwd2===""){
                msg = "确认密码不能为空！"
            }else if(!upwdReg.test(pwd2)){
                msg = "确认密码格式不正确！"
            }else if(pwd!==pwd2){
                msg = "确认密码与新密码不相同！"
            }else{
                msg = ""
            }
            forms.find(".click-msg").html(msg)
            if(msg===""){
                $.ajax({
                    type:"POST",
                    url:"data/user/changPwd.php",
                    data:{oldPwd,pwd},
                    xhrFields:{withCredentials:true}
                }).then(output=>{
                    console.log(output)
                    if(output.code>0){
                        alert(output.msg+"，请重新登录！")
                        $.ajax({
                            type:"GET",
                            url:"data/user/logout.php",
                            xhrFields:{withCredentials:true}
                        }).then(()=>{
                            location.reload(true)
                        })
                    }else{
                        if(output.code===-2||output.code===-4){
                            forms.find("[name=oldPassword]").css("borderColor","red")
                        }else if(output.code===-3){
                            forms.find("[name=upwd]").css("borderColor","red")
                        }
                        forms.find(".click-msg").html(output.msg)
                    }
                })
            }
        }).on("focus",".pw-body [name]",e=>{ //修改密码页input获得焦点事件
            let $tar = $(e.target)
            $tar.css("borderColor","#d2d2d2")
        }).on("click",".del-like",e=>{
            let $tar = $(e.target),
                pid = $tar.parent().data("pid")
                console.log(pid)
                $.ajax({
                    type:"GET",
                    url:"data/product/del_shopping_like.php",
                    data:{pid},
                    xhrFields:{withCredentials:true}
                }).then(output=>{
                    if(output.code>0){
                        likeLoad()
                    }else{
                        console.log(output.msg)
                    }
                })
        })

        //页面关闭时删除上传的图片
        window.addEventListener("beforeunload", function (e) {
            let image = $(".personal").find("#newAvatar")
            if(image!==undefined){
                image = image.attr("src")
                delAvatar(image)
            }
        });
    })
    function delAvatar(image){ //删除本地图片
        if(image!==undefined){
            if(image.match(/.jpg|.png/i)){
                $("#newAvatar").attr("src","")
                $("#avatarMd").attr("src","")
                $("#avatarSm").attr("src","")
                $(".newAvatar-box").removeClass("out")
                image=image.slice(image.lastIndexOf("/")+1)
                console.log(image)
                $.ajax({
                    type:"GET",
                    url:"data/user/delAvatar.php",
                    data:{image},
                    xhrFields:{withCredentials:true}
                }).then(output=>{
                    if(output.code<0){
                        console.log(output.msg)
                    }
                })
            }
        }
    }
    //个人信息加载
    function personalLoad(){
        $.ajax({
            type:"GET",
            url:"personal.html",
            xhrFields:{withCredentials:true}
        }).then(output=>{
            $('.user-rt>div').html(output)
            $(".user-rt>.title").html("个人信息")
            $("[data-num]").removeClass("active")
            $("[data-num=1]").addClass("active")
            $("title").html("个人信息")
            $.ajax({
                type:"GET",
                url:"data/user/personal.php",
                xhrFields:{withCredentials:true}
            }).then(output=>{
                if(output.code<0){
                    console.log(output.msg)
                }else{
                    let data = output.data,
                        home = data.home.split("/")
                    $("[data-msg=phone]").html(data.phone)
                    $("[data-msg=uname]").val(data.uname)
                    $(".msg-avatar .old-avatar img").attr("src",data.avatar)
                    $(".user-rt>.title").data("avatar",data.avatar)
                    $(`[name=gender][value=${data.gender}]`).attr("checked",true)
                    if(data.birthday!=='0'){
                        let str = new Date(parseInt(data.birthday)).toLocaleDateString()
                        str = str.split("/")
                        str[1] = parseInt(str[1]) < 10 ? 0+str[1] :str[1]
                        str[2] = parseInt(str[2]) < 10 ? 0+str[2] :str[2]
                        str = str.join("-")
                        $("[data-msg=birthday]").val(str)
                    }
                    $("[data-msg=user_name]").val(data.user_name)
                    let province = ChinaCity.getProvince()
                    if((home[0]!=="0"&&home[1]!=="0"&&home[2]!=="0")){
                        for(let i in home){
                            home[i] = parseInt(home[i])-1
                        }
                        let city = ChinaCity.getCity(home[0]),
                            area = ChinaCity.getArea(home[0],home[1]),
                            provinceHtml = `<option value="0">请选择省份</option>`,
                            cityHtml = '<option value="0">请选择城市</option>',
                            areaHtml = '<option value="0">请选择区/县</option>'
                        for(let i in province){
                            if(parseInt(i)===home[0]){
                                provinceHtml += `<option value="${parseInt(i)+1}" selected>${province[i]}</option>`
                            }else{
                                provinceHtml += `<option value="${parseInt(i)+1}">${province[i]}</option>`
                            }
                        }
                        for(let i in city){
                            if(parseInt(i)===home[1]){
                                cityHtml += `<option value="${parseInt(i)+1}" selected>${city[i]}</option>`
                            }else{
                                cityHtml += `<option value="${parseInt(i)+1}">${city[i]}</option>`
                            }
                        }
                        for(let i in area){
                            if(parseInt(i)===home[2]){
                                areaHtml += `<option value="${parseInt(i)+1}" selected>${area[i]}</option>`
                            }else{
                                areaHtml += `<option value="${parseInt(i)+1}">${area[i]}</option>`
                            }
                        }
                        $("#province").html(provinceHtml)
                        $("#city").html(cityHtml)
                        $("#area").html(areaHtml)
                    }else{
                        let html = `<option value="0">请选择省份</option>`
                        for(let i in province){
                            html +=`<option value="${parseInt(i)+1}">${province[i]}</option>`
                        }
                        $("#province").html(html)
                    }
                    $("#province").change(e=>{
                        let $tar = $(e.target),
                            cityNum = parseInt($tar.val()),
                            htmlCity = '<option value="0">请选择城市</option>',
                            htmlArea = '<option value="0">请选择区/县</option>',
                            city = ''
                        if(cityNum!==0){
                            city = ChinaCity.getCity(cityNum-1)
                            for(let i in city){
                                htmlCity += `<option value="${parseInt(i)+1}">${city[i]}</option>`
                            }
                        }
                        $("#city").html(htmlCity)
                        $("#area").html(htmlArea)
                    })
                    $("#city").change(e=>{
                        let $tar = $(e.target),
                            areaNum = parseInt($tar.val()),
                            cityNum = parseInt($("#province").val()),
                            htmlArea = '<option value="0">请选择区/县</option>',
                            area = ''
                        if(cityNum!==0&&areaNum!==0){
                            area = ChinaCity.getArea(cityNum-1,areaNum-1)
                            for(let i in area){
                                htmlArea += `<option value="${parseInt(i)+1}">${area[i]}</option>`
                            }
                        }
                        $("#area").html(htmlArea)
                    })
                }
            })
        })
    }
    //头像页加载
    function avatarLoad(){
        $.ajax({
            type:"GET",
            url:"avatar.html",
            xhrFields:{withCredentials:true}
        }).then(output=>{
            $('.user-rt>div').html(output)
            $(".user-rt>.title").html("修改头像")
            $("[data-num]").removeClass("active")
            $("[data-num=2]").addClass("active")
            $("title").html("修改头像")
            $("#inputImage").change(e=>{
                let $tar = $(e.target)
                let image = $tar.val(),
                    form = document.getElementById("imgForm"),
                    fd = new FormData(form)
                if(image.match(/.jpg|.png/i)){
                    $.ajax({
                        url:'data/user/upload.php',
                        data:fd,
                        type:"POST",
                        contentType: false,
                        processData: false,
                        xhrFields:{withCredentials:true}
                    }).then(output=>{
                        console.log(output)
                        if(output.code>0){
                            $(".newAvatar-box").addClass("out")
                            let imageUrl = `uploads/${output.url.slice(output.url.lastIndexOf("/")+1)}`
                            $("#newAvatar").attr("src",imageUrl)
                            $("#avatarMd").attr("src",imageUrl)
                            $("#avatarSm").attr("src",imageUrl)
                        }else{
                            alert(output.msg)
                        }
                    })
                }else{
                    alert("仅支持jpg与png格式的图片")
                }
            })
            $("#newAvatar")[0].onload=function(e){
                imageHeight = this.naturalHeight
                imageWidth = this.naturalWidth
                let $tar = $(e.target),
                    HW = 325/460,
                    hw = imageHeight/imageWidth,
                    MARGINLEFT = 0,MARGINTOP = 0
                $("#uploadImg").removeClass("unChecked")
                $("#cancelImg").removeClass("unChecked")
                if(HW>hw){
                    HEIGHT = hw*460
                    WIDTH = 460
                    MARGINTOP = (325-hw*460)/2
                }else{
                    HEIGHT = 325
                    WIDTH = 1/hw*325
                    MARGINLEFT = (460-1/hw*325)/2
                }
                LENGTH = HEIGHT > WIDTH ? WIDTH*0.8 : HEIGHT*0.8
                $tar.css({
                    "width":WIDTH,
                    "height":HEIGHT,
                    "marginTop":MARGINTOP,
                    "marginLeft":MARGINLEFT
                })
                $(".newAvatar-box>.newAvatar-black").css({
                    "width":WIDTH,
                    "height":HEIGHT,
                    "top":MARGINTOP,
                    "left":MARGINLEFT
                })
                $(".newAvatar-box>.newAvatar-black>.view-up").css({
                    "width":WIDTH,
                    "height":HEIGHT
                })
                $(".newAvatar-box>.newAvatar-black>.view-box").css({
                    "width":LENGTH,
                    "height":LENGTH,
                    "top":(HEIGHT-LENGTH)/2,
                    "left":(WIDTH-LENGTH)/2,
                    "backgroundImage":`url(${$tar.attr("src")})`,
                    "backgroundPositionX":(LENGTH-WIDTH)/2,
                    "backgroundPositionY":(LENGTH-HEIGHT)/2,
                    "backgroundSize":WIDTH
                })
                backX = (LENGTH-WIDTH)/2
                backY = (LENGTH-HEIGHT)/2
                $("#avatarMd").css({
                    "width":WIDTH/LENGTH*100,
                    "height":HEIGHT/LENGTH*100,
                    "top":((LENGTH-HEIGHT)/2)/LENGTH*100,
                    "left":((LENGTH-WIDTH)/2)/LENGTH*100
                })
                $("#avatarSm").css({
                    "width":WIDTH/LENGTH*50,
                    "height":HEIGHT/LENGTH*50,
                    "top":((LENGTH-HEIGHT)/2)/LENGTH*50,
                    "left":((LENGTH-WIDTH)/2)/LENGTH*50
                })
                $(".view-box>.lf").css("height",LENGTH)
                $(".view-box>.rt").css("height",LENGTH)
                $(".view-box>.tp").css("width",LENGTH)
                $(".view-box>.bt").css("width",LENGTH)
            }
        })
    }
    //修改密码页面
    function passwordLoad(){
        $.ajax({
            type:"GET",
            url:"passworld.html",
            xhrFields:{withCredentials:true}
        }).then(output=>{
            $('.user-rt>div').html(output)
            $(".user-rt>.title").html("修改密码")
            $("[data-num]").removeClass("active")
            $("[data-num=3]").addClass("active")
            $("title").html("修改密码")
        })
    }
    function likeLoad(){
        $.ajax({
            type:"GET",
            url:"like.html",
            xhrFields:{withCredentials:true}
        }).then(output=>{
            $('.user-rt>div').html(output)
            $(".user-rt>.title").html("我的收藏")
            $("[data-num]").removeClass("active")
            $("[data-num=4]").addClass("active")
            $("title").html("我的收藏")
            $.ajax({
                type:"GET",
                url:"data/product/search_like.php",
                xhrFields:{withCredentials:true}
            }).then(output=>{
                if(output.code<0){
                    console.log(output.msg)
                }else{
                    let data = output.data,
                        html = ""
                    if(data.length>0){
                        $(".not-like").removeClass("out")
                        for(let msg of data){
                            html += `<li data-pid="${msg.pid}">
                                <a href="product_details.html?pid=${msg.pid}" title="${msg.title}">
                                    <img src="images/item/lg/${msg.images.split("/")[0]}" alt="">
                                    <h4>${msg.title}</h4>
                                    <p>价格<span>${parseFloat(msg.price).toFixed(2)}元</span></p>
                                    </a>
                                    <span class="del-like"></span>
                            </li>`
                        }
                        $(".like-body").html(html)
                    }else{
                        $(".not-like").addClass("out")
                    }
                }
            })
        })
    }
})