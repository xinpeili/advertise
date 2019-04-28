var advertiseDao = require("../dao/advertiseDao");
var url = require("url");
var fs = require("fs");
var req = require("request");

var path = new Map();

// 广告数据获取
function serAd(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchAd(parseInt(params.offset), parseInt(params.limit), function (result) {
        advertiseDao.serchAllad(function (count) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/serAd", serAd);

// 根据用户名查询广告数据
function serMyAd(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchAdByName(params.userName, parseInt(params.offset), parseInt(params.limit), function (result) {
        advertiseDao.serchAllad(function (count) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/serMyAd", serMyAd);

// 使views加一
function updateViews(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.updateViews(params.viewsNum, params.adId, function () {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.end();
    })
}
path.set("/updateViews", updateViews);

// 提交订单
function order(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.order(params.userName, params.adName, params.time, params.adView, function (res) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(JSON.stringify({ok: 'ok', data: res}));
        response.end();
    })
}
path.set("/order", order);

// 获取订单
function getOrder(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.getOrder(params.userName, parseInt(params.offset), parseInt(params.limit), function (res) {
        advertiseDao.getOrderAll(params.userName, function (count) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: res}));
            response.end();
        })
    })
}
path.set("/getOrder", getOrder);

// 我发布的广告
function myRelease(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchMyRelease(params.userName, parseInt(params.offset), parseInt(params.limit), function (result) {
        advertiseDao.serchMyCount(params.userName, function (count) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/myRelease", myRelease);

// 我发布的所有广告
function myReleaseAll(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchMyReleaseAll(params.userName, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/myReleaseAll", myReleaseAll);

// 添加广告信息（上传）
function addAdMsg(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(request.file.originalname);
    // console.log(request.file.size);
    // console.log(request.file.path);
    // console.log(params);
    advertiseDao.insertAdMsg(params.title, params.target, params.company, params.type, params.about, params.user_name, request.file.originalname, request.file.size, request.file.path, function (result) {
        response.end("提交成功");
    })
}
path.set("/addAdMsg", addAdMsg)

// 获取文件信息
function serPicMsg(request, response) {
    var params = url.parse(request.url, true).query;
    try {
        var data = fs.readFileSync("./" + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch (error) {
        response.writeHead(404);
        response.end();
    }
}
path.set("/serPicMsg", serPicMsg);

// 删除广告信息
function delateMsg(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.ad_id)
    advertiseDao.delateMsg(params.ad_id, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("删除成功");
        response.end();
    })
}
path.set("/delateMsg", delateMsg);

// 修改广告信息
function modifyMsg(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.modifyMsg(params.title, params.company, params.type, params.target, params.about, params.adId, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("修改成功");
        response.end();
    })
}
path.set("/modifyMsg", modifyMsg);

// 管理员获取所有用户信息
function getAllUser(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.getAllUser(parseInt(params.offset), parseInt(params.limit), function (result) {
        advertiseDao.getAllUserCount(function (count) {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/getAllUser", getAllUser);

// 删除用户
function delateUser(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.delateUser(params.id, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("删除成功");
        response.end();
    })
}
path.set("/delateUser", delateUser);

// 删除用户
function serAllPic(request, response) {
    advertiseDao.serAllPic(function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/serAllPic", serAllPic);

// 修改投放状态
function changeAdState(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.changeAdState(parseInt(params.ad_id), parseInt(params.num), function () {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("修改成功");
        response.end();
    })
}
path.set("/changeAdState", changeAdState);

// 向聊天机器人发送数据并返回前端
function chat(request, response) {
    var params = url.parse(request.url, true).query;
    var data = {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": params.text
            }
        },
        "userInfo": {
            "apiKey": "be3e88b9ae0c49b28582416c86a3f9b5",
            "userId": "123456"
        }
    }
    var contents = JSON.stringify(data);
    req({
        url: "http://openapi.tuling123.com/openapi/api/v2",
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: contents
    }, function (error, resp, body) {
        if (!error && resp.statusCode == 200) {
            //把结果返回给我的前端页面

            var head = {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"GET",
                "Access-Control-Allow-Headers": "x-request-with , content-type"
            };
            response.writeHead(200, head);

            var obj = JSON.parse(body);
            if (obj && obj.results && obj.results.length > 0 && obj.results[0].values) {
                response.write(JSON.stringify(obj.results[0].values));
                response.end();
            } else {
                response.write("{\"text\":\"偶布吉岛你说的是什么~\"}");
                response.end();
            }
        } else {
            //返回给自己前端页面一个400错误
            response.writeHead(400);
            response.write("数据异常");
            response.end();
        }
    });
}
path.set("/chat", chat);

module.exports.path = path;