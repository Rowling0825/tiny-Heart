//判断鱼和果实之间的距离
function momFruitsCollision(){
	if (!data.gameOver) {//游戏进行时碰撞有效
	for (var i = 0; i <fruit.num; i++) {
		if (fruit.l[i]>14) {//果实成熟时碰撞有效
			//calculate Length
			var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)//计算果实和鱼妈妈之间的距离
			if (l<900) {
				//fruit is eaten
				fruit.dead(i);//首先果实状态改变 通过调用果实死亡函数
				data.fruitNum++;//数据中心果实增加
				mom.momBodyCount++;//鱼妈妈改变颜色的依据
				if(mom.momBodyCount>7){
					mom.momBodyCount=7;
				}
				if (fruit.fruitType[i]=="blue") {
					data.double=2;//吃到蓝果实
				}
				wave.born(fruit.x[i],fruit.y[i]);//碰撞圆圈
			}
		}
	}
}
}
//mom baby collision
function momBabyCollision(){
	if (!data.gameOver) {
	if(data.fruitNum>0){
	var l = calLength2(mom.x,mom.y,baby.x,baby.y);
	if(l<900){
		//baby recover
		baby.babyBodyCount=0;
		//data >0
		//data.reset();
		mom.momBodyCount=0;
		//score updata
		data.addScore();
		halo.born(baby.x,baby.y);
	}
}
}
}