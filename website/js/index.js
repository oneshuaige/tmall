//轮播图JS
$(document).ready(function () {
  //Initiazile plugin with your preferences
  $(".mySlideshow").edslider({
    width: "2200",
    height: "500",
  });
});
//换一批JS
window.onload = function () {
  var clickTimes = 1;

  //总列数
  var lineCount = 10;

  var btnRefresh = document.querySelector("#btnRefresh");
  var iconRefresh = document.querySelector(".iconRefresh");

  var img3DList = document.querySelectorAll(".img-3d");
  var len = img3DList.length;

  btnRefresh.onclick = function () {
    iconRefresh.style.transition = ".3s linear";
    iconRefresh.style.transform = "rotate(" + 360 * clickTimes + "deg)";

    for (var i = 0; i < len; i++) {
      var colNum = parseInt(i / lineCount);
      var rowNum = i % lineCount;
      var delayTime = (colNum + rowNum) * 100;

      img3DList[i].style.transition = ".3s " + delayTime + "ms linear";
      img3DList[i].style.transform = "rotateY(" + 180 * clickTimes + "deg)";
    }

    clickTimes++;
  };
};
//选项卡JS
$(function () {
  $("header>.third>.wrapper>ul>li").on("mouseenter", function () {
    let index = $("header>.third>.wrapper>ul>li").index(this);
    $("header>.third>.wrapper>div")
      .eq(index + 1)
      .addClass("display")
      .siblings()
      .removeClass("display");
    $(this).addClass("active").siblings().removeClass("active");
    // console.log(index);
  });
  $("header>.third>.wrapper>ul>li").on("mouseout", function () {
    let index = $("header>.third>.wrapper>ul>li").index(this);
    $(this).removeClass("active");
    $("header>.third>.wrapper>div")
      .eq(index + 1)
      .removeClass("display");
  });
  //ajax数据库请求
  $.ajax({
    type: "get",
    url: "../tmall/interface/getItems.php",
    dataType: "json",
  })
    .then((res) => {
      let template = "";
      console.log(111);
      res.forEach((elm, i) => {
        let picture = JSON.parse(elm.picture);
        console.log(picture);
        template += `<li class="item-title">
        <a href="./informationpage.html?item=${elm.id}"
          ><img src="./${picture[0].src}" alt="" /><span class="describe"
            >${elm.title}</span
          ><span class="price">￥${elm.price}</span></a
        >
      </li>`;
      });
      $("main>.wrapper>.mainer>.items1").html(template);
    })
    .catch((xhr) => {
      console.log(111);
      console.log(xhr.status);
    });
});
