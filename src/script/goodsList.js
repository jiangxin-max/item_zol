;
! function($) {
    /* ---------------------------------------导航栏商品列表显示与隐藏------------------------------------------ */
    const $head = $('.nav1-category');
    const $head_box = $('.category');
    const $li = $('.category-list li');
    const $liBox = $('.category-list li div');
    $head.on('mouseover', function() {
        $head_box.show()
    })
    $li.on('mouseover', function() {
        $(this).addClass('category-item-active').siblings('.category-list li').removeClass('category-item-active')
        $liBox.hide();
        $liBox.eq($(this).index()).show();

    });
    $li.on('mouseout', function() {
        $liBox.hide()
    })
    $head.on('mouseout', function() {
        $head_box.hide()
    })

    /* -------------------------------------------分类栏添加样式--------------------------------------- */
    const $aLi = $('.filter-list a').not('.not');
    $aLi.hover(function() {
            $(this).addClass('current').siblings('.filter-list a').not('.not').removeClass('current')
        }, function() {
            $aLi.removeClass('current')
        })
        /* -------------------------------------------------分类栏打开收缩------------------------------------------ */
    const $more_box = $('.filter-box-inner');
    const $more = $('.filter-box p');
    let flag = true;
    $more.on('click', function() {
        if (flag) {
            $more_box.addClass('unfold');
            $(this).removeClass('morebtn').addClass('open-up');
            $(this).find('span').html('收起');
            flag = false;
        } else {
            $more_box.removeClass('unfold');
            $(this).removeClass('open-up').addClass('morebtn');
            $(this).find('span').html('更多');
            flag = true;
        }

    })


    /* -------------------------------------------渲染商品列表页----------------------------------------------- */

    const $oUl = $('.goods-list1');
    $.ajax({
            url: 'http://localhost/2004/Item_zol/php/interface-list.php?sid=',
            dataType: 'json'
        }).done(function(data) {
            str = '';
            $.each(data, function(index, value) {
                str += `
            <li>
            <a href="detail.html?sid=${value.sid}" class="pic">
                <img src="${value.url}" alt="">
            </a>
            <div class="title">
                <a href="detail.html?sid=${value.sid}">
                    ${value.title}
                  </a>
            </div>
            <div class="price-bar clearfix">
                <span class="price">
                    <em class="price-mark">￥</em>${value.price}
                </span>
                <span class="shopping"></span>
            </div>
        </li>
            `
            })
            $oUl.html(str);
        })
        /* -------------------------------------商品列表栏添加样式----------------------------------------- */
    $oUl.hover(function() {
        $oUl.find('li').hover(function() {
            $(this).css({ 'box-shadow': '3px 3px 3px 3px #ccc' })
            $(this).find('img').css('width', '105%')
        }, function() {
            $(this).css({ 'box-shadow': 'none' })
            $(this).find('img').css('width', '100%')
        })
    })
}(jQuery);