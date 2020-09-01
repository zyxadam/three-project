/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}

$(function () {
    var layer = layui.layer
    $("#loginBtn").click(function(){
        var flag=true;
        var obj={"loginUser":"用户名或邮箱","loginPwd":"密码"}
        for(var key in obj) {
            if ($("#" + key).val().trim().length == 0) {
                flag = false;
                layer.msg(obj[key] + "不能为空");
                break;
            }
        }
        if(flag){
                $.ajax({
                    type: "POST",
                    url: "/login.do",
                    data: $("#LoginForm").serialize(),
                    success: function(msg){
                        if(msg.code==200){
                           location.href="index.html";//刷新页面
                            onloading();
                        }else{
                           layer.msg(msg.message);
                        }
                    }
                });
            }
    })
    $("#zhuceBtn").click(function () {
        var flag=true;
        var obj={"Email":"邮箱","zhuceUser":"用户名","zhucePwd":"密码","resPwd":"确认密码"}
        for(var key in obj) {
            if ($("#" + key).val().trim().length == 0 ) {
                flag = false;
                layer.msg(obj[key] + "不能为空");
                break;
            }
        }
        if($("#zhucePwd").val()!=$("#resPwd").val()){
            flag=false;
            layer.msg("注册密码和确认密码要一样");
        }
        if(flag){
                $.ajax({
                    type: "POST",
                    url: "/reg.do",
                    data: $("#regform").serialize(),
                    success: function(msg){
                        if(msg.code==200){
                            onloading();
                            switchLogin()
                        }else{
                            alert(msg);
                        }
                    }
                });
            }
    })
})
function onloading(){
    var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
//loading层
    var index = layer.load(1, {
  shade: [0.1,'#fff'] //0.1透明度的白色背景
});
}