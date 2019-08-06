$(()=>{
	const all_thing = $(".cart-num>.num-rt")
	loadCart()
	//修改数据库方程
	function loadChange(iid,num,is_choice) {
		$.ajax({
			type:"GET",
			url:"data/cart/loadChange.php",
			data:{iid,num,is_choice},
			xhrFields:{withCredentials:true}
		}).then(output=>{
			if(output.code>0){
				loadCart()
			}else{
				console.log(output.msg)
			}
		})
	}
	//修改全部数据方程
	function loadChangeALL(is_choice) {
		$.ajax({
			type:"GET",
			url:"data/cart/loadChangeALL.php",
			data:{is_choice},
			xhrFields:{withCredentials:true}
		}).then(output=>{
			if(output.code>0){
				loadCart()
			}else{
				console.log(output.msg)
			}
		})
	}
	//加载方程
	function loadCart() {
		$.ajax({
			type:"GET",
			url:"data/cart/loadCart.php",
			xhrFields:{withCredentials:true}
		}).then(output=>{
			if(output.code>0){
				let data = output.data,
					like = output.like,
					html = "",
					all_price = 0,
					all_promise = 0,
					all_money = 0
				for(let d of data){
					let  promise = d.promise
					promise = promise_change(promise)
					html += `<li data-iid="${d.iid}" data-pid="${d.pid}">
						<ul class="cart clear">
							<li class="choice-li">
								<a href="javascript:;" class="choice${d.is_choice==1?" is-choice":""}"></a>
							</li>
							<li class="title"><img src="images/item/lg/${d.images.split("/")[0]}" alt=""><a href="product_details.html?pid =${d.pid}">${d.title}</a></li>
							<li class="subtitle"><p>${d.subtitle}</p></li>
							<li class="price">${parseFloat(d.price).toFixed(2)}</li>
							<li class="num" data-promise="${d.promise}">
								<input type="button" class="reduce" value="-">
								<input type="text" value="${d.p_count}" class="sum_all">
								<input type="button" class="add" value="+">
							</li>
							<li class="items-price">${(parseFloat(d.price)*parseInt(d.p_count)).toFixed(2)}</li>
							<li class="do-sth">
								<a href="javascript:;" class="delete">删除</a><br>
								<a href="javascript:;" class="like">移入收藏夹</a>
							</li>`
					if(d.is_service!==''&&d.is_service!==undefined){
						html+= `<li class="service-all clear">`
						let service = d.is_service.split("&")
						for(let s of service){
							html+=`<a class="service" href="javascript:;">${s}</a>`
						}
						html+= `</li>`
					}
					html += `</ul></li>`
					all_price += d.is_choice==1 ? parseFloat(d.price) * parseInt(d.p_count) : 0
					all_promise += d.is_choice==1 ? promise * parseInt(d.p_count) : 0
				}
				$(".cart-items").html(html)
				let sALength = $(".service-all").length
				for(let i=0;i<sALength;i++){
					let sACLength = $(`.service-all:eq(${i})`).children().length,
						num = $(`.service-all:eq(${i})`).parent().find(".sum_all").val()
					if( $(`.service-all:eq(${i})`).parent().find(".choice").is(".is-choice")){
						for(let j=0;j<sACLength;j++){
							all_price += parseInt($(`.service-all:eq(${i})`).find(`a:eq(${j}) span`).html().slice(1))*num
						}
					}
				}
				all_money 	= all_price - all_promise
				all_thing.find("li:eq(0)>span").html(all_price.toFixed(2))
				all_thing.find("li:eq(1)>span").html(all_promise.toFixed(2))
				all_thing.find("li:eq(2)>span").html(all_money.toFixed(2))
				let choiceLength = $(".cart-items").find(".choice:not(.is-choice)").length
				if(choiceLength===0){
					$(".cart-title .choice").addClass("is-choice")
					$(".cart-num .choice").addClass("is-choice")
				}else{
					$(".cart-title .choice").removeClass("is-choice")
					$(".cart-num .choice").removeClass("is-choice")
				}
				if(like!==0){
					for(let l of like){
						let pid = $(`[data-pid=${l.pid}]`)
						if(pid.length!==0){
							pid.children().children(".do-sth").children(".like").html("已添加收藏夹")
						}
					}
				}
			}else if(output.code===-2){
				console.log(output.msg)
			}else{
				$(".cart-items").html("")
				$(".cart-title .choice").removeClass("is-choice")
			}
			if($(".cart-items").children().length>0){
				$(".cart-no-items").removeClass("out")
				$(".cart-num").addClass("out")
				$(".buy-it").addClass("out")
			}else{
				$(".cart-no-items").addClass("out")
				$(".cart-num").removeClass("out")
				$(".buy-it").removeClass("out")
			}
		})
	}
	$(".cart-items").on("click",".reduce,.add",e=>{ //点击增加减少事件
		let $tar = $(e.target),
			numO = parseInt($tar.siblings(".sum_all").val()),
			price = parseFloat($tar.parent().siblings(".price").html()),
			promise = $tar.parent().data("promise")
			num = 0
		num = numO
		promise = promise_change(promise)
		if($tar.is(".add")){
			num++
			addOrReduce($tar,num,numO,price,promise)
		}else if($tar.is(".reduce")&&num>1){
			num--
			addOrReduce($tar,num,numO,price,promise)
		}
	}).on("keyup",".sum_all",e=>{   //input回车事件
		if(e.keyCode===13){
			let $tar = $(e.target),
				numO = parseInt($tar.val()),
				price = parseFloat($tar.parent().siblings(".price").html()),
				promise = $tar.parent().data("promise")
				num = 0
			num = numO
			promise = promise_change(promise)
			if(!(num!==num)){
				addOrReduce($tar,num,numO,price,promise)
			}
		}
	}).on("click",".choice",e=>{    //点击选中事件
		let $tar = $(e.target),
			price = parseFloat($tar.parent().siblings(".price").html()),
			num = parseFloat($tar.parent().siblings(".num").children(".sum_all").val()),
			promise = $tar.parent().siblings(".num").data("promise"),
			all_price = parseFloat(all_thing.find("li:eq(0)>span").html()),
			all_promise = parseFloat(all_thing.find("li:eq(1)>span").html()),
			all_money = parseFloat(all_thing.find("li:eq(2)>span").html()),
			iid = $tar.parent().parent().parent().data("iid"),
			is_choice = ""
		promise = promise_change(promise)
		if($tar.is(".is-choice")){
			$tar.removeClass("is-choice")
			is_choice = "0"
			all_thing.find("li:eq(0)>span").html((all_price-price*num).toFixed(2))
			all_thing.find("li:eq(1)>span").html((all_promise-promise*num).toFixed(2))
			all_thing.find("li:eq(2)>span").html((all_money-promise*num-price*num).toFixed(2))
		}else{
			$tar.addClass("is-choice")
			is_choice = "1"
			all_thing.find("li:eq(0)>span").html((all_price+price*num).toFixed(2))
			all_thing.find("li:eq(1)>span").html((all_promise+promise*num).toFixed(2))
			all_thing.find("li:eq(2)>span").html((all_money+promise*num+price*num).toFixed(2))
		}
		let choiceLength = $(".cart-items").find(".choice:not(.is-choice)").length
		if(choiceLength===0){
			$(".cart-title .choice").addClass("is-choice")
			$(".cart-num .choice").addClass("is-choice")
		}else{
			$(".cart-title .choice").removeClass("is-choice")
			$(".cart-num .choice").removeClass("is-choice")
		}
		loadChange(iid,num,is_choice)
	}).on("click",".like",e=>{ //点击添加收藏事件
		let $tar = $(e.target)
		if($tar.html()==="移入收藏夹"){
			let pid = $tar.parent().parent().parent().data("pid")
			$.ajax({
				type:"GET",
				url:"data/product/shopping_like.php",
				data:{pid},
				xhrFields:{withCredentials:true}
			}).then(output=>{
				if(output.code>0){
					$tar.html("已添加收藏夹")
				}else{
					console.log(output.msg)
				}
			})
		}
	}).on("click",".service",e=>{ //点击取消服务事件
		let $tar = $(e.target),
			service = ""
		if($tar.is("span")){
			$tar = $tar.parent()
		}
		let iid = $tar.parent().parent().parent().data("iid")
		let serviceClick = $tar.siblings().length
		if(serviceClick!==0){
			for(let i=0;i<serviceClick;i++){
				service += $tar.siblings(`a:eq(${i})`).html()
				if(i<serviceClick-1){
					service += "&"
				}
			}
		}
		$tar.remove()
		$.ajax({
			type:"GET",
			url:"data/cart/serviceChange.php",
			data:{iid,service},
			xhrFields:{withCredentials:true}
		}).then(output=>{
			if(output<0){
				console.log(output.msg)
			}else{
				loadCart()
			}
		})
	})
	$(".buy-cart").on("click",".cart-title .choice,.cart-num .choice",e=>{  //点击全选事件
		let $tar = $(e.target),
			cart = $(".cart-items"),
			is_choice = ""
		if($tar.is(".is-choice")){
			$(".buy-cart").find(".choice").removeClass("is-choice")
			is_choice = "0"
			all_thing.find("li:eq(0)>span").html("0.00")
			all_thing.find("li:eq(1)>span").html("0.00")
			all_thing.find("li:eq(2)>span").html("0.00")
		}else{
			let all_price = 0,
				all_promise = 0
			$(".buy-cart").find(".choice").addClass("is-choice")
			is_choice = "1"
			for(let i =0;i<cart.children().length;i++){
				all_price += parseFloat(cart.find(`.price:eq(${i})`).html()) * parseFloat(cart.find(`.sum_all:eq(${i})`).val())
				let promise = cart.find(`.num:eq(${i})`).data("promise")
				promise = promise_change(promise)
				all_promise += promise* parseFloat(cart.find(`.sum_all:eq(${i})`).val())
			}
			all_thing.find("li:eq(0)>span").html(all_price.toFixed(2))
			all_thing.find("li:eq(1)>span").html(all_promise.toFixed(2))
			all_thing.find("li:eq(2)>span").html((all_price-all_promise).toFixed(2))
		}
		loadChangeALL(is_choice)
	}).on("click",".delete,.delete_all",e=>{	//点击删除及全部删除事件
		let $tar = $(e.target),
			canDelete = $(".is-choice").length
			iid = 0
		if($tar.is(".delete")){
			iid = $tar.parent().parent().parent().data("iid")
			canDelete = true
		}
		if(canDelete&&confirm("是否删除？")){
			$.ajax({
				type:"GET",
				url:"data/cart/delete_items.php",
				data:{iid},
				xhrFields:{withCredentials:true}
			}).then(output=>{
				if(output.code>0){
					loadCart()
				}else{
					console.log(output.msg)
				}
			})
		}
	})



	//增加减少方程
	function addOrReduce(sth,num,numO,price,promise) {
		let itemsPrice = (num*price).toFixed(2),
			all_price = parseFloat(all_thing.find("li:eq(0)>span").html()),
			all_promise = parseFloat(all_thing.find("li:eq(1)>span").html()),
			choice = sth.parent().siblings(".choice-li").children(),
			all_money = 0,
			iid = sth.parent().parent().parent().data("iid")
		if(choice.is(".is-choice")){
			all_price = all_price-numO*price+num*price
			all_promise = all_promise-numO*promise+num*promise
			all_money = all_price-all_promise
		}else{
			all_price = all_price+num*price
			all_promise = all_promise+num*promise
			all_money = all_price-all_promise
			choice.addClass("is-choice")
		}
		all_thing.find("li:eq(0)>span").html(all_price.toFixed(2))
		all_thing.find("li:eq(1)>span").html(all_promise.toFixed(2))
		all_thing.find("li:eq(2)>span").html(all_money.toFixed(2))
		sth.parent().siblings(".items-price").html(itemsPrice)
		sth.siblings(".sum_all").val(num)
		loadChange(iid,num,"1")
	}
	function promise_change(promise){
		if(promise!==""&&promise!==undefined){
			return parseFloat(promise.slice(4))
		}else{
			return 0
		}
	}
})