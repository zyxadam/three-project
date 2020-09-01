const  router=require("express").Router();
const db=require("./sqlHelp");
router.get("/index.html",(req,res)=>{
    let sql="select * from user";
    db.query(sql,[],(er,data)=>{
        res.render("index.html",{userList:data}); //渲染（对应视图文件,以及传递模板中需要数据）
    })
})
module.exports=router;