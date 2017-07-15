//定义画布
var can1;
var can2;
//定义场景

var ctx1;
var ctx2;
//定义画布宽度和高度
var canWidth;
var canHeight;
//每一帧的最后的时间，和每一帧的时间间隔
var lastTime;
var deltaTime;
//背景图片的变量
var bgPic = new Image();
//定义海藻变量
var ane;
//定义果实变量
var fruit
    //鱼妈妈变量
var mom;
//定义鼠标坐标变量
var mx;
var my;
//鱼宝宝
var baby;
//定义鱼宝宝的尾巴 眼睛 身体，因为有多幅 所以要存入数组中
var babyTail = [];
var babyEye = [];
var babyBody = [];
//定义鱼妈妈的尾巴 眼睛 身体 颜色
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];
//统计分数相关信息的变量
var data;
//特效变量
var wave;
var halo;
//悬浮物
var dust;
var dustPic = [];

document.body.onload = game;

function game() {
    init(); //初始化函数
    lastTime = Date.now(); //当前时间
    deltaTime = 0;

    gameloop(); //帧循环

}
//初始化函数
function init() {
    //获得canvas context
    can1 = document.getElementById("canvas1"); //fishes,dust,UI,circle
    ctx1 = can1.getContext('2d'); //获得画布场景的API 注意参数‘2D’
    can2 = document.getElementById("canvas2"); //background,ane,fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove, false); //监测鼠标位置坐标（需要理解）

    bgPic.src = "./src/background.jpg"; //背景图片的位置
    //获取画布的宽和高
    canWidth = can1.width;
    canHeight = can1.height;
    //对各种类new出新的对象 并分别进行初始化
    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();


    baby = new babyObj();
    baby.init();

    data = new dataObj();
    //鼠标位置的初始化
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //存储鱼的尾巴身体等各类图片到数组中
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png"; //笔记
    }

    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }



    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    //画布字体样式
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center"; //left,center,right

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();


    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

}

//帧循环
function gameloop() {
    window.requestAnimFrame(gameloop); //类似setInterval,setTimeout 帧循环函数 根据浏览器自己制定间隔
    //帧与帧之间的速度是不一样的 运动不平滑 则需要处理
    var now = Date.now();
    deltaTime = now - lastTime; //帧与帧之间的间隔
    lastTime = now;
    if (deltaTime > 40)
        deltaTime = 40; //防止帧间隔持续变大
    //console.log(deltaTime);
    
    //画图案
    drawBackground();

    ane.draw();

    fruitMonitor();//鼠标监测果实数量，然后执行发送果实，出生果实函数
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight) //需要理解
    mom.draw();
    baby.draw();
    momFruitsCollision();//鱼妈妈和果实碰撞
    momBabyCollision();//鱼宝宝和鱼妈妈碰撞

    data.draw();

    wave.draw();

    halo.draw();

    dust.draw();


}
//gameover后鼠标不动
function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) { //需要理解判断条件
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            //console.log(mx);
        }
    }
}
