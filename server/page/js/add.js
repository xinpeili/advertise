var userName = $.cookie("user_name")
if (userName) {
    // 获取用户名
    $(".user-name-title").html("欢迎您：" + $.cookie("user_name"));
    
    $(".user-name .box").find("input").attr("placeholder", userName);

    $(".content").find("button").on("click", function () {
        var user_name = $.cookie("user_name"),
            title = $(".title input").val(),
            company = $(".company input").val(),
            type = $(".type input").val(),
            target = $(".target input").val(),
            about = $(".about textarea").val();
        var file = document.getElementById("files").files[0];
        var form = new FormData();
        form.append("file", file)
        
        if (title && company && type && target && about){
            var xhr = new XMLHttpRequest();
            xhr.open("post",`/addAdMsg?user_name=${user_name}&title=${title}&company=${company}&type=${type}&target=${target}&about=${about}`,true);
            xhr.onload = function () {
                console.log("上传完成");
            };
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200) { 
                    var res = xhr.responseText;
                    alert(res);
                }
            }
        } else {
            alert("提交失败，请填写完整信息")
        }
    })
} else {
    alert("请先登录");
    $(location).attr("href", "login.html");
}
