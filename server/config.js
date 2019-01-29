var fs = require("fs");

var conf = fs.readFileSync("./server.conf");
var confArr = conf.toString().split("\r\n");
var len = confArr.length;
var obj = {};
for(var i = 0; i < len; i ++) {
    var confs = confArr[i].split("=");
    if(confs.length < 2) {
        continue;
    }
    obj[confs[0]] = confs[1].trim();
}

module.exports = obj;