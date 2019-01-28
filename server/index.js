var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var multer = require("multer");
// var cookie = require("cookie-parser");

var app = new express();

var uploadSingle = multer({dest: "./file/"});

// app.use(cookie());
// 拦截器，重定向
// app.use("/api/*", function (request, response, next) {
//     console.log(request.cookies.id)
//     if(request.cookies.id) {
//         next();
//     } else {
//         response.redirect("/login.html");
//     }
// })
// 获取静态页面
app.use(express.static(globalConfig["page_path"]));
// 登陆
app.get("/addLogin", loader.get("/addLogin"));
app.get("/serLogin", loader.get("/serLogin"));
// 广告
app.get("/serAd", loader.get("/serAd"));
app.get("/addViews", loader.get("/updateViews"));
// 我发布的广告
app.get("/myRelease", loader.get("/myRelease"));
// 添加广告信息
app.post("/addAdMsg", uploadSingle.single("file"), loader.get("/addAdMsg"));
// 读取文件信息
app.get("/serPicMsg", loader.get("/serPicMsg"));
// 删除广告信息
app.get("/delateMsg", loader.get("/delateMsg"));
// 修改广告信息
app.get("/modifyMsg",loader.get("/modifyMsg"));

app.listen(globalConfig["port"]);
console.log(`success listen at port:${globalConfig["port"]}......`);
