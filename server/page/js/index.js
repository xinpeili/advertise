if($.cookie("user_name")) {

    var idObj = {};

    // 获取用户名
    $(".user-name-title").html("欢迎您：" + $.cookie("user_name"));

    function init() {
        sendAjax('GET', `/myRelease?userName=${$.cookie("user_name")}&offset=0&limit=8`, function (res) {
            renderAllData(JSON.parse(res).rows);
            renderTurnPage(JSON.parse(res).total);
            bindSubClick();
            searchFocus();
            console.log(JSON.parse(res));
        });
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

    // 去除数组的某一位
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    }

    // 渲染数据
    function renderAllData(data, firstNum = 0) {
        var str = `<tr>
                       <th>广告id</th>
                       <th>广告名称</th>
                       <th>广告内容</th>
                       <th>创建时间</th>
                       <th>操作</th>
                   </tr>`;
        data.forEach((ele, index) => {
            str += `<tr>
                        <td style="width:80px;text-align:center">${firstNum+index+1}</td>
                        <td class="title" style="width:180px">${ele.title}</td>
                        <td class="about">${ele.about}</td>
                        <td style="width:180px">${ele.ctime}</td>
                        <td style="width:80px;text-align:center">
                            <a href="#" class="btn1 glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal"></a>
                            <a href="#" class="btn2 glyphicon glyphicon-trash"></a>
                        </td>
                    </tr>`
        });
        $(".content").find(".table").html(str);
        bindEvent(data, firstNum)
    }

    // 渲染翻页
    function renderTurnPage(total) {
        var prevStr = `<li>
                            <a class="prev" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>`
        var nextStr = `<li>
                            <a class="next" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`
        var len = Math.ceil(total / 8);
        var str = '';
        for(var i = 0; i < len; i ++) {
            str += `<li><a class="num" href="#">${i + 1}</a></li>`
        }
        $(".pagination").html(prevStr + str + nextStr);
        turnPageClick(len);
    }

    // 翻页按钮绑定事件
    function turnPageClick(num) {
        for(let i = 0; i < num; i ++) {
            $(".pagination li").find(".num").eq(i).on("click", function () {
                // i*8
                sendAjax('GET', `/myRelease?userName=${$.cookie("user_name")}&offset=${i * 8}&limit=8`, function (res) {
                    renderAllData(JSON.parse(res).rows, i * 8);
                });
            })
        }
    }

    function bindEvent(data, firstNum = 0) {
        $(".icon").on("click", function () {
            $(".content-wrapper").find(".nav").animate({
                marginLeft: "-250px"
            })
        })
        data.forEach((ele, index) => {
            $(".table tr td").find(".btn1").eq(index).on("click", function (e) {
                idObj.id = data[index].ad_id;
                $("#myModal").find("#title").val(data[index].title);
                $("#myModal").find("#company").val(data[index].company);
                $("#myModal").find("#type").val(data[index].type);
                $("#myModal").find("#target").val(data[index].target);
                $("#myModal").find("#message-text").html(data[index].about)
            })
            $(".table tr td").find(".btn2").eq(index).on("click", function (e) {
                if(confirm("确认删除该条数据？")) {
                    sendAjax('GET', `/delateMsg?ad_id=${data[index].ad_id}`, function (res) {
                        alert(res)
                            sendAjax('GET', `/myRelease?userName=${$.cookie("user_name")}&offset=${firstNum}&limit=8`, function (res) {
                            console.log(data[index].ad_id)
                            data.remove(data[index]);
                            renderAllData(JSON.parse(res).rows, firstNum);
                            renderTurnPage(JSON.parse(res).total);
                        });
                    });
                }
            })
        })
    }

    // 搜索聚焦，得到所有数据
    function searchFocus() {
        sendAjax('GET', `/myReleaseAll?userName=${$.cookie("user_name")}`, function (res) {
            filterAd(JSON.parse(res))
        });
    }

    // 根据输入信息过滤
    function filterAd(data) {
        $(".search-box").find("input").on("input", function () {
            var val = $(this).val();
            var str = "";
            var dataArr = [];
            data.forEach((ele, index) => {
                if(ele.title.indexOf(val) !== -1) {
                    dataArr.push(ele);
                    str += `<li data-toggle="modal" data-target="#myModal">${ele.title}</li>`;
                }
            })
            if(JSON.stringify(dataArr) === "[]" || val === "") {
                $(".search-list").css("display", "none");
            } else {
                $(".search-list").html(str).css("display", "block");
                dataArr.forEach((ele, index) => {
                    $(".search-list").find("li").eq(index).on("click", function() {
                        idObj.id = dataArr[index].ad_id;
                        // console.log(dataArr[index].ad_id)
                        $(".search-list").css("display", "none");
                        $(".form-group").find("input").val("");
                        $("#myModal").find("#title").val(ele.title);
                        $("#myModal").find("#company").val(ele.company);
                        $("#myModal").find("#type").val(ele.type);
                        $("#myModal").find("#target").val(ele.target);
                        $("#myModal").find("#message-text").html(ele.about)
                    })
                })
            }
            
        })
    }

    // 绑定提交
    function bindSubClick() {
        $("#myModal").find("#submit").on("click", function (e) {
            console.log(idObj.id)
            var title = $("#myModal").find("#title").val()
            var company = $("#myModal").find("#company").val()
            var type = $("#myModal").find("#type").val()
            var target = $("#myModal").find("#target").val()
            var about = $("#myModal").find("#message-text").html()
            if(title && company && type && target && about) {
                sendAjax('GET', `/modifyMsg?title=${title}&company=${company}&type=${type}&target=${target}&about=${about}&adId=${idObj.id}`, function (res) {
                    alert(res)
                })
            } else {
                alert("请填写完整信息");
            }
        })
    }

    init();
} else {
    alert("请先登录");
    $(location).attr("href", "login.html");
}