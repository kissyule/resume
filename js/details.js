window.onload=function(){
  var lid=location.search.slice(5);
  $.ajax({
    url:"../../details",
    type:"get",
    data:"lid="+lid,
    dataType:"json",
      success:function(res) {
          console.log(res);
          var {product, specs, pics} = res;
          var {title, subtitle, price, promise} = product;
          var h6 = document.querySelector(
              "#details>h6:first-child"
          );
          h6.innerHTML = title;
          var nextH6 = h6.nextElementSibling;
          nextH6.children[0].innerHTML = subtitle;
          var nextDiv = nextH6.nextElementSibling;
          nextDiv.children[0].children[1].innerHTML = "¥" + price.toFixed(2);
          nextDiv.children[1].children[1].innerHTML = promise;

          var html = "";
          for (var sp of specs) {
              html += `<a class="btn btn-sm btn-outline-secondary ${lid == sp.lid ? 'active' : ''}" href="product_details.html?lid=${sp.lid}">${sp.spec}</a>`
          }
          nextDiv.nextElementSibling
              .nextElementSibling
              .children[1].innerHTML = html;
          // 小图，导览
          var html = "";
          for (var p of pics) {
              var {sm, md, lg} = p;
              html += `<li class="float-left p-1">
          <img src="${sm}" data-md="${md}" data-lg="${lg}">
        </li>`;
          }
          var ulImgs = document.querySelector(
              "#preview>div>div:last-child ul"
          )
          ulImgs.innerHTML = html;
          ulImgs.style.width = `${pics.length * 62}px`;

          // 左右箭头链接
          var leftBtn = ulImgs.parentNode.previousElementSibling;
          var rightBtn = ulImgs.parentNode.nextElementSibling;
          if (pics.length <= 4) {
              rightBtn.className += " disabled";
          }

          // 点击右箭头，图片左移
          rightBtn.onclick = function () {
              var btn = this;
              console.log(22);
              if (btn.className.indexOf("disabled") == -1) {
                  moved++;
                  ulImgs.style.marginLeft = `-${moved * 62}px`;
                  leftBtn.className = leftBtn.className.replace("disabled", "");
                  if (pics.length - 4 == moved) {
                      btn.className += " disabled";
                  }
              }
          }
          // 点击左箭头，图片右移
          var moved = 0;
          leftBtn.onclick = function () {
              var btn = this;
              console.log(11);
              if (btn.className.indexOf("disabled") == -1) {
                  moved--;
                  ulImgs.style.marginLeft = `-${moved * 62}px`;
                  rightBtn.className =
                      rightBtn.className.replace("disabled", "");
                  if (moved == 0) {
                      btn.className += " disabled";
                  }
              }
          }
          //放大镜效果
          var mImg = document.querySelector(
              "#preview>div>img"
          );
          var lgDiv = document.getElementById("div-lg");
          mImg.src = pics[0].md;
          lgDiv.style.backgroundImage = `url(${pics[0].lg})`;

          //页面展示的中图随其下的下图的改变而改变
          //使用鼠标移入事件
          //使用冒泡
          //使用其父级ulImgs（上面声明过的）
          //getAttribute：返回指定属性的属性值
          ulImgs.onmouseover = function (e) {
              if (e.target.nodeName == "IMG") {
                  var img = e.target;
                  mImg.src = img.getAttribute("data-md");
                  lgDiv.style.backgroundImage = `url(${img.getAttribute("data-lg")})`;
              }
          }
          //完整放大镜效果
          //mask为页面中淡黄色的图片选择区域
          var mask = document.getElementById("mask");
          //super-mask为保护mask和img的一个同尺寸的div
          var sMask = document.getElementById("super-mask");
          //移入事件
          sMask.onmouseover = function () {
              //lgDiv是前面声明过的，为右侧放大图的显示区域
              //d-none为boot的class，为disp:none
              lgDiv.className = lgDiv.className.replace("d-none", "");
              mask.className = mask.className.replace("d-none", "");
          }
          //移出事件
          sMask.onmouseout = function () {
              // d-none，前的空格为防止其前面还有别的class
              lgDiv.className += " d-none";
              mask.className += "d-none";
          }
          //为左侧图片的尺寸为352*352，其中心为176*176
          var msize = 176;
          //当鼠标移入super-mask时
          //绑定鼠标在页面所在位置
          //使用冒泡
          sMask.onmousemove = function (e) {
              //offset为具元素的距离
              //由于在css中设置mask的区域为176*176
              //故其中心在其尺寸的一半
              var left = e.offsetX - msize / 2;
              var top = e.offsetY - msize / 2;
              //防止mask超出lgDiv范围！
              //主要分两种情况，即top和left
              //而top和left没有又分为三种情况，即[0,180],(-∞，0)，(180,+∞)三种
              //当top满足时
              if (top > 0 && top < 180) {
                  //top可随意运动
                  mask.style.top = `${top}px`;
                  //当left满足时
                  if (left > 0 && left < 180) {
                      //left可随意运动
                      mask.style.left = `${left}px`;
                      //left<0时
                  } else if (left < 0) {
                      //固定left的位置
                      mask.style.left = `0px`;
                  } else {
                      mask.style.left = `180px`;
                  }
                  //当top>180时
              } else if (top > 180) {
                  //top固定位置
                  mask.style.top = `180px`;
                  if (left > 0 && left < 180) {
                      mask.style.left = `${left}px`;
                  } else if (left < 0) {
                      mask.style.left = `0px`;
                  } else {
                      mask.style.left = `180px`;
                  }
                  //当top<0时
              } else {
                  //top固定位置
                  mask.style.top = `0px`;
                  if (left > 0 && left < 180) {
                      mask.style.left = `${left}px`;
                  } else if (left < 0) {
                      mask.style.left = `0px`;
                  } else {
                      mask.style.left = `180px`;
                  }
              }

              //右侧大图显示的尺寸设置
              //根据在mask上的移动距离，通过两张图片的比例可得
              lgDiv.style.backgroundPosition = `-${16 / 7 * left}px -${16 / 7 * top}px`;
          }
      }
  })
}//地址: http://localhost:3000/product_details.html?lid=1