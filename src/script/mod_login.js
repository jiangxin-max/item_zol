define([
    'jquery',
    './sha1'
], function($) {
    return {
        init: function() {
            $('#submit').on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.163.30/2004/Item_zol/php/login.php',
                    data: {
                        tel: $('#username-input').val(),
                        pass: hex_sha1($('#password-input').val())
                    }
                }).done(function(data) {

                    if (data) {
                        location.href = "index.html";
                        localStorage.setItem('username', $('#username-input').val());
                    } else {
                        $('#password-input').val('');
                        alert('用户名或者密码错误');
                    }
                });
            });
        }
    }

});