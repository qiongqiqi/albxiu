$(function () {

    // 分类选择点击事件
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            // console.log(response);
            var html = template("optionsThl", {
                data: response
            });
            $("#category").html(html);

        },
    })
    //图片上传 需要委托事件

    $("#feature").on("change", function () {
        //获取图片信息
        var file = this.files[0];
        // 创建formData对象 实现二进制文件上传
        var formData = new FormData();
        // 将管理员选择到的文件追加到formData对象中
        formData.append('cover', file);

        // console.log(formData);
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // console.log(response);
                $(".thumbnail").attr("src", response[0].cover).show();
                $("#hiddenThumbnail").val(response[0].cover);
            },
            error: function () {
                alert('图片上传失败')
            }
        })
    });
    //文章创建表单提交
    $("#postaddForm").on("submit", function () {

        var formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function () {
                // 文章添加成功 跳转到文章列表页面
                location.href = '/admin/posts.html'
            }
        })

        return false;
    });


})