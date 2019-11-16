$(function () {
    //表单提交事件
    $("#category-editForm").on('submit', function () {
        //获取表单数据
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function () {
                location.reload();
            },
        })
        //阻止默认提交行为
        return false;
    });

    //查询分类页面列表
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            var html = template("categoryThl", {
                data: response
            });
            $("#categoriesbox").html(html);
        },
    });
    //编辑列表按钮功能
    //点击事件委托
    $("#categoriesbox").on("click", ".edit", function () {
        //获取当前列表的id
        var id = $(this).attr('data-id');
        //发送请求获取数据
        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function (response) {
                var html = template("cotagoryFormThl", response);
                $("#editFormbox").html(html);
            },

        })
    });
    //修改提交事件
    $("#editFormbox").on("submit", "#categoryEditForm", function () {


        // 获取id
        var id = $(this).attr('data-id');
        console.log(id);

        //获取表单数据
        var formData = $(this).serialize();
        console.log(formData);

        //发送请求
        $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function () {
                location.reload();
            },
        });
        return false;
    });
    //删除按钮
    //按钮点击事件
    $("#categoriesbox").on("click", ".delete", function () {
        //获取当前列表的id
        var id = $(this).attr('data-id');
        //发送请求获取数据
        var istrue = confirm('确定删除该分类吗？');
        if (istrue) {
            $.ajax({
                type: 'delete',
                url: '/categories/' + id,
                success: function () {
                    location.reload();
                },
            })
        }
    });


})