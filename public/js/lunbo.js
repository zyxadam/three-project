/**
 * Created by xsy on 2016/7/28.
 */
var leftBox=document.getElementById("leftBox");
var righBox=document.getElementById("righBox");
var contenxt=document.getElementById("contenttext");
var div4=document.getElementById("div4");
var imgArr=["banner1.jpg","banner2.jpg","banner3.jpg"];/*ͼƬ����*/
var txtArr=["",
    "",
    ""];/*ͼƬ����*/
var currentNo=0;/*��ǰ*/
var prevNo=0;/*��һ��*/
var i=1;
var timer;
function init(){
    leftBox.innerHTML= "<img src='"+imgArr[0]+"'/>";
    righBox.innerHTML="<img src='"+imgArr[1]+"'/>";
    contenxt.innerHTML="<div id='div1'>"+txtArr[0]+"</div>";
    leftBox.style.left="0px";
    righBox.style.left="1349px";
    timer=setInterval(function(){
        moveImg(i);
        i++;
        if(i>=3){
            i=0;
        }
    },4000);
    setTimeout(function(){
        contenxt.style.bottom="0px";
    },2500)
}
//init()/*��ʼ��*/
function moveImg(pos,flag){
        if(flag==true){/*���������ʱ�Ӹ�һ��״̬����Ȼÿ���Զ�ִ�о��������*/
            clearInterval(timer)
        }
    leftBox.style.left="-1349px";
    righBox.style.left="0px";
    leftBox.style.webkitTransition="all 1.8s linear";
    righBox.style.webkitTransition="all 1.4s linear";
    leftBox.style.zIndex=50;
    righBox.style.zIndex=10;
    currentNo=pos;
    attchImg();
    prevNo=currentNo;/*����Ϊ��һ�����������  */
    contenxt.style.bottom="-400px";
    setTimeout(resetPosition,2000)
}
/*����div��������*/
function resetPosition(){
    leftBox.style.webkitTransition="";
    righBox.style.webkitTransition="";
    leftBox.style.left="0px";
    righBox.style.left="1349px";
    attchImg();
    contenxt.innerHTML="<div id='div1'>"+txtArr[currentNo]+"</div>";
    contenxt.style.bottom="0px";
}
/*�ı�ͼƬ·��*/
function attchImg(){
    leftBox.innerHTML="<img src='"+imgArr[prevNo]+"'/>";
    righBox.innerHTML="<img src='"+imgArr[currentNo]+"'/>";/*2 2*/
}

