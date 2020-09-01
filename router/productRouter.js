const router = require("express").Router();
const db = require("./sqlHelp");
router.post("/shopcart.do", (req, res) => {
    let rid = req.body.rid;
    if (req.session.user) {
        let userId = req.session.info.id;
        let sql = "select * from shopCart where userId=? and ruleId=?"
        db.query(sql, [userId, rid], (err, data) => {
            if (data.length > 0) {
                let sql = "update shopCart set num=num+1 where userId=? and ruleId=?"
                db.query(sql, [userId, rid], (err, data1) => {
                    if (err) {
                        console.log(err);
                        res.send({ code: 500, message: "数据库出错，请联系管理员" });
                    } else {
                        if (data1.affectedRows > 0) {
                            res.send({ code: 200, message: "加入成功" });
                        } else {
                            res.send({ code: 202, message: "加入失败" });
                        }
                    }
                })
            } else {
                let sql2 = "insert into shopcart(userId,ruleId) values(?,?);"
                db.query(sql2, [userId, rid], (err1, data1) => {
                    if (err1) {
                        console.log(err);
                        res.send({ code: 500, message: "数据库出错，请联系管理员" });
                    } else {
                        if (data1.affectedRows > 0) {
                            res.send({ code: 200, message: "加入成功" });
                        } else {
                            res.send({ code: 202, message: "加入失败" });
                        }
                    }
                })
            }
        })
    } else {
        res.send({code: 201, message:"请先登录"})
    }
})
router.post("/order.do",(req,res)=>{
    let sidstr=req.body.sidstr;
    let total=req.body.total;
    console.log(sidstr,total);
    if(req.session.user){
        let userId=req.session.info.id;
        sql="insert into orders (userId,total) values(?,?)"
        db.query(sql,[userId,parseFloat(total)],(err,data)=>{
            if(err){
                console.log(err);
                res.send({code:500,message:"服务器出错，请联系管理员"});
            }else{
                if(data.affectedRows>0){
                    //获得订单id
                    let orderId=data.insertId;
                    //插入订单详情
                    let sql1=`INSERT INTO orderdetail(orderId,ruleId,num,price) SELECT ${orderId},s.RuleId,s.num,r.price 
                   FROM shopcart s JOIN productrule r ON s.RuleId = r.Id WHERE s.id IN (${sidstr})`;
                   db.query(sql1,[],(err1,data1)=>{
                       if(err1){
                           console.log(err1);
                           res.send({code:500,message:"数据库出错，请联系管理员"});
                       }else{
                           //删除购物车对应的信息
                           let sql2=`delete from shopcart where id in (${sidstr})`
                           db.query(sql2,[],(err2,data2)=>{
                               if(err2){
                                   console.log(err2);
                                   res.send({code:500,message:"数据库出错，请联系管理员"});
                               }else{
                                   res.send({code:200,message:"订单生成成功，跳转到订单详情页面"});
                               }
                           })
                       }
                   })
                }else{
                    res.send({code:201,message:"插入订单失败"});
                }
            }
        })
    }else{
        res.send({code:202,message:"请先登录"});
    }
})
module.exports = router;