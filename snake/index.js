//首先画一个黑色背景
bgCtx = document.getElementById("canvas").getContext('2d');
bgCtx.fillStyle = '#0b0d0f';
bgCtx.fillRect(0, 0, 500, 500);
//bgCtx.save();
//bgCtx.restore();

//蛇和食物的图片信息
headImg = new Image;
headImg.src = './snake/imgs/head.png';

bodyImg = new Image;
bodyImg.src = './snake/imgs/body.png';

foodImg = new Image;
foodImg.src = './snake/imgs/food.png';




//实例化贪吃蛇对象
var snake = function() {
    var MyThis = this;
    MyThis.MyEle = document.getElementById("canvas");
    MyThis.MyCtx = MyThis.MyEle.getContext('2d');
    //	蛇的数组信息
    MyThis.SnakeArr = [];
    MyThis.FoodArr = [];
    //	把画布分成列和行
    MyThis.RowNum = MyThis.MyEle.width / 25;
    MyThis.ColNum = MyThis.MyEle.height / 25;
    //	定时器
    MyThis.Timer;
    //	分数
    MyThis.Score = 0;

    //	执行程序
    MyThis.RunIt = function() {
        //		刷新画布
        MyThis.MyInit();
        //		判断蛇头移动方向
        MyThis.MyMove();
    }

    //	2每次移动都重绘蛇身 和判断蛇头方向
    MyThis.MyMove = function() {
        //		判断蛇头方向
        document.onkeydown = function(e) {
            switch (e.keyCode) {
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
        MyThis.Timer = setInterval(function() {
            //			后一个蛇身刷新成前一个蛇身的坐标
            for (var i = MyThis.SnakeArr.length - 1; i > 0; i--) {
                MyThis.SnakeArr[i].x = MyThis.SnakeArr[i - 1].x;
                MyThis.SnakeArr[i].y = MyThis.SnakeArr[i - 1].y;
            }
            //			让蛇头移动
            switch (MyThis.SnakeArr[0].d) {
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
        }, 100);
    }


    MyThis.CheckHit = function() {

        for (var i = 1; i < MyThis.SnakeArr.length; i++) {
            if (MyThis.SnakeArr[0].x == MyThis.SnakeArr[i].x && MyThis.SnakeArr[0].y == MyThis.SnakeArr[i].y) {
                MyThis.GameOver();
            }
        }

        if (MyThis.SnakeArr[0].x < 0 || MyThis.SnakeArr[0].x >= MyThis.ColNum || MyThis.SnakeArr[0].y < 0 || MyThis.SnakeArr[0].y >= MyThis.RowNum) {
            MyThis.GameOver();
        }

        if (MyThis.SnakeArr[0].x == MyThis.FoodArr[0].x && MyThis.SnakeArr[0].y == MyThis.FoodArr[0].y) {
            MyThis.SnakeArr.push({
                x: MyThis.FoodArr[0].x,
                y: MyThis.FoodArr[0].y
            });

            MyThis.FoodArr.shift();

            MyThis.Score++;
        }
    }
    //	游戏结束
    MyThis.GameOver = function() {
        clearInterval(MyThis.Timer);
        //		判定分数
        var Level = '';
        if (MyThis.Score < 10) {
            Level = '菜花蛇';
        } else if (MyThis.Score < 20) {
            Level = '强壮的菜花蛇';
        } else if (MyThis.Score < 30) {
            Level = '马上要进化了哦~';
        } else if (MyThis.Score < 40) {
            Level = '还是菜花蛇23333';
        } else {
            Level = '恩...';
        }
        //		创建一个新的画布
        MyThis.MyCtx.save();
        MyThis.MyCtx.fillStyle = 'black';
        MyThis.MyCtx.fillRect(0, 0, MyThis.MyEle.width, MyThis.MyEle.height);
        MyThis.MyCtx.restore();
        MyThis.MyCtx.font = '40px 微软雅黑';
        MyThis.MyCtx.fillStyle = 'white';
        MyThis.MyCtx.fillText('得分:' + MyThis.Score, 90, 200);
        MyThis.MyCtx.font = '20px 微软雅黑';
        MyThis.MyCtx.fillText('获得称号:' + Level, 90, 250);


    }
    //	创建食物
    MyThis.MyCreateFood = function() {
        //		如果有就不创建
        if (MyThis.FoodArr.length != 0) {
            return;
        }
        //		设定随机坐标
        var x = Math.floor(Math.random() * MyThis.ColNum);
        var y = Math.floor(Math.random() * MyThis.RowNum);

        var crash = false;
        //		判断是否随机到蛇的身上
        for (var i = 0; i < MyThis.SnakeArr.length; i++) {
            if (x == MyThis.SnakeArr[i].x && y == MyThis.SnakeArr[i].y) {
                crash = true;
                break;
            }
        }
        //		如果存在了就重新执行一遍本函数,没有就添加到食物数组当中
        if (crash) {
            MyThis.MyCreateFood();
        } else {
            MyThis.FoodArr.push({
                x: x,
                y: y
            });
        }

    }

    //	1.绘制画布和整条蛇,建立蛇的信息数组
    MyThis.MyInit = function() {
        for (var i = 0; i < 4; i++) {
            MyThis.SnakeArr.push({
                x: MyThis.ColNum / 2 + i - 2,
                y: MyThis.RowNum / 2,
                d: 'l'
            });
        }
        //		刷新画布
        MyThis.MyFlashCtx();
    }
    //	刷新画布
    MyThis.MyFlashCtx = function() {
        //		绘制背景
        MyThis.MyCtx.fillStyle = '#0b0d0f';
        MyThis.MyCtx.fillRect(0, 0, MyThis.MyEle.width, MyThis.MyEle.height);
        //		绘制食物
        if (MyThis.FoodArr.length != 0) {
            MyThis.MyCtx.drawImage(foodImg, MyThis.FoodArr[0].x * 25, MyThis.FoodArr[0].y * 25, 25, 25);
        }
        //		绘制身体
        for (var i = 0; i < MyThis.SnakeArr.length; i++) {
            //			如果是蛇头的时候
            if (i == 0) {
                var head = '';
                switch (MyThis.SnakeArr[0].d) {
                    case 'l':
                        head = headImg;
                        break;
                    case 'r':
                        head = headImg;
                        break;
                    case 't':
                        head = headImg;
                        break;
                    case 'b':
                        head = headImg;
                        break;
                }
                //				画蛇头
                MyThis.MyCtx.drawImage(head, MyThis.SnakeArr[i].x * 25, MyThis.SnakeArr[i].y * 25, 25, 25);
            } else {
                //				画蛇身
                MyThis.MyCtx.drawImage(bodyImg, MyThis.SnakeArr[i].x * 25, MyThis.SnakeArr[i].y * 25, 25, 25);
            }
        }

        //		写分数
        MyThis.MyCtx.font = '20px 微软雅黑';
        MyThis.MyCtx.fillStyle = 'white';
        MyThis.MyCtx.fillText('得分:' + MyThis.Score, 0, 30);
    }


}

var obj = new snake();
obj.RunIt();
