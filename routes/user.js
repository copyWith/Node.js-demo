var express = require("express");
var mysql = require("mysql");
var crypto = require("crypto");
var router = express.Router();
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '158647',   //mysql安装时的密码
    database: 'demo',   //数据库名称
    port: '3306'   //端口号
});
function getUserByName(callback) {
    pool.getConnection(function (err, connection) {
        var sql = "SELECT userlist.id,userlist.userName FROM userlist";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Err:" + err.message);
                return;
            }
            connection.release();
            callback(result)
        })
    })
}
//查询
router.post("/user", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log(req)

    //pool.getConnection(function (err, connection) {
    //    var sql = "SELECT * FROM userList";
    //    connection.query(sql, function (err, result) {
    //        if (err) {
    //            console.log("Err:" + err.message);
    //            return;
    //        }
    //        //connection.release();
    //        console.log(result);
    //        //callback(result)
    //    })
    //});
    //res.send({flag: 2});
    //var u = req.body.uname;
    //var p = req.body.pwd;
    //var md5 = crypto.createHash("md5");
    //var newPas = md5.update(p).digest("hex");
    getUserByName(function(result){
        res.send(result);
    });
    //getUserByName(function (result) {
    //    console.log(result)
    //    res.send(result);
    //    //if (result.length <= 0 || result == '' || result == null) {
    //    //    res.send({flag: 3})
    //    //} else if (result[0].username == u && result[0].pwd == newPas) {
    //    //    res.send({flag: 1})
    //    //} else if (result[0].pwd != newPas) {
    //    //    res.send({flag: 2})
    //    //} else {
    //    //    res.send({flag: 4})
    //    //}
    //});
});
//插入
router.post("/addUser",function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.getConnection(function (err, connection) {
        var sql = "insert into userList (userName) values ('新的')";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Err:" + err.message);
                return;
            }
            connection.release();
            //callback(result)
        });
    });
});
router.post('/GetBusinessList',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    pool.getConnection(function(err,connection){
        var sql="SELECT getbusinesslist.userPhone,getbusinesslist.userName FROM getbusinesslist";
        connection.query(sql,function(err,result){
            if (err){console.log("Err:"+err.message);return;}
            connection.release();
            res.send(result);
        })
    })
});
router.post('/UpBusiness',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var name=req.body.name,phone=req.body.phone;
    pool.getConnection(function(err,connection){
        var sql="insert into GetBusinessList (userName,userPhone) values (?,?)";
        connection.query(sql,[name,phone],function(err,result){
            if (err) {console.log("Err:"+err.message); return;}
            connection.release();
            res.send({
                "ReponseId":null,
                "ResponseCode":"1",
                "ResponseDate":"2019-05-07 14:20:06",
                "ResponseMessage":"执行成功",
                "list":[]
            });
        })
    })
});
module.exports = router;