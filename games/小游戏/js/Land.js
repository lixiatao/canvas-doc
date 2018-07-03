(function(){
    window.Land = class Land{
        constructor(){
            this.image = game.R["land"];
            //位置
            this.x = 0;
            this.y = 410 + (game.mycanvas.height - 512)  ;
            //宽度
            this.width = 336;
            this.height = 112;
            //速度
            this.speed = 3;
        }
        update(){
            this.x -= this.speed;
            if(this.x < -this.width) this.x = 0;
        }
        render(){
            game.ctx.drawImage(this.image,this.x,this.y); 
            game.ctx.drawImage(this.image,this.x + this.width,this.y); 
            game.ctx.drawImage(this.image,this.x + this.width * 2,this.y); 

            //糊上
            game.ctx.fillStyle = "#ded895";
            game.ctx.fillRect(0,this.y + this.height,game.mycanvas.width,game.mycanvas.height - this.y - this.height);
        }
    }
})();