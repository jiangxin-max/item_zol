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

    /* 排序初值初始化 */
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    let prev = null;
    let next = null;

    $.ajax({
        url: 'http://localhost/2004/Item_zol/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        str = '';
        $.each(data, function(index, value) {
            str += `
            <li>
            <a href="detail.html?sid=${value.sid}" class="pic">
                <img class="lazy" data-original="${value.url}" alt="">
            </a>
            <div class="title">
                <a href="detail.html?sid=${value.sid}">
                    ${value.title}
                  </a>
            </div>
            <div class="price-bar clearfix">
                <span class="price">
                    <em class="price-mark">￥</em><span>${value.price}</span>
                </span>
                <span class="shopping"></span>
            </div>
        </li>
            `
        })
        $oUl.html(str);

        /*  添加懒加载 */
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        /* 将渲染出来的li元素放入数组中 */
        $oUl.find('li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });

    })

    /* 分页效果 - 插件实现 */
    $('.page').pagination({
        pageCount: 3, //总的页数
        jump: true, //开启跳转到指定的页数
        prevContent: '上一页',
        nextContent: '下一页',

        callback: function(api) {

            $.ajax({
                url: 'http://localhost/2004/Item_zol/php/listdata.php',
                data: { //将获取的页码给后端
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $str = '';
                $.each(data, function(index, value) {
                    $str += `
                    <li>
                    <a href="detail.html?sid=${value.sid}" class="pic">
                        <img class="lazy" data-original="${value.url}" alt="">
                    </a>
                    <div class="title">
                        <a href="detail.html?sid=${value.sid}">
                            ${value.title}
                          </a>
                    </div>
                    <div class="price-bar clearfix">
                        <span class="price">
                            <em class="price-mark">￥</em><span>${value.price}</span>
                        </span>
                        <span class="shopping"></span>
                    </div>
                </li>
                    `;
                });

                $oUl.html($str);

                /*  添加懒加载 */
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                //将页面的li元素加载到两个数组中
                $oUl.find('li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

            })
        }
    });


    /* 排序 */
    /* 默认排序 */
    $('.sort-tab-item').eq(0).on('click', function() {
        $(this).addClass('activeLi').siblings('.sort-tab-item').removeClass('activeLi');
        $.each(array_default, function(index, value) {
            $oUl.append(value);
        });
    });

    /* 升序排序 */
    $('.sort-tab-item').eq(1).on('click', function() {
        $(this).addClass('activeLi').siblings('.sort-tab-item').removeClass('activeLi');

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                //取出array的价格，price进行排序
                prev = parseFloat(array[j].find('span.price span').html());
                next = parseFloat(array[j + 1].find('span.price span').html());

                //通过价格的判断，改变li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        //换完li位置，进行渲染。
        $.each(array, function(index, value) {
            $oUl.append(value);
        });
    });

    /* 降序 */
    $('.sort-tab-item').eq(2).on('click', function() {
        $(this).addClass('activeLi').siblings('.sort-tab-item').removeClass('activeLi');

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('span.price span').html());
                next = parseFloat(array[j + 1].find('span.price span').html());

                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //换完li位置，进行渲染。
        $.each(array, function(index, value) {
            $oUl.append(value);
        });
    })

    /* -------------------------------------商品列表栏添加样式----------------------------------------- */
    $oUl.on('mouseover', function(e) {
        if ($(e.target).is('li')) {
            $(e.target).on('mouseover', function() {
                $(e.target).css({ 'box-shadow': '3px 3px 3px 3px #ccc' });
                $(e.target).find('a').css({ transform: 'scale(1.1,1.1)', transition: '0.5s' })
            })
            $(e.target).on('mouseout', function() {
                $(e.target).css({ 'box-shadow': 'none' })
                $(e.target).find('a').css({ transform: 'scale(1,1)' })
            })
        }
    })

}(jQuery);