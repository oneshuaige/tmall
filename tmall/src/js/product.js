import $ from './library/jquery.js';

let id = location.search.split('=')[1];


$.ajax({
    type: 'get',
    url: '../../interface/getItem.php',
    data: { id },
    dataType: 'json'
}).then(res => {
    let picture = JSON.parse(res.picture);

    let template = `
    <h1>${res.title}</h1>
    <div>
        <img src="../${picture[1].src}">
    </div>
    <div>
        价格:<span>￥</span>${res.price}
    </div>
    <div>
        <input type="number" id="num" value="1" min="1" max="${res.num}">
        <input type="button" value="加入购物车" id="addItem">
    </div>
    <div>
        详情:<br>
        ${res.details}
    </div>
        `;

    $('body').html(template);

}).catch(xhr => {
    console.log(xhr.status);
});