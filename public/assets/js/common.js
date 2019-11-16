$(function () {
    $("#logout").on("click", function () {
        console.log(1);

        //弹出框询问用户是否退出
        var isConfirm = confirm("确定退出吗？");
        if (isConfirm) {
            $.ajax({
                type: 'post',
                url: '/logout',
                success: function () {
                    console.log("退出成功");
                    location.href = 'login.html'
                },
                error: function () {
                    alert('退出失败');
                }
            })
        }
    })
})