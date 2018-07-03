(function(){
    window.Pipe = class Pipe{
        constructor(){
            //管子类有两个图片，一个管子类的实例，负责渲染上下一对儿管子
            this.image_up = game.R["pipe_up"];      //开口向上的管子
            this.image_down = game.R["pipe_down"]; //开口向下的管子
            //x位置
            this.x = game.mycanvas.width;
            //上面管子的高度
            this.h1 = parseInt(Math.random() * 300) + 80;
            //定义空隙，空隙越小游戏越难
            this.space = 140;
            //下面的管子能够被计算出来，112表示大地的图片高度
            this.h2 = game.mycanvas.height - 112 - this.h1 - this.space + 10;
            //自己是否已经被加分了
            this.done = false;
        }
        update(){
            this.x-= game.land.speed;
            var self = this;
            //自己验收，如果已经出了屏幕，自己杀死自己
            if(this.x < -52){
                game.pipeArr.forEach(function(item,index){
                    if(item === self){
                        game.pipeArr.splice(index,1)
                    }
                });
            }

            //自己的碰撞盒
            this.L_U = this.x;
            this.B_U = this.h1;
            this.R_U = this.x + 52;
            this.L_D = this.x;
            this.T_D = this.h1 + this.space;
            this.R_D = this.x + 52;

            //碰撞检测，检查自己有没有撞鸟
            if(
                game.bird.R > this.L_D && game.bird.B > this.T_D && game.bird.L < this.R_D
                ||
                game.bird.R > this.L_U && game.bird.T < this.B_U && game.bird.L < this.R_U 
            ){
                //撞管子了，就去3号场景
                game.sm.gotoScene(3);
            }

            //加分检测
            if(!this.done && game.bird.L > this.R_U){
                game.score++; //加分
                this.done = true; //设置自己为true

                //播放音乐
                document.querySelector("#sfx_point").load();
                document.querySelector("#sfx_point").play();
            }
        }
        render(){
            //先用矩形代替图片
            game.ctx.drawImage(this.image_down,0,400-this.h1,52,this.h1,this.x,0,52,this.h1);
            game.ctx.drawImage(this.image_up,0,0,52,this.h2,this.x,this.h1+this.space,52,this.h2);
        }
    }
})();