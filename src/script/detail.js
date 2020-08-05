;
! function() {
    /* ------------------------------------渲染商品详情---------------------------------------- */
    /* 获取地址栏id */
    var sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: 'http://localhost/2004/Item_zol/php/getsid.php',
        dataType: 'json',
        data: {
            sid: sid
        }
    }).done(function(data) {
        var arr_pic = data.imglist.split(',');
        /* 加载大图片，为放大镜效果做准备 */
        $('#glass-max').find('img').attr('src', data.url);

        const $wares_big_con = $('.wares-big-con');
        const $wares_small_con = $('.wares-small-con');
        const $title = $('.wares-name');
        const $price = $('.wares-price span').eq(1).find('span');
        const $top_title = $('.breadcrumb-wrap .title-top span');

        $title.html(data.title);
        $price.html(data.price);
        $top_title.html(data.title);

        let str1 = '';
        let str2 = '';
        $.each(arr_pic, function(index, value) {
            str1 += `
            <p><img src="${value}" alt=""></p>     
            `
        })
        $.each(arr_pic, function(index, value) {
            str2 += `
            <p><img src="${value}" alt=""></p>
            `
        })
        $wares_big_con.html(str1);
        $wares_small_con.html(str2);

    })

    /* -------------------------------详情商品的放大镜效果------------------ */
    const $glass_max = $('#glass-max');
    const $glass_min = $('#glass-min');
    const $wares_big = $('.wares-big');
    const $img = $('#glass-max img');
    /* 鼠标移入移出盒子 */
    $wares_big.hover(function() {

        $glass_max.show();
        $glass_min.show();
        $wares_big.on('mousemove', function(e) {
            /* 获取鼠标位置 */
            let $left = e.pageX;
            let $top = e.pageY;
            let $leftPosition = $left - $wares_big.offset().left - $glass_min.width() / 2 - 2;
            let $topPosition = $top - $wares_big.offset().top - $glass_min.height() / 2 - 2;
            /* 限定小放大镜可以移动的范围 */
            if ($leftPosition <= 0) {
                $leftPosition = 0;
            } else if ($leftPosition >= $wares_big.width() - $glass_min.width()) {
                $leftPosition = $wares_big.width() - $glass_min.width();
            }
            if ($topPosition <= 0) {
                $topPosition = 0;
            } else if ($topPosition >= $wares_big.height() - $glass_min.height()) {
                $topPosition = $wares_big.height() - $glass_min.height()
            }

            /* 小放大镜盒子移动 */
            $glass_min.css({
                left: $leftPosition + 'px',
                top: $topPosition + 'px'
            })

            /* 大图片移动 */
            $img.css({
                left: -2 * $leftPosition + 'px',
                top: -2 * $topPosition + 'px'
            })
        })
    }, function() {
        $glass_min.hide();
        $glass_max.hide();
    })


    /* -------------------------------------商品详情下面小图的点击效果------------------------------------------- */

    const $move_p = $('#move-p');
    const $left_arrow = $('.wares-left');
    const $right_arrow = $('.wares-right');
    const $move_box = $('.wares-big-con');
    let num = 0;
    $move_p.hover(function() {

        $move_p.find('p').on('click', function() {
            num = $(this).index();
            switch_p();
        })

    })

    /* ----------------------商品详情下面的左右小箭头------------------------------------- */
    $left_arrow.on('click', function() {
        num--;
        switch_p();
    })
    $right_arrow.on('click', function() {
        num++;
        switch_p();
    })

    /* 图片切换函数 */
    function switch_p() {
        if (num <= 0) {
            num = 0;
            $left_arrow.css('border-color', '#ddd')
        } else {
            $left_arrow.css('border-color', '#999')
        }
        if (num >= $move_p.find('p').length - 1) {
            num = $move_p.find('p').length - 1;
            $right_arrow.css('border-color', '#ddd')
        } else {
            $right_arrow.css('border-color', '#999')
        }
        $move_p.find('p').eq(num).css('border', '2px solid #fc002d').siblings('p').css('border', 'none');
        /* 同时改变放大镜盒子里面的图片为当前点击的小图图片 */
        $('#glass-max').find('img').attr('src', $move_p.find('p').eq(num).find('img').prop('src'));
        $move_box.stop(true).animate({ 'left': -num * 450 + 'px' })
    }

    /* -------------------------------------购物车----------------------------------- */

    /* 添加购物车，将数据存入cookie */
    /* 获取cookie数据 */
    var shopSid = [];
    var shopNum = [];

    function obtainCookie() {
        if ($.cookie('goodsSid') && $.cookie('goodsNum')) { //cookie已有数据
            /* 取出cookie数据放入数组 */
            shopSid = $.cookie('goodsSid').split(',');
            shopNum = $.cookie('goodsNum').split(',');
        } else { //cookie里面没有数据
            shopSid = [];
            shopNum = [];
        }
    }

    /* 点击加入'加入购物车'按钮 */
    $('.wares-btn p').on('click', function() {
        obtainCookie(); //获取一次cookie数据
        if (shopSid.indexOf(sid) == -1) {
            /* sid不存在，代表数据不存在，表示商品第一次添加 */
            shopSid.push(sid);
            shopNum.push($('#btn-price').html());
            $.cookie('goodsSid', shopSid.toString(), { expires: 3, path: '/' });
            $.cookie('goodsNum', shopNum.toString(), { expires: 3, path: '/' });
        } else {
            var num = shopSid.indexOf(sid);
            shopNum[num] = parseInt(shopNum[num]) + parseInt($('#btn-price').html());
            $.cookie('goodsNum', shopNum.toString(), { expires: 3, path: '/' });
        }
    })

    /* 点击加减号加减数量 */
    $('#left-btn').on('click', function() {
        let prices = Number($('#btn-price').html());
        prices -= 1;
        if (prices <= 0) {
            prices = 1; //商品数量不允许减为零
        }
        $('#btn-price').html(prices);
    })
    $('#right-btn').on('click', function() {
        let prices = Number($('#btn-price').html());
        prices += 1;
        $('#btn-price').html(prices);
    })

    /* 点击加入购物车还会直接跳转到购物车页面 */
    $('.wares-btn p').on('click', function() {
        alert('添加成功!');
        location.href = 'shoppingCart.html';
    })

}();