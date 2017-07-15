var aneObj = function() {
    //start point,control point,end point(sin)
    this.rootx = [];//海藻尾部x坐标

    this.headx = [];//海藻头部x坐标
    this.heady = [];

    this.alpha = 0;//振动角度
    this.amp = [];//振动幅度


}

//添加属性和方法
aneObj.prototype.num = 50;
//初始化
aneObj.prototype.init = function() {

    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 17 + Math.random() * 20;//根部的位置随机
        this.headx[i] = this.rootx[i];//头部的x位置刚开始和尾部一样
        this.heady[i] = canHeight - 250 + Math.random() * 50 //高度也随机
        this.amp[i] = Math.random() * 50 + 50;
        //  this.len[i] = 200 + Math.random() * 50;
    }
    //console.log("a");

}
aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha); //[-1,1]正弦函数幅度随角度变化

    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e"; //必须先定样式
    for (var i = 0; i < this.num; i++) {
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();//画线条之前要先beginPath
        ctx2.moveTo(this.rootx[i], canHeight);//线条的起点坐标
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        //绘制二次贝塞尔曲线，前面两个是控制点坐标，后面两个是结束点坐标
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
        ctx2.stroke();

    }
    ctx2.restore(); //画布告诉场景之间的样式定义是局部的
}
