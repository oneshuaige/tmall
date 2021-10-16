$(function () {
  $("main>.wrapper>ul>li").on("click", function () {
    $("main>.wrapper>ul>.active").removeClass("active");
    $(this).addClass("active").siblings().removeClass("active");
    let index = $("main>.wrapper>ul>li").index(this);
    console.log(index);
  });
});
$(function () {
  if ($(".shop-product>.product>.right>.li2>.number").val() == 1) {
    $(".shop-product>.product>.right>.li2>.minus").attr("disabled", true);
  }
  // let count = el.num * parseFloat(el.price).toFixed(2);
  //   $(".shop-product>.product>.right>.li2>.number").val() *
  //   $(".shop-product>.product>.right>.li1>span").html();
  // count = count.toFixed(2);
  $(".shop-product>.product>.right>.li3").html("￥" + count);

  console.log(Number($(".shop-product>.product>.right>.li1>span").html()));
});

//ajax
$(function () {
  let shop = cookie.get("shop");

  if (shop) {
    shop = JSON.parse(shop);

    let idList = shop.map((el) => el.id).join();

    // console.log(idList);

    $.ajax({
      type: "get",
      url: "../tmall/interface/getshop.php",
      data: {
        idList,
      },
      dataType: "json",
    })
      .then((res) => {
        // console.log(res);

        let template = "";

        res.forEach((el, i) => {
          let picture = JSON.parse(el.picture);

          let current = shop.filter((elm) => elm.id === el.id);
          // console.log(current);
          // let count = el.num * parseFloat(el.price).toFixed(2);
          template += `<div class="product">
          <div>
            <input type="checkbox" name="items"/><img src="./${
              picture[0].src
            }" alt="" />
            <a href=""><span>${el.title}</span></a>
          </div>
          <ul class="right">
            <li class="li1"><span>￥${parseFloat(el.price).toFixed(
              2
            )}</span></li>
            <li class="li2">
            <input
              class="product_num"
              id = "${el.id}"
                type="number"
                value="${current[0].num}"
                max="${el.num}" min="1"
              />
              </li>
              <li class="li3">￥${(el.price * current[0].num).toFixed(2)}</li>
            <li class="li4">
              <ul>
                <li><a href="">移入收藏夹</a></li>
                <li><a href="" data-id="${
                  el.id
                }" class="removeItem">删除</a></li>
                <li class="lili3"><a href="">相似宝贝</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>`;
          let count = el.num * parseFloat(el.price).toFixed(2);
          //   $(".shop-product>.product>.right>.li2>.number").val() *
          //   $(".shop-product>.product>.right>.li1>span").html();
          // count = count.toFixed(2);
          console.log($(".shop-product>.product>.right>.li2>#el.id"));
          $(".shop-product>.product>.right>.li3").html("￥" + count);
        });
        // console.log(template);
        $(".shop-product")
          .html(template)
          .find(".removeItem")
          .on("click", function () {
            console.log($(this).attr("data-id"));
            let res = shop.filter((el) => el.id !== $(this).attr("data-id"));
            cookie.set("shop", JSON.stringify(res), 1);
            location.reload();
          });
      })
      .catch((xhr) => {
        console.log(xhr.status);
      });
  }

  $(".allcheck").on("click", () =>
    $("[type=checkbox]:not(:first)").prop(
      "checked",
      $(".allcheck").prop("checked")
    )
  );
  $("[type=checkbox]:not(:first)").on("click", () =>
    $(".allcheck").prop(
      "checked",
      [...$("[type=checkbox]:not(:first)")].every((el) => el.checked)
    )
  );

  //按钮事件
  // $("product-num").on("change", function () {
  //   cookie.set(this);
  // });
  // $(".nimus").on("click", function () {
  //   if ($(".product-num").val() == 1) {
  //     $(".minus").attr("disabled", true);
  //   }
  //   console.log
  //   $(".product-num").val(Number($(".product-num").val()) - 1);
  // });
  // let count = el.num * parseFloat(el.price).toFixed(2);
  // $(".product-num").val() * $(".shop-product>.product>.right>.li1>span").html();
  // count = count.toFixed(2);
  // $(".shop-product>.product>.right>.li3").html("￥" + count);

  // console.log(Number($(".shop-product>.product>.right>.li1>span").html()));
});
const cookie = {
  get(key) {
    if (document.cookie) {
      let cookies = document.cookie.split("; ");
      for (let i in cookies) {
        let item = cookies[i].split("=");
        if (item[0] === key) {
          return item[1];
        }
      }
      return ""; // 遍历结束没有cookie 返回空字符串
    }
  },
  set(key, value, day) {
    if (typeof day === "number") {
      let d = new Date();
      d.setDate(d.getDate() + day);
      document.cookie = `${key}=${value};expires=${d};path=/`;
    } else {
      document.cookie = `${key}=${value};path=/`;
    }

    return this; // 当函数支持链式调用
  },
  remove(key) {
    this.set(key, "", -1);
    return this;
  },
};
