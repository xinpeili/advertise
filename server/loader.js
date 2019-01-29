// 加载web下所有页面
var fs = require("fs");
var config = require("./config.js");

// 把当前路径下的所有文件转化为一个数组
var file = fs.readdirSync(config["web_path"]);
var controllerSet = [];
// 将多个文件的路径放在一起
var pathMap = new Map();

for(var i = 0; i < file.length; i ++) {
    var temp = require("./" + config["web_path"] + "/" + file[i]);
    if(temp.path) {
        for(var [k, v] of temp.path) {
            // console.log(k);
            // console.log(v);
            if(pathMap.get(k) == null) {
                pathMap.set(k, v);
            } else {
                throw new Error("url path 异常，url：" + k);
            }
            controllerSet.push(temp);
        }
    }
}

module.exports = pathMap;
