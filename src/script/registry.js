;
! function($) {
    const user_tel = $('.tel');
    const ver_code = $('.ver-code')
    const password = $('.password');
    const $confirm = $('.password-confirm');
    const form1 = $('.form1');
    let userFlag = false;
    let confirm_pass = false;

    /* 点击输入手机号码 */
    user_tel.on('blur', function() {
        if (user_tel.val()) { //手机号码不为空
            $(this).siblings('p').hide();
            $.ajax({
                type: 'post',
                url: 'http://localhost/2004/Item_zol/php/registry.php',
                dataType: 'json',
                data: {
                    tel: this.value
                }
            }).done(function(data) {
                if (!data) {
                    userFlag = false;
                } else {
                    user_tel.siblings('p').show();
                    user_tel.siblings('p').find('span').text('手机号码已存在');
                }
            })
        } else {
            $(this).siblings('p').show();
            $(this).siblings('p').find('span').text('手机号码不能为空');
        }
    })

    /* 获取验证码 */
    $('.account-node-btn').on('click', function() {
        let str = '';
        for (let i = 0; i < 6; i++) {
            str += Math.round(Math.random() * 9);
        }
        ver_code.val(str);
    })

    /* 验证码不能为空 */
    ver_code.on('blur', function() {
        if (!ver_code.val()) {
            ver_code.siblings('p').show();
            ver_code.siblings('p').find('span').text('验证码不能为空')
        } else {
            ver_code.siblings('p').hide();
        }


    })

    /* 密码不能为空 */
    password.on('blur', function() {
        if (!password.val()) {
            $(this).siblings('p').show();
            $(this).siblings('p').find('span').text('密码不能为空');
            $confirm.prop('disabled', 'disabled');
        } else {
            $(this).siblings('p').hide();
            $confirm.prop('disabled', '');
        }
    })

    /* 确认密码是否一致 */
    $confirm.on('blur', function() {
        if ($confirm.val() != password.val()) {
            $confirm.siblings('p').show();
            $confirm.siblings('p').find('span').text('两次密码不一致');
            confirm_pass = true;
        } else {
            $confirm.siblings('p').hide();
        }
    })

    $confirm.on('change', function() {
        /* 手机号码不为空,验证码不为空，密码均不为空，提交按钮变色 */
        if (user_tel.val() && password.val() && ver_code.val()) {
            $(".account-modify").css({ 'background-color': '#fc002d', 'color': '#fff' });
        }
    })

    /* 用户名重名，或者其他选项不满足条件的情况下，表单阻止被提交 */
    form1.on('click', function() {
        if (userFlag) { //用户名重名
            return false;
        }
        if (confirm_pass) { //确认密码不通过
            return false;
        }
        if (!user_tel.val() || !password.val()) { //用户名和密码为空
            return false;
        }
    })


}(jQuery);