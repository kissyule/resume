window.onload=function(){
//function ajax({url,type,data,dataType})
  //return new Promise(function(open){})
    //open(xhr.responseText)
  $.ajax({
    url:"../../index",
    type:"get",
    //data:undefined
    dataType:"json",//告诉ajax，将json字符串自动转为对象
    success:function(res) {
        //console.log(res);
        var p = res[0];
        console.log(p)
        var {title, details, price, pic, href} = p;
        //复制<div class="col-md-7" 下的
        var html = `<div class="card border-0 flex-md-row box-shadow h-md-250">
    <div class="card-body d-flex flex-column align-items-start">
      <h5 class="d-inline-block mb-2">${title}</h5>
      <h6 class="mb-5"><a class="text-dark" href="javascript:;">${details}</a></h6>
      <span class="text-primary">¥${price.toFixed(2)}</span>
      <a class="btn btn-primary" href="${href}">查看详情</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" src="${pic}" data-holder-rendered="true">
  </div>`;
        var div = document.querySelector(
            "#main>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(1)"
        );
        div.innerHTML = html;

        var p = res[1];
        var {title, details, price, pic, href} = p;
        //复制<div class="col-md-5" 下的
        var html = `<div class="card border-0 flex-md-row box-shadow h-md-250">
      <div class="card-body d-flex flex-column align-items-start">
        <h5 class="d-inline-block mb-2">${title}</h5>
        <h6 class="mb-5">
          <a class="text-dark" href="javascript:;">${details}</a>
        </h6>
        <span class="text-primary">¥${price.toFixed(2)}</span>
        <a class="btn btn-primary" href="${href}">查看详情</a>
      </div>
      <img class="card-img-right flex-auto d-none d-md-block mt-5" data-src="holder.js/200x250?theme=thumb" src="${pic}" data-holder-rendered="true">
    </div>`;
        var div = document.querySelector(
            "#main>:nth-child(2)>:nth-child(1)>:nth-child(2)>:nth-child(2)"
        );
        div.innerHTML = html;

        var p = res[2];
        var {title, details, price, pic, href} = p;
        //复制<div class="col-md-5" 下的
        var html = `<div class="card border-0 flex-md-row box-shadow h-md-250">
      <div class="card-body d-flex flex-column align-items-start">
        <h5 class="d-inline-block mb-3">${title}</h5>
        <span class="text-primary">¥${price.toFixed(2)}</span>
        <a class="btn btn-primary" href="${href}">查看详情</a>
      </div>
      <img class="card-img-right flex-auto d-none d-md-block mt-5" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="${pic}" data-holder-rendered="true">
    </div>`;
        var div = document.querySelector(
            "#main>:nth-child(2)>:nth-child(1)>:nth-child(3)>:nth-child(1)"
        );
        div.innerHTML = html;

        var html = "";
        for (var p of res.slice(-3)) {
            var {title, href, pic, price} = p;
            html += `<div class="col-md-4 p-0 pl-2">
        <div class="card border-0 text-center">
          <img class="card-img-top" src="${pic}">
          <div class="card-body p-0 pr-1 pl-1">
            <span class="d-inline-block">${title}</span>
            <span class="text-primary small">¥${price.toFixed(2)}</span>
            <a class="btn btn-sm btn-primary" href="${href}">查看详情</a>
          </div>
        </div>
      </div>`
        }
        var div = document.querySelector(
            "#main>:nth-child(2)>:nth-child(1)>:nth-child(3)>:nth-child(2)>:nth-child(1)"
        );
        div.innerHTML = html;
    }
  })
  //http://localhost:3000
}