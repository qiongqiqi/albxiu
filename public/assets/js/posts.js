//文章展示
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        //文章列表
        var html = template("postlistThl", response);
        $("#postslistbox").html(html);
        //分页
        var page = template("pageThl", response);
        $("#pagebox").html(page);
    },
});

//分页功能
function changePage(param) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: param
        },
        success: function (response) {
            var html = template("postlistThl", response);
            $("#postslistbox").html(html);
            var page = template("pageThl", response);
            $("#pagebox").html(page);

        },

    })
};
//获取分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template("categoriesThl", {
            data: response
        });
        $("#categoryStbox").html(html);

    },
});
// 文章筛选
$("#selectForm").on("submit", function () {
    // 获取表单数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response);
            var html = template("postlistThl", response);
            $("#postslistbox").html(html);
            //分页
            var page = template("pageThl", response);
            $("#pagebox").html(page);
        },

    });
    return false;
});

//