if($.cookie("user_name")) {

    // 获取用户名
    $(".user-name-title").html("欢迎您：" + $.cookie("user_name"));

    function init() {
        sendAjax("GET", `/getAllUser?offset=0&limit=8`, function (res) {
            renderAllData(JSON.parse(res).rows);
            renderTurnPage(JSON.parse(res).total);
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
                       <th>用户id</th>
                       <th>用户名</th>
                       <th>密码</th>
                       <th>创建时间</th>
                       <th>操作</th>
                   </tr>`;
        data.forEach((ele, index) => {
            str += `<tr>
                        <td style="width:80px;text-align:center">${firstNum+index+1}</td>
                        <td style="width:180px;text-align:center">${ele.name}</td>
                        <td style="width:180px;text-align:center">${ele.password}</td>
                        <td style="text-align:center">${ele.ctime}</td>
                        <td style="width:80px;text-align:center">
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
                sendAjax('GET', `/getAllUser?offset=${i * 8}&limit=8`, function (res) {
                    renderAllData(JSON.parse(res).rows, i * 8);
                });
            })
        }
    }

    function bindEvent(data, firstNum = 0) {
        data.forEach((ele, index) => {
            $(".table tr td").find(".btn2").eq(index).on("click", function (e) {
                if(confirm("确认删除该条数据？")) {
                    sendAjax('GET', `/delateUser?id=${data[index].id}`, function (res) {
                        alert(res);
                        sendAjax('GET', `/getAllUser?offset=${firstNum}&limit=8`, function (res) {
                            console.log(data[index].id)
                            data.remove(data[index]);
                            renderAllData(JSON.parse(res).rows, firstNum);
                            renderTurnPage(JSON.parse(res).total);
                        });
                    });
                }
            })
        })
    }

    init();
} else {
    alert("请先登录");
    $(location).attr("href", "login.html");
}