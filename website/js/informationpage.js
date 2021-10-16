// import cookie from "../../jd.com/src/js/library/cookie";
// import $ from "../../jd.com/src/js/library/jquery";
// import cookie from "./library/cookie";
$(function () {
  $(".product-number>.nimus").on("click", function () {
    console.log(1);
    $(".product-number>input").val(
      Number($(".product-number>input").val()) - 1
    );
    if ($(".product-number>input").val() <= 1) {
      $(".product-number>input").val(1);
    }
  });
  $(".product-number>.add").on("click", function () {
    $(".product-number>input").val(
      Number($(".product-number>input").val()) + 1
    );
  });
  //ajax
  let id = location.search.split("=")[1];
  console.log(id);

  $.ajax({
    type: "get",
    url: "../tmall/interface/getItem.php",
    data: { id },
    dataType: "json",
  })
    .then((res) => {
      let picture = JSON.parse(res.picture);

      let template = `
      <div class="product-img"><img src="./${picture[0].src}" alt="" /></div>
             <div class="product-describe">
               <span class="product-name"
                 >${res.title}</span
               >
               <div class="product-price">价格：￥${res.price}</div>
               <div class="product-number">
                 数量：<input type="number" class="num" value="1" min="1" max="${res.num}"/>
               </div>
               <div class="entercar">
                 <a class="btn" href="./shoppingcart.html">加入购物车</a>
               </div>
             </div>
        `;

      $("main>.wrapper")
        .html(template)
        .find(".btn")
        .on("click", function () {
          addItem(res.id, $(".num").val());
        });
    })
    .catch((xhr) => {
      console.log(xhr.status);
    });
});
function addItem(id, num) {
  let shop = cookie.get("shop");
  let pro = { id, num };

  if (shop) {
    // 判断是否已经有属性
    shop = JSON.parse(shop); // cookie中已经有数据情况 将数据转成数组
    // shop.push(product);

    // 判断当前商品在购物车数据中是否已经存在 如果存在则修改数量 不存在则添加
    if (shop.some((el) => el.id == id)) {
      let index = shop.findIndex((elm) => elm.id == id); // 获得当前商品id在数组中的索引
      let count = parseInt(shop[index].num); // 获得当前数量
      count += parseInt(num);
      shop[index].num = count;
    } else {
      shop.push(pro);
    }
  } else {
    shop = [];
    shop.push(pro);
  }

  cookie.set("shop", JSON.stringify(shop), 1);
}
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
