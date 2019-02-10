function init () {
    bindEvent();
    readCookie();
}
init();

// 读取cookie
function readCookie () {
    $(".user-name").find("input").val($.cookie("user_name"));
    $(".password").find("input").val($.cookie("password"));
}

function bindEvent () {
    $(".btn").find("div").eq(0).on("click", function () {
        var userMsg = getUserMsg()
        send(userMsg.userName, userMsg.password);
    })
}

// 发送ajax
function send (userName, password) {
    $.ajax({
        type: 'GET',
        url: `/serLogin?userName=${userName}&password=${password}`,
        success: function(res) {
            console.log(JSON.parse(res)[0])
            if (JSON.parse(res)[0] && JSON.parse(res)[0].password == password) {
                alert("登录成功，欢迎您" + userName);
                // 设置cookie
                $.cookie("user_name", userName);
                $.cookie("password", password);
                if(userName !== "admin") {
                    $(location).attr("href", "index.html");
                } else {
                    $(location).attr("href", "adminIndex.html");
                }
            } else {
                alert("用户名或密码错误");
                $(".password").find("input").val('');
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// 获取用户名密码
function getUserMsg () {
    var userMsg = {};
    userMsg.userName = $(".user-name").find("input").val();
    userMsg.password = $(".password").find("input").val();
    return userMsg;
}