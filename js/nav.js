$(() => {
	const titleHeight = 50
    $.ajax({
	    type:"GET",
        url:"nav.html",
	    xhrFields:{withCredentials:true}
    }).then(html=>{
        $('#nav').html(html)
        navShow()
        $(window).scroll(navShow)
	    //电梯点击事件
        $(".nav-lf a").click(e=>{
            let $tar = $(e.target)
            let num = $tar.parent().parent().index()/2
            switch(num){
                case 0:
                	floor($("body").find(".star-goods").offset().top - titleHeight)
                    break
                case 1:
                	floor($("body").find(".floor-1").offset().top - titleHeight)
                    break
                case 2:
                	floor($("body").find(".floor-2").offset().top - titleHeight)
                    break
                case 3:
                	floor($("body").find(".floor-3").offset().top - titleHeight)
                    break
                case 4:
                	floor($("body").find(".floor-4").offset().top - titleHeight)
                    break
                case 5:
                	floor($("body").find(".floor-5").offset().top - titleHeight)
                    break
                case 6:
                	floor($("body").find(".floor-6").offset().top - titleHeight)
                    break
            }
        })
	    //回到顶部
	    $(".nav-all>.nav-rt>li>.sort-list-6").click(e=>{
		    e.preventDefault()
		    floor(0)
	    })
    })
	//楼层移动方程
    function floor(offsetTop){
        $("html,body").stop(true).animate({
            scrollTop:offsetTop
        },500)
    }
    //nav显示
    function navShow() {
    	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    	if (scrollTop > 34 && scrollTop < $('footer').offset().top - document.documentElement.clientHeight) {
            $(".nav-rt").addClass("out")
        } else {
        	$(".nav-rt").removeClass("out")
        }
        if($("body .floor-all").length!==0){
	        if (scrollTop > $(".star-goods").offset().top - titleHeight*6 && scrollTop < $(".floor-6").offset().top - titleHeight) {
		        $(".nav-lf").addClass("out")
	        }else{
		        $(".nav-lf").removeClass("out")
	        }
        }

    }
})