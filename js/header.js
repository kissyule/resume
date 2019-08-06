$(() => {
	//正则表达式
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        phoneReg = /^1[3|4|5|7|8][0-9]{9}$/,
        upwdReg = /^[a-zA-Z][a-zA-Z0-9_.-]{7,19}$/
    let ok = 0
	$.ajax({
		type:"GET",
		url:"header.html",
		xhrFields:{withCredentials:true}
	}).then(html=>{
		$('#header').html(html)
        $.ajax({
	        type:"GET",
            url:"menu.html",
	        xhrFields:{withCredentials:true}
        }).then(html=>{
	        //判断当前页面是否为首页，并根据地址显示分类导航
            if($(".floor-all").length===0){
                $('.bottom-box>.bottom-in>ul>li:first-child').addClass('out')
                $('.bottom-box>.bottom-in>ul>li:first-child').append($(html))
            }else{
                $('.banner>.shop-block').append($(html))
            }
        })
        //logo切换
        logo()
        $(window).scroll(logo)
        //头部滚动新闻
		$.ajax({
			type:"GET",
			url:"http://176.233.2.71:5050/banner_sm",//"data/index/banner_sm.php"
			xhrFields:{withCredentials:true}
		}).then(output=>{
			let HEIGHT = 34, moved = 0, liLength = output.length, wait = 500, timer = null,allWait = wait + 1500, html = ''
			let newUl = $(".new-ul")
			for(let i=0;i<liLength;i++){
				html += `<li><a href="${output[i].href}">${output[i].title}</a></li>`
			}
			html += `<li><a href="${output[0].href}">${output[0].title}</a></li>`
			newUl.html(html)
			timer = setInterval(move, allWait)
			newUl.children().children().hover(() => {
				clearInterval(timer)
			}, () => {
				timer = setInterval(move, allWait)
			})
			//小轮播定时器移动方程
			function move() {
				moved++
				newUl.animate({
					top: -moved * HEIGHT
				}, wait, () => {
					if (moved >= liLength) {
						moved = 0
						newUl.css('top', 0)
					}
				})
			}
		})
        //个人页面鼠标移入事件
        $('.user-isLogin').mouseenter(e => {
            let $tar = $(e.target)
            if ($tar[0].nodeName == "IMG") {
                $tar = $tar.parent().parent()
            } else if ($tar[0].nodeName == "A") {
                $tar = $tar.parent()
            }
            $tar.children('.user-details').addClass('out').animate({
                top: 44
            }, 200)
        })
        //个人页面鼠标移出事件
        $('.user-isLogin').mouseleave(e => {
            let $tar = $(e.target)
            if ($tar[0].nodeName == "IMG") {
                $tar = $tar.parent().parent()
            } else if ($tar[0].nodeName == "A") {
                $tar = $tar.parent()
            } else if ($tar[0].nodeName == "LI") {
                $tar = $tar.parent().parent().parent()
            } else if ($tar.is('.user-details')) {
                $tar = $tar.parent()
            }
            $tar.children('.user-details').animate({
                top: 52
            }, 200, () => {
                $tar.children('.user-details').removeClass('out')
            })
        })
        //登录框弹出
        $('.login-click').click(e=> {
            e.preventDefault()
            $('.max-black').addClass('out')
            $('.login-pw').addClass('out')
        })
        //注册框弹出
        $('.register-in-btn').click(e=>{
            e.preventDefault()
            $('.register').addClass('out')
            closeLogin()
        })
        //切换登录方式
        $('.login-pw>.login-title>h3').click(e=> {
            let $tar = $(e.target)
            let $pwd = $('.login-pwd')
            let $code = $('.login-code')
            let $move = $('.login-move')
            let $uname = $('.login-pw [name=phone-email]')

            //console.log($pwd)
            //console.log($code)
            //console.log($move)
            //console.log($tar.html())
            $tar.addClass('active').siblings().removeClass('active')
            if ($tar.html() === '快捷登录') {
                $pwd.removeClass('out')
                $code.addClass('out')
                $move.addClass('out')
                $uname.attr('placeholder','请输入手机号')
            } else {
                $pwd.addClass('out')
                $code.removeClass('out')
                $move.removeClass('out')
                $uname.attr('placeholder','请输入手机号或邮箱')
            }
        })
        //登录时input失去焦点事件
        $('.login-pw').on('blur','[name=phone-email]',e=>{
            $tar = $(e.target)
            if($tar.val()==''){
                $('.login-main>.tips').html('手机号或邮箱不能为空')
            }else if((!emailReg.test($tar.val()))&&(!phoneReg.test($tar.val()))){
                $('.login-main>.tips').html('手机号或邮箱格式不正确')
            }else{
                $('.login-main>.tips').html('')
            }
        })
        //登录功能
        $('.login-btn>.submit').click(e=>{
            e.preventDefault()
	        login()
        })
        //点击回车登
        $(".input-sth[name=upwd]").keyup(e=>{
            e.preventDefault()
            if(e.keyCode===13){
                login()
            }
        })
        //注册时input失去焦点事件
        $('.register').on('blur','.register-box>input',e=>{
            let $tar = $(e.target)
            let name = $tar.attr('name')
            let val = $tar.val()
            //console.log(name)
            //console.log($tar.val())
            if(name == 'phone'){
                select_phone_email(val,$tar,'手机号')
            }else if(name == 'email'){
                select_phone_email(val,$tar,'邮箱')
            }else if(name == 'upwd'){
                if(val==''){
                    $tar.parent().next().children().html('密码不能为空')
                }else if(val.length < 8||val.length>20){
                    $tar.parent().next().children().html('密码长度8-20位')
                }else if(!(/^[a-zA-Z]$/.test(val[0]))){
                    $tar.parent().next().children().html('密码应以字母开头')
                }else if(!upwdReg.test(val)){
                    $tar.parent().next().children().html('密码格式不正确')
                }else{
                    $tar.parent().next().children().html('')
                }
            }else if(name == 'upwd2'){
                let upwd_sth = $('.register [name=upwd]').val()
                console.log(upwd_sth)
                if(upwd_sth==''){
                    $tar.parent().next().children().html('')
                }else{
                    if(upwd_sth==val){
                        $tar.parent().next().children().html('')
                    }else{
                        $tar.parent().next().children().html('确认密码和密码不一致，请重新输入')
                    }
                }
            }
        })
        //注册功能
        $('.register-btn>.submit').click(e=>{
            e.preventDefault()
            let $tar = $(e.target)
            let phoneOk = false, emailOk = false, upwdOk = false, upwd2Ok = false, agree = false
            let phone = $tar.parent().siblings().children('[name=phone]').val()
            let phoneMsg = $('.register .phone')
            let email = $tar.parent().siblings().children('[name=email]').val()
            let emailMsg = $('.register .email')
            let upwd = $tar.parent().siblings().children('[name=upwd]').val()
            let upwdMsg = $('.register .upwd')
            let upwd2 = $tar.parent().siblings().children('[name=upwd2]').val()
            let upwd2Msg = $('.register .upwd2')
            //console.log("邮箱："+email)
            //console.log("密码："+upwd)
            //console.log("密码2："+upwd2)
            if(phone==''){
                phoneMsg.html('手机号不能为空')
            }else if(!phoneReg.test(phone)){
                phoneMsg.html('手机号格式不正确')
            }else{
                phoneMsg.html('')
                phoneOk = true
            }
            if(email==''){
                emailMsg.html('邮箱不能为空')
            }else if(!emailReg.test(email)){
                emailMsg.html('邮箱格式不正确')
            }else{
                emailMsg.html('')
                emailOk = true
            }
            if(upwd==''){
                upwdMsg.html('密码不能为空')
            }else if(!upwdReg.test(upwd)){
                upwdMsg.html('密码格式不正确')
            }else{
                upwdMsg.html('')
                upwdOk = true
            }
            if(upwd2==''){
                if(upwd=='') {
                    upwd2Msg.html('')
                }else{
                    upwd2Msg.html('确认密码和密码不一致，请重新输入')
                }
            }else if(upwd2!=upwd){
                upwd2Msg.html('确认密码和密码不一致，请重新输入')
            }else{
                upwd2Msg.html('')
                upwd2Ok = true
            }
            if($('.is-agree input').is(':checked')){
                agree = true
            }else{
                upwd2Msg.html('需要同意联想条款政策')
            }
            if(phoneOk&&emailOk&&upwdOk&&upwd2Ok&&agree){
                $.ajax({
	                type:"POST",
                    url:"data/user/register.php",
                    data:{phone,email,upwd},
	                xhrFields:{withCredentials:true}
                }).then(data=>{
                    if(data.code>0){
                        upwd2Msg.html('注册成功')
                        closeLogin()
                        closeRegister()
                        $('.max-black').removeClass('out')
                        $.ajax({
	                        type:"POST",
                            url:"data/user/login.php",
                            data:{phone,upwd},
	                        xhrFields:{withCredentials:true}
                        }).then(()=>{
                            isLogin()
                            location.reload(true)
                        })
                    }else{
                        upwd2Msg.html(data.msg)
                    }
                })
                upwd2Msg.html('请稍后...')
            }
        })
        //关闭弹出框
        $('.close').click(e=> {
            closeLogin()
            closeRegister()
            $('.max-black').removeClass('out')
            $('.login-main>.tips').html('')
        })
        //检查是否登录
        isLogin()
        //退出登录按钮
        $('header').on('click', '[data-use=outLogin]', e=> {
			e.preventDefault()
            $.ajax({
	            type:"GET",
	            url:"data/user/logout.php",
	            xhrFields:{withCredentials:true}
            }).then(()=>{
                location.reload(true)
            })
        })
		let arr = location.search.split("=")
		if(arr[0]=="?key"){
			$(".search-box [name=search]").val(decodeURI(arr[1]))
		}
		//搜索功能
		$(".search-box .search-btn").click(e=>{
			e.preventDefault()
			let $tar = $(e.target)
			if($tar.is("span")){
				$tar = $tar.parent()
			}
			select_key($tar)
		})
		$(".search-box [name=search]").keyup(e=>{
			e.preventDefault()
			if(e.keyCode===13){
				let $tar = $(e.target)
				select_key($tar.siblings(".search-btn"))
			}
		})
        //跳转购物车
        $(".bottom-box .shopping-cart").on("click","a",e=>{
            e.preventDefault()
            let $tar = $(e.target)
            if(ok!==0){
                location.href = "cart.html"
            }else{
                $('.max-black').addClass('out')
                $('.login-pw').addClass('out')
            }
        })
	})

	//搜索功能方程
	function select_key(sth) {
		let val = sth.siblings("input").val()
		val = trim(val)
		location.href = "product_search.html?key="+val
	}
    //登录
    let login = function (){
	    let inputLength = $('.login-pw input').parent('.out').length
	    let inputVal = []
	    for(let i=0;i<inputLength;i++){
		    inputVal[i] = $('.login-pw input').parent('.out').children('input:eq(0)').val()
	    }
	    if(inputVal.length===1){
		    let upwd = inputVal[0]
		    let email = null, phone = null
		    let passName = $('.login-pw [name=phone-email]').val()
		    let isOk = false
		    if(emailReg.test(passName)){
			    email = passName
			    isOk = loginUpwd(upwd,upwdReg)
		    }else if(phoneReg.test(passName)){
			    phone = passName
			    isOk = loginUpwd(upwd,upwdReg)
		    }else if(passName == ''){
			    $('.login-main>.tips').html('手机号或邮箱不能为空')
		    }else{
			    $('.login-main>.tips').html('手机号或邮箱格式不正确')
		    }
		    //console.log("手机号"+phone)
		    //console.log("邮箱"+email)
		    //console.log("密码"+upwd)
		    //console.log(isOk)
		    if(isOk){
			    $.ajax({
				    type:"POST",
				    url:"data/user/login.php",
				    data:{phone,email,upwd},
				    xhrFields:{withCredentials:true}
			    }).then(data=>{
				    if(data.code>0){
                        $('.login-main>.tips').html('登录成功')
					    closeLogin()
					    closeRegister()
					    $('.max-black').removeClass('out')
					    location.reload(true)
				    }else{
					    $('.login-main>.tips').html(data.msg)
				    }
                })
                $('.login-main>.tips').html('登陆中...')
		    }
	    }else if(inputVal.length===2){
		    $('.login-main>.tips').html('暂不支持此功能登录')
	    }
    }
    //logo切换函数
    function logo() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 34) {
            $('#long-logo').removeClass('out').siblings().addClass('out')
            $('.bottom-box').addClass('scroll-down')
        } else {
            $('#long-logo').addClass('out').siblings().removeClass('out')
            $('.bottom-box').removeClass('scroll-down')
        }
    }
	//关闭登录框函数
    let closeLogin = function () {
		$('.login-pw').removeClass('out')
		$('.login-pw>.login-title>h3:first-child').addClass('active').siblings().removeClass('active')
		$('.login-pwd').addClass('out')
		$('.login-code').removeClass('out')
		$('.login-move').removeClass('out')
		$('.login-pw input').val('')
        $('.login-pw [name=phone-email]').attr('placeholder','请输入手机号或邮箱')
	}
	///关闭注册框函数
	let closeRegister = function () {
        $('.register').removeClass('out')
        $('.register>.register-box>input').val('')
		$('.register>.msg-box>p').html('')
    }
    //检查是否登录函数
	function isLogin() {
        $.ajax({
	        type:"GET",
	        url:"data/user/isLogin.php",
	        xhrFields:{withCredentials:true}
        }).then(output=> {
            //data = {ok:1,uname:'dingding'}
        	//console.log(output)
        	let {data,num} = output
            ok = output.ok
			if (ok == 0) {
                $('.user-notLogin').addClass('out')
				$('.user-isLogin').removeClass('out')
            } else {
                $('.user-notLogin').removeClass('out')
				$('.user-isLogin').addClass('out').find('.phone-title>span').html(data.phone)
                $('.user-isLogin').find('.user-pic>img').attr('src',`${data.avatar}`)
            }
            if(num==undefined||num==""){
                num = 0
            }else{
                num = parseInt(num)
            }
            $("header .bottom-box .shopping-cart span").html(num)
        })
    }
    //判断密码格式是否正确
    let loginUpwd = function (upwd,upwdReg){
        if(upwd == ''){
            $('.login-main>.tips').html('密码不能为空')
			return false
        }else if(upwdReg.test(upwd)){
            $('.login-main>.tips').html('')
            return true
        }else{
            $('.login-main>.tips').html('密码格式不正确')
            return false
        }
	}
	//注册失去焦点ajax
	function select_phone_email(sth,tar,str) {
        let phone = null, email = null
        if(str=='手机号'){
        	phone = sth
		}else if(str=='邮箱'){
        	email = sth
		}
		if(emailReg.test(sth)){
            tar.parent().next().children().html('')
		}else if(phoneReg.test(sth)){
            tar.parent().next().children().html('')
		}else if(sth==''){
			tar.parent().next().children().html(str+'不能为空')
		}else{
            tar.parent().next().children().html(str+'格式不正确')
		}
		//console.log("email"+email)
        //console.log("phone"+phone)
		$.ajax({
			type:"GET",
			url:"data/user/canRegister.php",
			data:{phone,email},
			xhrFields:{withCredentials:true}
		}).then(data=>{
			console.log(data)
			if(data.code==-1){
                tar.parent().next().children().html(str+'不能为空')
			}else{
                tar.parent().next().children().html(data.msg)
			}
		})
    }
	//清楚字符串前后空格方程
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
})