import $ from "./library/jquery.js";
// import './library/tabs.js';

$.ajax({
  type: "get",
  url: "../../interface/getItems.php",
  dataType: "json",
})
  .then((res) => {
    let template = "";
    console.log(111);
    res.forEach((elm, i) => {
      let picture = JSON.parse(elm.picture);
      console.log(picture);
      console.log(111);
      template += `<li class="item">
                          <a href="./product.html?item=${elm.id}">
                              <div class="product-img">
                                  <img src="../${picture[0].src}" alt="">
                              </div>
                              <div class="product-title">
                                  ${elm.title}
                              </div>
                              <div class="product-price">
                                  <span>￥</span> ${elm.price}
                              </div>
                          </a>
                      </li>`;
    });

    $(".list").html(template);
  })
  .catch((xhr) => {
    console.log(xhr.status);
  });
