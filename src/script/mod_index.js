define([
    'jquery'
], function($) {
    return {
        init: function() {
            /* ---------------------导航栏商品列表效果--------------------------- */
            const $span = $('.goods-items .goods-name');
            const $list_box = $('.goods-items .goods-box');
            const $li = $('.goods-items');
            $li.on('mouseover', function() {
                /* 其他的详细列表隐藏 */
                $list_box.hide();

                /* 当前对应列表显示 */
                $list_box.eq($(this).index()).show();
                /* 给当前li添加上类 */
                $(this).addClass('active');
                /* 移出时移除这个类 */
                $li.on('mouseout', function() {
                    $(this).removeClass('active');
                    $list_box.eq($(this).index()).hide()
                })
            })
            $list_box.mouseleave(function() {
                $(this).hide();
            })

            /* ------------------------轮播图效果----------------- */
            const $slide = $('.slide');
            const $spans = $('.slide .circle span');
            const $aLi = $('.slide .a-img');
            const $prev = $('.slide .prev');
            const $next = $('.slide .next');
            let $index = 0;
            let timer_slide = null;

            function slideSwitch() {
                $spans.eq($index).addClass('activeSpan').siblings('span').removeClass('activeSpan');
                $aLi.eq($index).addClass('activeImg').siblings('.slide .a-img').removeClass('activeImg');
            }
            /* 小圆圈点击轮播 */
            $spans.on('click', function() {
                $index = $(this).index();
                slideSwitch();
            })

            /* 点击向右轮播 */
            $next.on('click', function() {
                $index++;
                if ($index > $aLi.length - 1) {
                    $index = 0;
                }
                slideSwitch();
            })

            /* 点击向左轮播 */
            $prev.on('click', function() {
                $index--;
                if ($index < 0) {
                    $index = $aLi.length - 1;
                }
                slideSwitch();
            })

            /* 自动轮播 */
            autoSwitch();

            function autoSwitch() {
                timer_slide = setInterval(() => {
                    $next.click();
                }, 3000);
            }

            /* 鼠标移入移出轮播 */
            $aLi.on('mouseover', function() {
                clearInterval(timer_slide);
            })
            $aLi.on('mouseout', function() {
                autoSwitch()
            })

            /* ---------------------------------渲染首页数据----------------------------------- */
            const $oUl = $('.category-content-list')
            $.ajax({
                url: 'http://10.31.163.30/2004/Item_zol/php/interface-index.php'
            }).done(function(data) {
                /* 获取数据，但是数据是数组对象形式的字符串，转换一下 */
                var data = JSON.parse(data);
                let str = '';
                /* 渲染列表 */
                $.each(data, function(index, value) {
                    str += `
            <li class="category-content-product-li">
            <a href="javascript:;" class="category-content-product-li">
                <div class="category-content-product-img-box">
                    <img src="${value.url}" alt="">
                </div>
                <p class="product-name">${value.title}</p>
                <p class="product-price">￥${value.price}</p>
            </a>
        </li>
            `
                })
                $oUl.html(str);
            })

            /* ----------------------------------------------商品列表的图片放大效果------------------------------------------- */
            const $ulList = $('.category-content-list')
            const $a = $('.category-content-product-li')

            const $Img = $('.category-content-product-img-box img');
            $ulList.hover(function() {
                $ulList.find('.category-content-product-img-box img').hover(function() {
                    $(this).css({ transform: 'scale(1.2,1.2)', transition: '0.5s' })
                }, function() {
                    $(this).css({ transform: 'scale(1,1)' })
                })
            })
        }
    }
});