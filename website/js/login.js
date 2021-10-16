// import $ from "./library/jquery1";

$(function () {
  $(".qiehuan>li").on("click", function () {
    $(".qiehuan>.display").removeClass("display");
    $(this).addClass("display").siblings().removeClass("display");
  });
});
