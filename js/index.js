//大轮播
$(()=>{
	$.ajax({
		type:"GET",
		url:"http://176.233.2.71:5050/banner_lg",//"data/index/banner_lg.php"
		xhrFields:{withCredentials:true}
	}).then(output=>{
		let picAll = [],titleAll = [],hrefAll = [], html = "",iMax,pictureHtml = ""
		for(iMax=0;iMax<output.length;iMax++) {
			picAll[iMax] = output[iMax].img
			titleAll[iMax] = output[iMax].title
			hrefAll[iMax] = output[iMax].href
			pictureHtml += `<img src="${picAll[iMax]}" alt="">`
		}
		$(".banner .banner-picture").html(pictureHtml)
		const count = 20, interval = 50, dura = 500, waiting = 3000
		let i = 0, point = ""
		for(let i=0;i<iMax;i++){
		point += `<li data-num="${i}"></li>`
		}
		$(".banner-point").html(point).children("li:eq(0)").addClass("active")
		//启动定时器
		let timer = setInterval(()=>{
			i++
			task()
		},interval * count + dura + waiting)
		//鼠标移入事件
		$(".banner-in").mouseenter(()=>{
			clearInterval(timer)
			$(".all-btn").addClass('out')
		})
		//鼠标移出事件
		$(".banner-in").mouseleave(()=>{
			timer = setInterval(()=>{
				i++
				task()
			},interval * count + dura + waiting)
			$(".all-btn").removeClass('out')
		})
		//点击左右标识
		$('.banner').on('click','.all-btn',e=>{
			let $tar = $(e.target)
			if($tar.is('.left-btn')){
				i--
				task()
			}else{
				i++
				task()
			}
		})
		//鼠标移入圆点事件
		$(".banner").on("mouseenter",'.banner-in>.banner-point>li',e=>{
			let $tar = $(e.target)
			$tar.siblings().removeClass('active')
			i = $tar.addClass('active').data('num')
			task()
		})
		//定时方程
		function task(){
			if(i == iMax){
				i = 0
			}else if(i < 0){
				i = iMax-1
			}
			let j = 0
			setInterval(()=>{
				let li = $(`.banner-ul>li:eq(${j})`)
				j++
				li.css("backgroundImage",`url(${picAll[i]})`)
				li.stop(true).animate({
					top:-100
				},dura*0.25,(function(){
					$(this).animate({
						top:70
					},dura*0.25,(function(){
						$(this).animate({
							top:-50
						},dura*0.15,(function(){
							$(this).animate({
								top:25
							},dura*0.15,(function(){
								$(this).animate({
									top:-10
								},dura*0.1,(function(){
									$(this).animate({
										top:0
									},dura*0.1,(function(){
										li.children("a").attr("href",hrefAll[i]).attr("title",titleAll[i])
										if(j==count){
											$('.banner-ul>img').attr("src",picAll[i]).attr("title",titleAll[i])
										}
									}))
								}))
							}))
						}))
					}))
				}))
			},interval)
			$(`.banner>.banner-in>.banner-point>[data-num=${i}]`).addClass('active').siblings().removeClass('active')
		}
	})
})
//中轮播
$(()=>{
	const WIDTH = 200
	$.ajax({
		type:"GET",
		url:"http://176.233.2.71:5050/banner_md",//'data/index/banner_md.php'
		xhrFields:{withCredentials:true}
	}).then(output=>{
		let LEFT= null,moved = 0,wating = 1000,canMove = true,
			ul = $(".star-banner>.star-ul"),
			html = '',html_all = '',
			num = output.length*3
		for(let i=0;i<output.length;i++){
			html += `<li>
				<a href="${output[i].href}" target="_blank" title="${output[i].name}">
					<img src="${output[i].img}" alt="" class="shopping-pic">
					<p class="shopping-name">${output[i].name}</p>
					<p class="shopping-title">${output[i].title}</p>
					<p class="shopping-price">${output[i].price}</p>
				</a>
			</li>`
		}
		for(let i=0;i<3;i++){
			html_all+=html
		}
		$(".star-banner>.star-ul").html(html_all)
		ul.css({
			left:-WIDTH*num/3,
			width:num*WIDTH
		})
		LEFT = parseInt(ul.css("left"))
		//点击右箭头
		$(".star-goods>.title>.btn-rt").click(e=>{
			e.preventDefault()
			if(canMove){
				moved++
				move(1)
				canMove = false
			}
		})
		//点击左箭头
		$(".star-goods>.title>.btn-lf").click(e=>{
			e.preventDefault()
			if(canMove){
				moved--
				move(-1)
				canMove = false
			}
		})
		function move(left_right){
			ul.animate({left:LEFT-WIDTH*moved},wating,()=>{
				canMove=true
				if(moved==left_right*num/3+2){
					moved=2
					ul.css({left:LEFT-WIDTH*moved})
				}
			})
		}
	})
})
//楼层
$(()=>{
	$.ajax({
		type:"GET",
		url:"http://176.233.2.71:5050/floor",//"data/index/floor.php"
		xhrFields:{withCredentials:true}
	}).then(output=>{
		let floor_1 = floor_2 = floor_3 = floor_4 = floor_5 = floor_6 = ""
		for(let i=0;i<output.length;i++){
			if(output[i].floor == 1){
				if(output[i].num==0){
					floor_1 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_1 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
			if(output[i].floor == 2){
				if(output[i].num==0){
					floor_2 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_2 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
			if(output[i].floor == 3){
				if(output[i].num==0){
					floor_3 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_3 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
			if(output[i].floor == 4){
				if(output[i].num==0){
					floor_4 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_4 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
			if(output[i].floor == 5){
				if(output[i].num==0){
					floor_5 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_5 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
			if(output[i].floor == 6){
				if(output[i].num==0){
					floor_6 +=`<div class="lg-pic">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
						</a>
					</div>`
				}else{
					floor_6 += `<div class="up-goods items">
						<a href="${output[i].href}" target="_blank">
							<img src="${output[i].img}" alt="">
							<p class="goods-name">${output[i].name}</p>
							<p class="goods-title">${output[i].title}</p>
							<p class="goods-price">￥${output[i].price}</p>
							<span class="${output[i].detail==0 ? "" : output[i].detail==1 ? "hot" : output[i].detail==2 ? "blast" : output[i].detail==3 ? "new" : "down"}"></span>
						</a>
					</div>`
				}
			}
		}
		$(".floor-1>.goods").html(floor_1)
		$(".floor-2>.goods").html(floor_2)
		$(".floor-3>.goods").html(floor_3)
		$(".floor-4>.goods").html(floor_4)
		$(".floor-5>.goods").html(floor_5)
		$(".floor-6>.goods").html(floor_6)
	})
})