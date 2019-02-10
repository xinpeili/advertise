if($.cookie("user_name")) {

    // 获取用户名
    $(".user-name-title").html("欢迎您：" + $.cookie("user_name"));

    function init() {
        sendAjax("GET", `/serAllPic`, function (res) {
            renderData(JSON.parse(res))
        })
    }

    // 请求数据
    function sendAjax(type, url, success) {
        $.ajax({
            type: type,
            url: url,
            success: success,
            error: function (err) {
                console.log(err);
            }
        })
    }

    // 渲染数据
    function renderData(data) {
        var str = '';
        data.forEach((ele, index) => {
            Index = index;
            str += `<p>
                        图片${ele.id}：<input value="${ele.src}" style="width: 300px;display: inline-block;" type="text" class="form-control pic">
                        标题${ele.id}：<input value="${ele.title}" style="width: 100px;display: inline-block;" type="text" class="form-control title">
                        描述${ele.id}：<input value="${ele.desc}" style="width: 300px;display: inline-block;" type="text" class="form-control desc">
                    </p>`
        });
        str += '<button type="button" class="btn btn-default" disabled="disabled">提交更改</button>'
        $(".content").html(str);
        bindEvent(data);
    }

    function bindEvent(data) {
        data.forEach((ele, index) => {
            for(var i = 0; i < 3; i ++) {
                $(".content p").eq(index).find("input").eq(i).on("input", function () {
                    if(isSubmit(data)) {
                        // 去除disabled
                        $('.content').find("button").removeAttr("disabled");
                    } else {
                        $('.content').find("button").attr("disabled", "disabled");
                    }
                })
            }
        })
        $('.content').find("button").on("click", function () {
            alert("提交成功");
        })
    }

    // 判断是否能够提交
    function isSubmit(data) {
        var flag = true;
        data.forEach((ele, index) => {
            if (ele.src === $(".content").find(".pic").eq(index).val() && ele.title === $(".content").find(".title").eq(index).val() && ele.desc === $(".content").find(".desc").eq(index).val()) {
                flag = flag && true;
            } else {
                flag = flag && false;
            }
        })
        return !flag;
    }

    init();
} else {
    alert("请先登录");
    $(location).attr("href", "login.html");
}