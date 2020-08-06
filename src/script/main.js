/* 配置第三方文件 */
require.config({
    paths: {
        'jquery': 'https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min',
        'cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
    }
});

/* 加载模块 */
require(['jquery'], function($) {
    let mod = $('#currentPage').attr('currentMod');
    if (mod) {
        //如果mod存在，加载对应的模块
        require([mod], function(modList) {
            modList.init();
        });
    }
});