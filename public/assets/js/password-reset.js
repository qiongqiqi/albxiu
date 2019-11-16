$('#pwdForm').on('change', function () {
    var oldpw = $('#old').val();
    var newpd = $('#password').val();
    var confirmpw = $('#confirm').val();

    if (oldpw.trim().length == 0) {
        alert('请输入密码');
        return;
    };
    if (newpd.trim().length == 0) {
        alert('请输入新密码');
        return;
    }
    if (confirmpw.trim().length == 0) {
        alert('请输入新密码');
        return;
    }
    if (confirmpw === newpd) {
        alert('输入密码不一致');
        return;
    }
})
//提交事件
$("#pwdForm").on("submit", function () {

    //获取表单提交内容
    var formData = $(this).serialize();
    //发送请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function (response) {
            location.href = 'login.html'
        },
        error: function (error) {
            alert('密码修改失败')
        }
    })
    return false;
})