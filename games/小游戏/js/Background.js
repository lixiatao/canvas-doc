(function(){
    window.Background = class Background{
        constructor(){
            //自己的图片
            this.image = game.R["bg_day"];
            //速度
            this.speed = 1;
            //图片的高度
            this.height = 512;
            this.width = 288;
            //自己的位置，垂直居中s
            this.x = 0;
            this.y = game.mycanvas.height - this.height;
        }
        render(){
            //绘制3张图片，目的是制作无缝连续滚动
            game.ctx.drawImage(this.image,this.x,this.y);
            game.ctx.drawImage(this.image,this.x + this.width,this.y);
            game.ctx.drawImage(this.image,this.x + this.width * 2,this.y);
            //绘制矩形，糊上
            game.ctx.fillStyle = "#4ec0ca";
            game.ctx.fillRect(0,0,game.mycanvas.width,this.y + 2);
            game.ctx.fillStyle = "#5ee270";
            game.ctx.fillRect(0,this.y + this.height,game.mycanvas.width,this.y);
        }
        update(){
            //让背景左移，制造小鸟正在飞翔的感觉
            this.x -= this.speed;
            //要做一个无缝连续滚动的效果，所以当克隆的图片左边到达边线的时候，拉回来。
            if(this.x < -this.width){
                this.x = 0;
            }
        }
    }
})();