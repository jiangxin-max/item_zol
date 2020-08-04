;
! function() {
    /* ----------------------获取本地cookie数据------------------------------ */
    var shopSid = [];
    var shopNum = [];
    if ($.cookie('goodsSid') && $.cookie('goodsNum')) {
        shopSid = $.cookie('goodsSid').split(',');
        shopNum = $.cookie('goodsNum').split(',');

        $.each(shopSid, function(index, value) {
            render(shopSid[index], shopNum[index]);
        })

    }

    /* -----------------------------渲染购物车------------------------------------------ */
    const $cart = $('.cart-box-pro-box');
    let str = '';
    let $num = 0;
    let $prices = 0;
    let $all = 0;

    function render(sid, num) {
        $.ajax({
            url: 'http://localhost/2004/Item_zol/php/interface-list.php',
            dataType: 'json'
        }).done(function(data) {

            /* 渲染数据 */
            $.each(data, function(index, value) {
                if (value.sid == sid) {
                    str += `
                    <div id="c-b">
                    <div class="c-b-proImg">
                    <img src="${value.url}" alt="">
                    </div>
                    <span class="c-b-goodsName">${value.title}</span>
                    <span class="c-b-price">${Number(value.price).toFixed(2)}</span>
                    <div class="c-b-proCount">
                        <span class="reduce">-</span>
                        <span class="c-b-proCount-input">${num}</span>
                        <span class="plus">+</span>
                    </div>
                    <span class="c-b-priceCount">${Number(value.price*num).toFixed(2)}</span>
                    <span class="c-b-operation" id="delete">删除</span>
                    </div>
                    `;
                    $num += Number(num);
                    $prices += value.price * num;
                    $all += 1;
                }
            })
            $cart.html(str);
            $('#all').html($all);

            /* 下面的结算栏数据同步更新 */
            $('#goods-num').html($num);
            $('#total-price').html('￥' + $prices)
        })
    }

    /* ----------------------------清空购物车按钮---------------------------- */
    $('#clean').on('click', function() {
        /* 删除存在的结构 */
        $cart.children().remove();

        /* 总计一栏的所有数据清零 */
        $('#goods-num').html(0);
        $('#total-price').html('￥' + 0);

        /* 全部商品的数量清零 */
        $('#all').html(0);

        /* cookie所有数据清零 */
        $.cookie('goodsSid', null, -1);
        $.cookie('goodsNum', null, -1);
    })

    /* -----------------------------物品数量的加减------------------------------------ */
    $cart.on('click', function() {

    })

}();