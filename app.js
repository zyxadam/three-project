const myexpress=require('express');
const favicon =require('serve-favicon');
const logger=require('morgan');
const bodyParser=require('body-parser');

const cookieParser = require("cookie-parser");
const session = require('express-session');
const userRouter=require("./router/userRouter");
//const indexRouter=require("./router/indexRouter");
const indexPRouter=require("./router/indexProject");
const ejs=require("ejs");
const productRouter=require("./router/productRouter");
const app=myexpress();


//配置

app.set('views', __dirname+'/view');
app.engine("html",ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(favicon(__dirname+"/public/favicon.ico"));
app.use(bodyParser.json());
// 定义cookie解析器
app.use(cookieParser());
app.use(session({
    secret: '1234',
    name: 'testapp',   //这里的name值得是cookie的name，默认   cookie的name是：connect.sid
    cookie: {maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的            cookie失效过期
    rolling:true,   //更新session-cookie失效时间
    resave:true ,    //重新保存
    saveUninitialized: true//添加这行
}));

// app.get("/index.html",(req,res)=>{
//     if(req.session.user){
//         res.render("index.ejs",{user:req.session.user,headImage:req.session.info.headImage})
//     }
// })
app.use(userRouter);
//app.use(indexRouter);
app.use(indexPRouter);
app.use(productRouter);
app.use(myexpress.static(__dirname+"/public",{index:"/index.html"}));
app.listen(8085);