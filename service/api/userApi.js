let models = require("../db/db");
let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let $sql = require("../db/sqlMap");

let conn = mysql.createConnection(models.mysql);

conn.connect();

let jsonWrite = (res, ret) => {
  if (typeof ret === "undefined") {
    res.send("err");
  } else {
    console.log(ret);
    res.send(ret);
  }
};

let dateStr = str => {
  return new Date(str.slice(0, 7));
};

// 增加用户接口
router.post("/addUser", (req, res) => {
  let sql = $sql.user.add;
  let p = req.body;
  console.log(p);
  console.log(p.birth);
  conn.query(
    sql,
    [
      p.name,
      p.account,
      p.pass,
      p.checkPass,
      p.email,
      p.phone,
      p.card,
      dateStr(p.birth),
      p.sex
    ],
    (err, result) => {
      err ? console.log(err) : "";
      result ? jsonWrite(res, result) : "";
    }
  );
});

// 查找用户接口
router.post('login',(req,res)=>{
    let sql_name = $sql.user.select_name
    let p = req.body
    console.log(p)
    p.name?sql_name+=p.name:''
    let keywords = JSON.parse(Object.keys(p)[0])
    conn.query(sql_name,p.name,(err,result)=>{
        err?console.log(err):''
        if(result[0]===undefined){
            res.send(-1)
        }else{}
        let resultArr = result[0]
        console.log(resultArr.password)
        if(resultArr.password === keywords.password){
            jsonWrite(res,result)
        }else{
            res.send('0')
        }
        
    })

})

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id ='"+ params.id + "'";
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify +=  " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id ='"+ params.id + "'";
    }
    conn.query(sql_modify, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result.affectedRows === undefined) {
            res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});


module.exports = router;
