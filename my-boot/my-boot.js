if(typeof jQuery!=="function")
	throw new Error("my-ui依赖于jquery,请先引入jquery.js")
else{
	/******************为下拉列表添加事件************************/
	$(()=>{
		let $parent=$(".dropdown:has([data-toggle=dropdown])")
			$parent.hover(function(){
			let $parent=$(this)
				$parent.children(".dropdown-menu").toggleClass("in")
		})
	})
	/******************为手风琴效果添加事件**********************/
	$(()=>{
		$(".accordion").on("click","[data-toggle=collapse]",e=>{
			$(e.target).next(".content").toggleClass("in")
			.siblings(".content").removeClass("in")
			})
	})
	/******************为标签页效果添加行为**********************/
	$(()=>{
		$(".tabs:has([data-toggle=tab])")
		  .on("click","[data-toggle=tab]",e=>{
		  var $tar=$(e.target);
		  if(!$tar.parent().is(".active")){
			$tar.parent().addClass("active")
			  .siblings().removeClass("active");
			var id=$tar.attr("href");
			$(id).addClass("active")
			  .siblings().removeClass("active");
		  }
		})
	})
}