const router=require('express').Router();
const  db=require("./sqlHelp");
router.post("/reg.do",(req,res)=>{
    let email=req.body.Email;
    let user=req.body.user;
    let pwd=req.body.zhucePwd;
    let sql="insert into user(userName,pwd,email) values(?,?,?)";
    db.query(sql,[user,pwd,email],(err,data)=>{
        if(err){
            console.log(err);
            res.send({code:500,message:"数据库出错"});
        }else{
            if(data.affectedRows>0){
                res.send({code:200,messgae:"注册成功",data:data});
            }else {
                res.send({code:201,message:"注册失败"});
            }
        }
    })
})
router.post("/login.do",(req,res)=>{
    let user=req.body.user;
    let pwd=req.body.password;
    let sql="select * from user where userName=? and pwd=?";
    db.query(sql,[user,pwd],(err,data)=>{
        if(err){
            console.log(err);
            res.send({code:500,message:"数据库出错"});
        }else{
            if(data.length>0){
                req.session.user=user;
                req.session.headImage=data[0].headImage;
                req.session.info=data[0];
                res.send({code:200,messgae:"登录成功",data:data});
            }else {
                res.send({code:201,message:"登录失败"});
            }
        }
    })
})
module.exports=router;