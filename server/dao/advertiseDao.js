var dbutil = require("./dbutil");

// 获取当前时间
// var date = new Date();
// var year = date.getFullYear();
// var month = date.getMonth()+1;
// var day = date.getDate();
// var hour = date.getHours();
// var minute = date.getMinutes();
// var second = date.getSeconds();

// 注册账号
function insertLogin(userName, password, static, success) {
    var date = new Date();
    // var nowDate = year + '' + month + '' + day + '' + hour + '' + minute + '' + second;
    // 每次执行都创建一个新的数据库链接
    var connection = dbutil.createConnection();
    var insertSql = "insert into login (name, password, static, ctime) values (?, ?, ?, ?)";
    var params = [userName, password, static, date];
    // 建立连接
    connection.connect();
    connection.query(insertSql, params, function (err, res) {
        if(err == null) {
            success(res);
        } else {
            throw new Error(err)
        }
    })
    // 关闭链接
    connection.end();
}

// 登陆账号
function serchLogin(userName, success) {
    var connection = dbutil.createConnection();
    var insertSql = "select * from login where name = ?;";
    connection.connect();
    connection.query(insertSql, userName, function (err, res) {
        if(err == null) {
            success(res);
        } else {
            throw new Error(err)
        }
    })
    connection.end();
}

// 查询广告信息
function serchAd(offset, limit, success) {
    var connection = dbutil.createConnection();
    var serchSql = "select * from advertise order by ctime desc limit ?, ?;"
    var params = [offset, limit];
    connection.connect();
    connection.query(serchSql, params, function (err, res) {
        if(err == null) {
            success(res)
        } else {
            throw new Error(err);
        }
    })
    connection.end();
}

// 更改广告views信息
function updateViews(views, title, success) {
    var connection = dbutil.createConnection();
    var view = ++ views;
    var params = [view, title];
    // console.log(params);
    var insertSql = "update advertise set views = ? where ad_id = ?";
    connection.connect();
    connection.query(insertSql, params, function (err, res) {
        if(err == null) {
            success();
        } else {
            throw new Error(err)
        }
    })
    connection.end();
}

// 根据用户名查询发布的广告信息
function serchMyRelease(userName, offset, limit, success) {
    var connection = dbutil.createConnection();
    var serchSql = "select * from advertise where user_name = ? order by ctime desc limit ?, ?;";
    var params = [userName, offset, limit]
    connection.connect();
    connection.query(serchSql, params, function (err, res) {
        if(err == null) {
            success(res)
        } else {
            throw new Error(err);
        }
    })
    connection.end();
}

// 查询我发布信息的总数
function serchMyCount(userName, success) {
    var connection = dbutil.createConnection();
    var serchSql = "select count(1) as count from advertise where user_name = ?;";
    connection.connect();
    connection.query(serchSql, userName, function (err, res) {
        if(err == null) {
            success(res)
        } else {
            throw new Error(err);
        }
    })
    connection.end();
}

// 插入广告信息（图片上传）
function insertAdMsg(title, target, company, type, about, userName, picName, picSize, picPath, success) {
    var date = new Date();
    var connection = dbutil.createConnection();
    var insertSql = "insert into advertise (title, target, company, type, about, user_name, pic_name, pic_size, pic_path, ctime, utime) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [title, target, company, type, about, userName, picName, picSize, picPath, date, date];
    connection.connect();
    connection.query(insertSql, params, function (err, res) {
        if(err == null) {
            success(res);
        } else {
            throw new Error(err)
        }
    })
    connection.end();
}

// 删除广告信息
function delateMsg(adId, success) {
    var connection = dbutil.createConnection();
    var serchSql = "delete from advertise where ad_id = ?;";
    connection.connect();
    connection.query(serchSql, adId, function (err, res) {
        if(err == null) {
            success(res)
        } else {
            throw new Error(err);
        }
    })
    connection.end();
}

// 修改广告信息
function modifyMsg(title, company, type, target, about, adId, success) {
    var date = new Date();
    var connection = dbutil.createConnection();
    var params = [title, company, type, target, about, date, adId];
    var updateSql = "update advertise set title = ?,company = ?,type = ?,target = ?,about = ?,utime = ? where ad_id = ?;";
    connection.connect();
    connection.query(updateSql, params, function (err, res) {
        if(err == null) {
            success(res)
        } else {
            throw new Error(err);
        }
    })
    connection.end();
}

module.exports = {
    "insertLogin": insertLogin,
    "serchLogin": serchLogin,
    "serchAd": serchAd,
    "updateViews": updateViews,
    "serchMyRelease": serchMyRelease,
    "serchMyCount": serchMyCount,
    "insertAdMsg": insertAdMsg,
    "delateMsg": delateMsg,
    "modifyMsg": modifyMsg
}


