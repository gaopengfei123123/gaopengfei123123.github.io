//首先画一个黑色背景
bgCtx = document.getElementById("canvas").getContext('2d');
bgCtx.fillStyle='#0b0d0f';
bgCtx.fillRect(0,0,500,500);
//bgCtx.save();
//bgCtx.restore();

//蛇和食物的图片信息
headImg = new Image;
headImg.src = './imgs/head.png';

bodyImg = new Image;
bodyImg.src ='./imgs/body.png';

foodImg = new Image;
foodImg.src = 'imgs/food.png';




//实例化贪吃蛇对象
var snake = function(){
	var MyThis = this;
	MyThis.MyEle = document.getElementById("canvas");
	MyThis.MyCtx = MyThis.MyEle.getContext('2d');
//	蛇的数组信息
	MyThis.SnakeArr = [];
	MyThis.FoodArr = [];
//	把画布分成列和行
	MyThis.RowNum = MyThis.MyEle.width/25;
	MyThis.ColNum = MyThis.MyEle.height/25;
//	定时器
	MyThis.Timer;
//	分数
	MyThis.Score = 0;
	
//	执行程序
	MyThis.RunIt = function(){
//		刷新画布
		MyThis.MyInit();
//		判断蛇头移动方向
		MyThis.MyMove();
	}
	
//	2每次移动都重绘蛇身 和判断蛇头方向
	MyThis.MyMove = function(){
//		判断蛇头方向
		document.onkeydown=function(e){
			switch (e.keyCode){
				case 37:
					MyThis.SnakeArr[0].d = 'l';
					break;
				case 38:
					MyThis.SnakeArr[0].d = 't';
					break;
				case 39:
					MyThis.SnakeArr[0].d = 'r';
					break;
				case 40:
					MyThis.SnakeArr[0].d = 'b';
					break;
			}
		}
		
//		开启计时器让蛇身移动
		MyThis.Timer = setInterval(function(){
//			后一个蛇身刷新成前一个蛇身的坐标
			for(var i =MyThis.SnakeArr.length-1;i>0;i--){
				MyThis.SnakeArr[i].x =MyThis.SnakeArr[i-1].x;
				MyThis.SnakeArr[i].y =MyThis.SnakeArr[i-1].y;
			}
//			让蛇头移动
			switch(MyThis.SnakeArr[0].d){
				case 'l':
					MyThis.SnakeArr[0].x--;
					break;
				case 'r':
					MyThis.SnakeArr[0].x++;
					break;
				case 't':
					MyThis.SnakeArr[0].y--;
					break;
				case 'b':
					MyThis.SnakeArr[0].y++;
					break;
			}
//			刷新画布
			MyThis.MyFlashCtx();
//			创建食物
			MyThis.MyCreateFood();
//			碰撞检测
			MyThis.CheckHit();	
		},100);
	}
	
//	碰撞检测
	MyThis.CheckHit = function(){
//		碰到自己
		for	(var i=1;i<mythis.snakearr.length;i++){ if(mythis.snakearr[0].x="=MyThis.SnakeArr[i].x" &&mythis.snakearr[0].y="=MyThis.SnakeArr[i].y){" mythis.gameover();="" }="" 碰到墙壁="" if(mythis.snakearr[0].x<0||mythis.snakearr[0].x="">=MyThis.ColNum||MyThis.SnakeArr[0].y<0||mythis.snakearr[0].y>=MyThis.RowNum){
			MyThis.GameOver();
		}
//		碰到食物
		if(MyThis.SnakeArr[0].x==MyThis.FoodArr[0].x&&MyThis.SnakeArr[0].y==MyThis.FoodArr[0].y){
			MyThis.SnakeArr.push({
				x:MyThis.FoodArr[0].x,
				y:MyThis.FoodArr[0].y
			});
//			移出食物数组中的一个
			MyThis.FoodArr.shift();
//			分数增加
			MyThis.Score++;
		}
	}
//	游戏结束	
	MyThis.GameOver = function(){
		clearInterval(MyThis.Timer);
//		判定分数
		var Level='';
		if(MyThis.Score</0||mythis.snakearr[0].y></mythis.snakearr.length;i++){>