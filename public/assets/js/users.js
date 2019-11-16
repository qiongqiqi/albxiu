//用户新增
$(function () {
    $('#userForm').on('submit', function () {
        // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
        var formData = $(this).serialize();
        // 向服务器端发送添加用户的请求
        $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function () {
                // 刷新页面
                location.reload();
            },
            error: function () {
                alert('用户添加失败')
            }
        })
        // 阻止表单的默认提交行为
        return false;
    });



    // 当用户选择文件的时候
    $('#modifybox').on('change', '#avatar', function () {
        // 用户选择到的文件
        // this.files[0]
        var formData = new FormData();
        formData.append('avatar', this.files[0]);

        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            // 告诉$.ajax方法不要解析请求参数
            processData: false,
            // 告诉$.ajax方法不要设置请求参数的类型
            contentType: false,
            success: function (response) {
                // console.log(response)
                // 实现头像预览功能
                $('#preview').attr('src', response[0].avatar);
                $('#hiddenAvatar').val(response[0].avatar)
            }
        })
    });

    //查询用户,用户列表
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (response) {
            // console.log(response);
            var html = template('userformThl', {
                data: response
            });
            $("#userbox").html(html);
        },
        error: function () {}
    });
    //修改用户信息
    //绑定click事件
    $('#userbox').on('click', '.modify', function () {
        var id = $(this).attr('data-id');
        // console.log(id);

        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function (response) {
                // console.log(response);
                var html = template('modifyThl', response);
                $('#modifybox').html(html);
            },
        })
    });
    //修改的form表单绑定事件
    $("#modifybox").on("submit", "#modifyForm", function () {
        //获取表单数据
        var formData = $(this).serialize();
        var id = $(this).attr('data-id')
        // console.log(formData);
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function (response) {
                location.reload()

            },

        })
        //阻止默认提交
        return false;
    });
    //删除功能
    //绑定并获取删除按钮
    $('#userbox').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        var issure = confirm('你确定要删除吗？');
        if (issure) {
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function () {
                    location.reload()
                },
            })

        }
    });
    //选择框
    // 获取全选按钮
    var selectAll = $('#selectAll');
    // 获取批量删除按钮
    var deleteMany = $('#deleteMany');
    selectAll.on('change', function () {
        //当前状态
        var status = $(this).prop('checked');
        // 批量选择是否隐藏
        status ? deleteMany.show() : deleteMany.hide();
        //tbody的被选择
        $('.userStatus').prop('checked', selectAll.prop('checked'));
    });
    //tbody的单选框 委托事件
    $('#userbox').on('change', '.userStatus', function () {
        //tbody所有选框的数量in
        var inputs = $('#userbox').find('.userStatus');
        if (inputs.length == inputs.filter(':checked').length) {
            selectAll.prop('checked', true);
        } else {
            selectAll.prop('checked', false);
        }
        if (inputs.filter(':checked').length > 0) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }


    })

    //批量删除
    //按钮绑定事件
    deleteMany.on('click', function () {

        var isconfirm = confirm('确定删除用户信息吗？');
        if (isconfirm) {
            var ids = [];
            var chechedUser = $('#userbox').find('.userStatus').filter(':checked');
            chechedUser.each((index, element) => {
                ids.push($(element).attr('data-id'));
            });
            // console.log(ids);

            $.ajax({
                type: 'delete',
                url: '/users/' + ids.join('-'),
                success: function () {
                    location.reload();
                },
            })
        }


    })




})