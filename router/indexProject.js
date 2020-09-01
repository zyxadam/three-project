const router = require("express").Router();
const db = require("./sqlHelp");
router.get("/", (req, res) => {
    res.redirect("/index.html");
})
router.get("/index.html", async(req, res) => {
    let bannerList=await getbanner();
    let newList=await getnewList();
    if (req.session.user) {
        res.render("indexProject.html", {
            user: req.session.user,
            headImage: req.session.info.headImage, lunbo: bannerList,newList:newList
        })
    } else {
        res.render("indexProject.html", { user: req.session.user, lunbo: bannerList,newList:newList});
    }
})
function getbanner(){
    let sql = "select * from banner where keyName='lun'";
    return new Promise((resolve,reject)=>{
        db.query(sql,[],(err,data)=>{
            if(err){
            reject(err);
        }else{
            resolve(data);
        }
        })
    })
};
function getnewList(){
    let sql1 = "SELECT product.*,productrule.id AS rid FROM product JOIN productrule ON product.id=productrule.productId WHERE isNew=1 AND isDefault=1;"
    return new Promise((resolve,reject)=>{
        db.query(sql1,[],(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
router.get("/productDetail.html",(req,res)=>{
    let id=req.query.id;
    let sql="SELECT *,productrule.id as rid FROM product JOIN productrule ON product.id=productrule.productId WHERE productrule.id = ?;"
    db.query(sql,[id],(err,data)=>{ 
        if(req.session.user){
            if(err){
            console.log(err);
            res.send("数据库出错，请联系管理员");
           }else{
            res.render("productDetail.html",{info:data[0],user:req.session.user,headImage:req.session.headImage})
           }
        }else{
        res.render("productDetail.html",{user: req.session.user,info:data[0]})
    }
    }) 
})
router.get("/cart.html",(req,res)=>{
    if(req.session.user){
        let userId=req.session.info.id;
        let sql=`SELECT s.id AS sid,p.feng,p.title,r.price,s.num,r.id AS rid FROM shopcart s 
        JOIN productrule r ON s.ruleId=r.id JOIN product p ON r.productId=p.id where s.userId=?;`
        db.query(sql,[userId],(err,data)=>{
            if(err){
                console.log(err);
                res.send("数据库出错，请联系管理员")
            }
            else{
                res.render("cart.html",{user:req.session.user,headImage:req.session.headImage,productList:data});
            }
        })
    }else{
        res.redirect("/index.html");
    }
    
})
module.exports = router;