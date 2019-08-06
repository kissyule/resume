$(()=>{
	let breadcrumb = $(".breadcrumb ul")
	function loadPage(pno) {
		if($(".select>.selected>.selected-row2").children("[data-id]").length!==0){
			$(".select>.selected").addClass("out")
		}else{
			$(".select>.selected").removeClass("out")
		}
		let key = location.search==="" ? "":decodeURI(location.search.split('=')[1]),
			brand = $("[data-id=brand]").html(),
			f_name = $("[data-id=f_name]").html(),
			p_name = $("[data-id=p_name]").html(),
			cpu_d = $("[data-id=cpu_d]").children("i").html(),
			memory_d = $("[data-id=memory_d]").children("i").html(),
			disk_d = $("[data-id=disk_d]").children("i").html(),
			screen_inch = $("[data-id=screen_inch]").children("i").html(),
			screen_size = $("[data-id=screen_size]").children("i").html()
		$.ajax({
			type:"GET",
			url:"http://176.233.2.71:5050/search",
			data:{key,brand,f_name,p_name,cpu_d,memory_d,disk_d,screen_inch,screen_size,pno},
			xhrFields:{withCredentials:true}
		}).then(output=>{
			if(output.code<0){
				$("#items").html(`<li class='err'>
						<p>${output.msg}</p>
					</li>`)
				return
			}
			let {brand,cpu_d,data,screen_size,screen_inch,pno,pageCount,p_name,memory_d,f_name,disk_d,sum_all} = output,
				html = ""
			//查询关键词拼接
			if(key!=="" && $(".breadcrumb ul [data-key]").length==0){
				$(".breadcrumb ul").append($(`<li><a href="javascript:;" data-key="${key}">${key}</a></li>`))
				$("title").html(key+" - "+$("title").html())
			}
			breadcrumb.find("span").remove()
			breadcrumb.children(":not(:last-child)").append($("<span>&gt;</span>"))
			for(let i = 0;i<brand.length;i++){
				html+=`<a href="javascript:;">${brand[i].brand}</a>`
			}
			$("#brand>.selected-row2").html(html)
			html=""
			for(let i = 0;i<f_name.length;i++){
				html+=`<a href="javascript:;">${f_name[i].f_name}</a>`
			}
			$("#f_name>.selected-row2").html(html)
			html=""
			for(let i = 0;i<p_name.length;i++){
				html+=`<a href="javascript:;">${p_name[i].p_name}</a>`
			}
			$("#p_name>.selected-row2").html(html)
			html=""
			for(let i = 0;i<cpu_d.length;i++){
				html+=`<a href="javascript:;">${cpu_d[i].cpu_d}</a>`
			}
			$("#cpu_d>.selected-row2").html(html)
			html=""
			for(let i = 0;i<memory_d.length;i++){
				html+=`<a href="javascript:;">${memory_d[i].memory_d}</a>`
			}
			$("#memory_d>.selected-row2").html(html)
			html=""
			for(let i = 0;i<disk_d.length;i++){
				html+=`<a href="javascript:;">${disk_d[i].disk_d}</a>`
			}
			$("#disk_d>.selected-row2").html(html)
			html=""
			for(let i = 0;i<screen_inch.length;i++){
				html+=`<a href="javascript:;">${screen_inch[i].screen_inch}</a>`
			}
			$("#screen_inch>.selected-row2").html(html)
			html=""
			for(let i = 0;i<screen_size.length;i++){
				html+=`<a href="javascript:;">${screen_size[i].screen_size}</a>`
			}
			$("#screen_size>.selected-row2").html(html)
			$(".sum>span").html(sum_all)
			//主题内容拼接
			html = ""
			for(let item of data){
				html+=`<li>
					<a href="product_details.html?pid=${item.pid}">
						<img src="images/item/lg/${item.images.split("/")[0]}" alt="${item.title}">
						<div class="promise"><span class="${item.promise==""?"":"red"}">立减</span></div>
						<div class="title">
							<span>${item.title}</span>
						</div>
						<div class="subtitle">
							<span>${item.subtitle}</span>
						</div>
						<div class="price">￥${parseFloat(item.price).toFixed(2)}</div>
					</a>
				</li>`
			}
			$("#items").html(html)
			//页码拼接
			pno = parseInt(pno)
			pageCount = parseInt(pageCount)
			let page = ""
			page = `<li><a href="#">&lt;</a></li>`
			if(pageCount>=5) {
				if (pno === 1) {
					page += `<li><a href="#" class="active">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>`
				} else if (pno === 2) {
					page += `<li><a href="#">1</a></li>
                    <li><a href="#" class="active">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>`
				} else if (pno === pageCount - 1) {
					page += `<li><a href="#">${pageCount - 4}</a></li>
                    <li><a href="#">${pageCount - 3}</a></li>
                    <li><a href="#">${pageCount - 2}</a></li>
                    <li><a href="#" class="active">${pageCount - 1}</a></li>
                    <li><a href="#">${pageCount}</a></li>`
				} else if (pno === pageCount) {
					page += `<li><a href="#">${pageCount - 4}</a></li>
                    <li><a href="#">${pageCount - 3}</a></li>
                    <li><a href="#">${pageCount - 2}</a></li>
                    <li><a href="#">${pageCount - 1}</a></li>
                    <li><a href="#" class="active">${pageCount}</a></li>`
				} else {
					page += `<li><a href="#">${pno - 2}</a></li>
                    <li><a href="#">${pno - 1}</a></li>
                    <li><a href="#" class="active">${pno}</a></li>
                    <li><a href="#">${pno + 1}</a></li>
                    <li><a href="#">${pno + 2}</a></li>`
				}
			}if(pageCount<5){
				for(let i=1;i<=pageCount;i++){
					if(pno == i){
						page += `<li><a href="#" class="active">${i}</a></li>`
					}else{
						page += `<li><a href="#">${i}</a></li>`
					}
				}
			}
			page +=`<li><a href="#">&gt;</a></li>`
			$("#page").html(page)
			$("#page").css("width",$("#page>li").length*43)
		})
		$("#items").html(`<li class='err'><p>查询中请稍候...</p></li>`)
	}
	loadPage(1)
	//点击明细查询
	$(".select_all").on("click","a",e=>{
		let $tar = $(e.target)
		if(!$tar.parent().parent().is("#brand,#p_name,#f_name")){
			let id = $tar.parent().parent().attr("id"),
				title = $tar.parent().siblings(".selected-row1").html(),
				name = $tar.html()
			$(".select>.selected>.selected-row2").append($(`<a href="javascript:;" data-id="${id}" class="search"><span>${title}</span><i>${name}</i></a>`))
			$(`#${id}`).removeClass("out")
			loadPage($("#page>li>.active").html())
		}else if($tar.parent().parent().is("#brand")){
			let name = $tar.html()
			breadcrumb.children(":eq(1)").after($(`<li>
						<a href="javascript:;" data-id="brand">${name}</a>
					</li>`))
			loadPage($("#page>li>.active").html())
			$("#brand").removeClass("out")
			$("#f_name").addClass("out")
		}else if($tar.parent().parent().is("#f_name")){
			let name = $tar.html()
			breadcrumb.find("[data-id=brand]").parent().after($(`<li>
						<a href="javascript:;" data-id="f_name">${name}</a>
					</li>`))
			loadPage($("#page>li>.active").html())
			$("#f_name").removeClass("out")
			$("#p_name").addClass("out")
		}else if($tar.parent().parent().is("#p_name")){
			let name = $tar.html()
			breadcrumb.find("[data-id=f_name]").parent().after($(`<li>
						<a href="javascript:;" data-id="p_name">${name}</a>
					</li>`))
			loadPage($("#page>li>.active").html())
			$("#p_name").removeClass("out")
		}
	})
	//点击移除搜索条件
	$(".selected").on("click","[data-id]",e=>{
		let $tar = $(e.target)
		if($tar.is("i,span")){
			$tar = $tar.parent()
		}
		let id = $tar.data("id")
		$tar.remove()
		loadPage($("#page>li>.active").html())
		$(`#${id}`).addClass("out")
	}).on("click",".delete",e=>{
		let $tar = $(e.target)
		$tar.siblings("[data-id]").remove()
		loadPage($("#page>li>.active").html())
		$(".select .select_all li:gt(2)").addClass("out")
	})
	//点击切换页码
	$("#page").on("click","a",e=>{
		e.preventDefault()
		let $tar = $(e.target),
			num = $tar.html()
		if(num === "&gt;"){
			num = parseInt($("#page .active").html())+1

		}else if(num === "&lt;"){
			num = parseInt($("#page .active").html())-1
		}
		loadPage(num)
	})
	//brand/f_name/p_name条件移除事件
	$(".breadcrumb").on("click","[data-id]",e=>{
		let $tar = $(e.target),
			name = $tar.data("id")
		if(name=="f_name"){
			$("[data-id=p_name]").parent().remove()
			$("#p_name").addClass("out")
			if($tar.parent().is(":last-child")){
				$tar.siblings("span").remove()
			}
			loadPage($("#page>li>.active").html())
		}else if(name =="brand"){
			$("[data-id=p_name]").parent().remove()
			$("[data-id=f_name]").parent().remove()
			$("#p_name").removeClass("out")
			$("#f_name").addClass("out")
			if($tar.parent().is(":last-child")){
				$tar.siblings("span").remove()
			}
			loadPage($("#page>li>.active").html())
		}
	})
})