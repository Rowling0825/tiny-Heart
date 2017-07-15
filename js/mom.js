var momObj =function(){
	this.x;//鱼妈妈的坐标信息
	this.y;
	this.angle;//鱼妈妈跟随鼠标旋转需要的角度
	//this.bigEye=new Image();
	this.bigBody=new Image();//鱼妈妈的身体
	//this.bigTail = new Image();
	//鱼尾巴摆动需要定时和计数
	this.momTailTimer=0;
	this.momTailCount=0;
	//鱼眼睛眨动定时和计数
	this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;//因为睁眼闭眼间隔不一样而存在

    this.momBodyCount=0;

}
//初始化
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;

	//this.bigEye.src="./src/bigEye0.png";
	this.bigBody.src="./src/bigSwim0.png";
	//this.bigTail.src="./src/bigTail0.png";
}
momObj.prototype.draw=function(){
	//lerp x,y，计算鱼的旋转角度
	this.x=lerpDistance(mx,this.x,0.98);
	this.y=lerpDistance(my,this.y,0.98);
	//delta angle
	//Math.atan2(y,x)
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta =Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle
	this.angle = lerpAngle(beta,this.angle,0.6);

	//mom Tail 尾巴摇摆
	this.momTailTimer+=deltaTime;//计数器，随着帧数变化
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;//尾部图片的循环
		this.momTailTimer%=50;//计时器清零
	}
	//mom eye 眼睛眨动
	this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
       // console.log(this.momEyeTimer);
        this.momEyeCount = (this.momEyeCount + 1) % 2;//睁眼闭眼两种情况
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000; //[2000,3500)睁眼间隔比较长
        } else {
            this.momEyeInterval = 200;//闭眼间隔比较短
        }
    }

	ctx1.save();
	ctx1.translate(this.x,this.y);//以鱼的坐标为原点
	ctx1.rotate(this.angle);//rotate(angle)旋转的量，用弧度表示。正值表示顺时针方向旋转，负值表示逆时针方向旋转。
	var momTailCount=this.momTailCount;
	var momEyeCount=this.momEyeCount;
	var momBodyCount=this.momBodyCount;
	if (data.double==1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);//鱼眼睛使中心在圆点
	
	ctx1.restore();
}
