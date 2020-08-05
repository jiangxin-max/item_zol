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
                    <div id="c-b" sid="${sid}">
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
        $.cookie('goodsSid', '', { expires: -1, path: '/' });
        $.cookie('goodsNum', '', { expires: -1, path: '/' });
    })

    /* -----------------------------物品数量的加减------------------------------------ */

    $cart.on('click', function(e) {
        if ($(e.target).is('span.reduce')) { //数量减操作
            let num = Number($(e.target).siblings().eq(0).html());
            num -= 1;
            if (num <= 0) {
                num = 0;
            }
            $(e.target).siblings().eq(0).html(num);

            /* 数量减少，后面的价钱也同步改变 */
            let count = (num * Number($(e.target).parent().siblings('span.c-b-price').html())).toFixed(2);
            $(e.target).parent().siblings('span.c-b-priceCount').html(count);

            /* 所有商品的总价的价钱也同步改变 */
            let alls = 0;
            $(e.target).parent().parent().siblings().each(function(index, value) {
                alls += Number($(value).find('span.c-b-priceCount').html())
            })
            let total = alls + Number(count)
            $('#total-price').html('￥' + total);

            /* 下面的商品总计减一 */
            let goods_num = Number($('#goods-num').html());
            goods_num--;
            if (goods_num <= 0) {
                goods_num = 0;
            }
            $('#goods-num').html(goods_num);

        } else if ($(e.target).is('span.plus')) { //数量加操作
            let num = Number($(e.target).siblings().eq(1).html());
            num += 1;
            $(e.target).siblings().eq(1).html(num);

            /* 数量增加，后面的价钱改变 */
            let count = (num * Number($(e.target).parent().siblings('span.c-b-price').html())).toFixed(2);
            $(e.target).parent().siblings('span.c-b-priceCount').html(count);

            /* 所有商品的总价的价钱也同步改变 */
            let alls = 0;
            $(e.target).parent().parent().siblings().each(function(index, value) {
                alls += Number($(value).find('span.c-b-priceCount').html())
            })
            let total = alls + Number(count)
            $('#total-price').html('￥' + total);

            /* 下面的商品总计加一 */
            let goods_num = Number($('#goods-num').html());
            goods_num++;
            $('#goods-num').html(goods_num);
        }
    })

    /* 点击删除按钮，删除当前数据 */
    $cart.on('click', function(e) {
        if ($(e.target).is('span#delete')) {
            /* 还要对商品总价做改变 */
            let alls = 0;
            $(e.target).parent().siblings().each(function(index, value) {
                alls += Number($(value).find('span.c-b-priceCount').html())
            })
            $('#total-price').html('￥' + alls);

            /* 全部商品的总数减一 */
            let num = Number($('#all').html());
            num--;
            $('#all').html(num);

            /* 从cookie中删除该商品对应的数据 */
            shopSid = $.cookie('goodsSid').split(','); //将cookie的数据取出来
            shopNum = $.cookie('goodsNum').split(',');
            let $sid = $(e.target).parent().attr('sid'); //获取要删除的数据的id
            if (shopSid.indexOf($sid) != -1) { //找到这个id在数组中的位置，删除它，然后将改变后的数组重新放回cookie
                let id = shopSid.indexOf($sid)
                shopSid.splice(id, 1);
                shopNum.splice(id, 1);
                $.cookie('goodsSid', shopSid.toString(), { expires: 3, path: '/' });
                $.cookie('goodsNum', shopNum.toString(), { expires: 3, path: '/' });
            }

            /* 然后删除该商品 */
            $(e.target).parent().remove();
        }
    })

}();