var advertiseDao = require("../dao/advertiseDao");
var url = require("url");

var path = new Map();

// 注册
function addLogin(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchLogin(params.userName, function (result) {
        if (JSON.stringify(result) !== '[]') {
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write("用户名已被注册");
            response.end();
        } else {
            advertiseDao.insertLogin(params.userName, params.password, params.static, function (result) {
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.write("注册成功");
                response.end();
            })
        }
    })
}
path.set("/addLogin", addLogin)

// 登陆
function serLogin(request, response) {
    var params = url.parse(request.url, true).query;
    advertiseDao.serchLogin(params.userName, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/serLogin", serLogin)


module.exports.path = path;