;
! function() {
    $('#submit').on('click', function() {
        $.ajax({
            type: 'post',
            url: 'http://localhost/2004/Item_zol/php/login.php',
            data: {
                tel: $('#username-input').val(),
                pass: hex_sha1($('#password-input').val())
            }
        }).done(function(data) {
            console.log(data);
            if (data) {
                location.href = "Home.html";
                localStorage.setItem('username', $('#username-input').val());
            } else {
                $('#password-input').val('');
                alert('用户名或者密码错误');
            }
        });
    });
}()