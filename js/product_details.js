$(() => {
	$(".info>.info-box").css("width",document.documentElement.clientWidth)
	let pid = location.search.split('=')[1]
	if (pid !== undefined) {
		$.ajax({
			type:"GET",
			url: "data/product/product_detail.php",
			data: {pid},
			xhrFields:{withCredentials:true}
		}).then(output => {
			if (output.code <= 0) {
				console.log(output.msg)
			} else {
				let {pid,category,title,subtitle,price,promise,service,cpu,dos,screen,memory,disk,video_card,cd_drive,inter_face,network,multi_media,input_device,power,machine,software,service_all,images,detail} = output.data,
					subtitles = output.subtitles,
					like = output.like,
					html = ""
				if(like===1){
					$(".item-lf .like .darkHeart").addClass("light")
				}else{
					$(".item-lf .like .darkHeart").removeClass("light")
				}
				$(".breadcrumb .item-title").html(title)
				$("title").html(title)
				$(".item-lf .item-sth .item-code").html("商品编号："+category)
				$(".item-rt>.title>h1").html(title)
				$(".item-rt>.dec").html(subtitle)
				if(promise!==""){
					$("#promotion").addClass("out").find(".box .money").html(promise)
				}
				for(let i=0;i<subtitles.length;i++){
					if(subtitles[i].pid==pid){
						html += `<li>
							<a href="product_details.html?pid=${subtitles[i].pid}" class="active">${subtitles[i].subtitle}</a>
						</li>`
					}else{
						html += `<li>
							<a href="product_details.html?pid=${subtitles[i].pid}">${subtitles[i].subtitle}</a>
						</li>`
					}
				}
				$("#configure").html(html).css("height",subtitles.length*65).find(`li:eq(${pid-1}) a`).addClass("active")
				$("#standard").addClass("out")
				if(service!==""){
					$("#service").addClass("out")
					let arr = service.split("/")
					html = ""
					for(let i=0;i<arr.length;i++){
						let sth = arr[i].split("&")
						html += `<li>
							<span class="icon"></span>
							<a href="javascript:;">${sth[0]}<span>￥${sth[1]}</span></a>
						</li>`
					}
					$("#recommend").html(html).css("height",Math.ceil(arr.length/2)*65)
				}
				if(detail!==""){
					let arr = detail.split("/")
					html = ""
					for(let i=0;i<arr.length;i++){
						html += `<img src="images/item/bg/${arr[i]}" alt="">`
					}
					$(".info-box .images").html(html)
				}
				html = ""
				if(cpu!==""){
					html += intoDetail(cpu)
				}
				if(dos!==""){
					html += intoDetail(dos)
				}
				if(screen!==""){
					html += intoDetail(screen)
				}
				if(memory!==""){
					html += intoDetail(memory)
				}
				if(disk!==""){
					html += intoDetail(disk)
				}
				if(video_card!==""){
					html += intoDetail(video_card)
				}
				if(cd_drive!==""){
					html += intoDetail(cd_drive)
				}
				if(inter_face!==""){
					html += intoDetail(inter_face)
				}
				if(network!==""){
					html += intoDetail(network)
				}
				if(multi_media!==""){
					html += intoDetail(multi_media)
				}
				if(input_device!==""){
					html += intoDetail(input_device)
				}
				if(power!==""){
					html += intoDetail(power)
				}
				if(machine!==""){
					html += intoDetail(machine)
				}
				if(software!==""){
					html += intoDetail(software)
				}
				if(service_all!==""){
					html += intoDetail(service_all)
				}
				$("[data-see=1]").html(html)
				$("#price>span").html(price)
				let img = images.split("/")
				const smUl = img.length,
					WIDTH = 88+10,
					detailsHeight = 50+34+35+60
				let moved = 0,
					waiting = 500,
					ulCanMove = true
				html = ""
				for(let i=0;i<smUl;i++){
					html+=`<li>
						<a href="javascript:;" class="switch-pic">
							<img src="images/item/lg/${img[i]}" alt="" class="sm-pic">
						</a>
					</li>`
				}
				$(".item-lf>.lg-pic").attr("src",`images/item/lg/${img[0]}`)
				$(".item-lf .all-sm-pic .sm-all").html(html)
				$(".sm-all").css({
					width:WIDTH*smUl
				})
				if(smUl<=5){
					$(".all-sm-pic>.btn").addClass("unClick")
				}
				//图片点击轮播
				$(".all-sm-pic>.btn").click(e=>{
					let $tar = $(e.target)
					if(!$tar.hasClass("unClick")&&ulCanMove){
						if($tar.hasClass("right-btn")){
							moved++
						}else if($tar.hasClass("left-btn")){
							moved--
						}
						$(".sm-all").stop(true).animate({
							left:-moved*WIDTH
						},waiting,()=>{
							ulCanMove = true
							if(moved<=0){
								$(".all-sm-pic>.left-btn").addClass("unClick")
								$(".all-sm-pic>.right-btn").removeClass("unClick")
							}else if(moved >= smUl-5){
								$(".all-sm-pic>.right-btn").addClass("unClick")
								$(".all-sm-pic>.left-btn").removeClass("unClick")
							}else{
								$(".all-sm-pic>.left-btn").removeClass("unClick")
								$(".all-sm-pic>.right-btn").removeClass("unClick")
							}
						})
						ulCanMove = false
					}
				})
				//鼠标移入小图大图切换
				$(".sm-all>li>.switch-pic").on("mouseenter","img",e=>{
					let $tar = $(e.target),
						imgSrc = $tar.attr("src")
					$(".item-lf>.lg-pic").attr("src",imgSrc)
				})
				slide()
				$(window).scroll(slide)
				$(".info>.title>li:first-child").addClass("active")
				$(".info>.info-box:eq(0)").addClass("out")
				//点击显示不同商品详情
				$(".info>.title>li").click(e=>{
					let $tar = $(e.target),
						num = $tar.data("index")
					$tar.addClass("active").siblings().removeClass("active")
					$(`.info>.info-box:eq(${num})`).addClass("out").siblings().removeClass("out")
				})
				//点击增加或减少商品数量
				$(".buyIt .price-btn").on("click",".add,.reduce",e=>{
					let $tar = $(e.target),
						num = $tar.siblings(".price").val(),
						price = parseFloat($tar.parent().find("#price>span").html())/num
					if($tar.hasClass("add")){
						num++
					}else if($tar.hasClass("reduce")&&num>1){
						num--
					}
					$tar.parent().data("num",num)
					$tar.siblings(".price").val(num)
					$tar.parent().find("#price>span").html((price*num).toFixed(2))
				})
				//点击推荐服务事件
				$("#recommend").on("click","li",e=>{
					let $tar = $(e.target)
					console.log($tar.is("span.icon"))
					if($tar.is("span:not(.icon)")){
						$tar = $tar.parent()
					}else if($tar.is("span.icon")){
						$tar = $tar.siblings()
					}
					let num = $(".buyIt .price-btn .price").val(),
						price = parseFloat($(".buyIt .price-btn").find("#price>span").html())/num,
						money = parseFloat($tar.children("span").html().slice(1))
					if(!$tar.hasClass("active")){
						$tar.addClass("active")
						price = (price+money)*num
					}else{
						$tar.removeClass("active")
						price = (price-money)*num
					}
					$(".buyIt .price-btn").find("#price>span").html(price.toFixed(2))
				})
				//购买数量点击回车事件
				$(".buyIt .price-btn").on("keyup","input",e=>{
					let $tar = $(e.target)
					if(e.keyCode===13){
						let val = parseInt($tar.val()),
							price = parseFloat($tar.parent().find("#price>span").html()),
							num = parseFloat($tar.parent().data("num"))
						$tar.val(val)
						price = price/num*val
						$tar.parent().data("num",val)
						$tar.parent().find("#price>span").html(price.toFixed(2))
					}
				})
				//点击加入购物车及喜爱事件
				$("body").on("click",".buyIt-box .cart,.item-lf .item-sth .like",e=>{
					let $tar = $(e.target)
					if($tar.is("span")){
						$tar = $tar.parent()
					}
					$.ajax({
						type:"GET",
						url:"data/user/isLogin.php",
						xhrFields:{withCredentials:true}
					}).then(output=>{
						if(output.ok===0){
							$("header").find(".login-pw").addClass("out")
							$("header").find(".max-black").addClass("out")
						}else if(output.ok===1){
							if($tar.is(".like")){
								if(!$tar.children(".darkHeart").is(".light")){
									$.ajax({
										type:"GET",
										url:"data/product/shopping_like.php",
										data:{pid},
										xhrFields:{withCredentials:true}
									}).then(output=>{
										if(output.code>0){
											$tar.children(".darkHeart").addClass("light")
										}else{
											console.log(output.msg)
										}
									})
								}else{
									$.ajax({
										type:"GET",
										url:"data/product/del_shopping_like.php",
										data:{pid},
										xhrFields:{withCredentials:true}
									}).then(output=>{
										if(output.code>0){
											$tar.children(".darkHeart").removeClass("light")
										}else{
											console.log(output.msg)
										}
									})
								}
							}else if($tar.is(".cart")){
								let num = parseInt($tar.siblings("input.price").val()),
									service = ""
								if($("#recommend li").length){
									let LENGTH = $("#recommend li .active").length
									for(let i=0;i<LENGTH;i++){
										service += $(`#recommend li .active:eq(${i})`).html()
										if(i<LENGTH-1){
											service += "&"
										}
									}
								}
								$.ajax({
									type:"GET",
									url:"data/product/addShopping_items.php",
									data:{pid,num,service},
									xhrFields:{withCredentials:true}
								}).then(output=>{
									if(output.code>0){
										location.href = "cart.html"
									}
								})
							}
						}
					})
				})


				//商品详情左侧移动方程
				function slide() {
					let lfHeight = parseInt($(".item-lf").css("height")),
						allHeight = parseInt($(".item-details").css("height")),
						scrollTop = document.documentElement.scrollTop || document.body.scrollTop
					if(allHeight>lfHeight){
						if(scrollTop >= detailsHeight && scrollTop <= (detailsHeight+allHeight-lfHeight)){
							$(".item-lf").addClass("move").css("top",0)
						}else if(scrollTop > (detailsHeight+allHeight-lfHeight)){
							$(".item-lf").removeClass("move").css("top",allHeight-lfHeight)
						}else{
							$(".item-lf").removeClass("move").css("top",0)
						}
					}else{
						$(".item-lf").removeClass("move").css("top",0)
					}
				}
				//配置信息拼接
				function intoDetail(sth){
					let arr = sth.split("&")
					let detail = arr[1].split("/"),
						html = `<div class="good-item">
							<div class="item-title clear">
								<div class="title">${arr[0]}</div>
								<div class="title1"></div>
							</div>`
					for(let i=0;i<detail.length;i++){
						let item = detail[i].split("_")
						html +=	`<div class="row clear">
							<div class="s-name">${item[0]}</div>
							<div class="s-value">${item[1]}</div>
						</div>`
					}
					html += `<div class="row last-row clear">
							<div class="s-name"></div>
							<div class="s-value"></div>
						</div>
					</div>`
					return html
				}
			}
		})
	}
})