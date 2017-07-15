var fruitObj = function() {
    this.alive = []; //bool物体池中或者的物体
    this.orange = new Image(); //橘色果实
    this.blue = new Image(); //蓝色果实
    this.fruitType = []; //用于选择果实类型的矩阵

    this.aneNo = []; //果实出生在海藻的编号
    this.x = []; //果实坐标
    this.y = [];
    this.l = []; //果实大小
    this.spd = []; //果实上升速度
}
fruitObj.prototype.num = 30; //物体池中果实的数量
//初始化函数
fruitObj.prototype.init = function() {
    //对每个果实进行初始化 状态 坐标 大小 速度 类型
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.aneNo[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02]
        //this.born(i);
        this.fruitType[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";

}
//监测活着的果实数量，少于15则发送果实
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            num++;//统计活着的果实数目
        }
        if (num < 15) {
            //sent fruit
            sendFruit();
            return;
        }
    }
}
//发送果实
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);//如果该果实是死的状态 则出生它
            return;//必须返回 不然会把所有死的都出生出来
        }
    }
}
//出生果实即改变果实的相关信息
fruitObj.prototype.born = function(i) {
    //找海葵位置
    this.aneNo[i] = Math.floor(Math.random() * ane.num);//确定该果实出生的海藻的编号find an ane,grow,fly up
    // this.x[i] = ane.headx[aneID];
    // this.y[i] = ane.heady[aneID];
    this.l[i] = 0;//把果实的大小变为0
    this.alive[i] = true;//状态变成活着
    //控制蓝色果实和橘色果实的数量
    var ran = Math.random();
    if (ran < 0.2) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
}

//画果实
fruitObj.prototype.draw = function() {
    for (var i = 0; i < this.num; i++) {
        //draw
        
        if (this.alive[i]) {//如果果实状态是活着的
            if (this.fruitType[i] == "blue") {
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }
            if (this.l[i] <= 14) { //grow
                var NO = this.aneNo[i];
                //根据海藻头部位置确定果实出生的位置
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i] * deltaTime;//果实变大
                // ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            } else {
                this.y[i] -= this.spd[i] * 5 * deltaTime;

            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            //果实消失之后状态变成死亡
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}


//碰撞的时候调用 果实状态变成死的
fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

