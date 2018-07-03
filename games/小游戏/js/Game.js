(function(){
    //构造函数
    window.Game = class Game{
        constructor(){
            //得到画布
            this.mycanvas = document.getElementById("mycanvas");
            //设置上下文，也设置成为Game的属性
            this.ctx = this.mycanvas.getContext("2d");
            //设置画布的宽度和高度
            this.init();
            //场景编号
            this.scene = 0;
            //分数
            this.score = 0;
            //读取所有资源
            this.loadResource(function(){
                //回调函数
                this.start();
            });
        }
        init(){
            //设置canvas的宽度和高度，适配当前的视口
            this.mycanvas.width = document.documentElement.clientWidth;
            this.mycanvas.height = document.documentElement.clientHeight;
            //要验收，因为要把宽度、高度卡在一个区间内。
            if(this.mycanvas.width > 500){
                 this.mycanvas.width = 500;
            }
            if(this.mycanvas.height > 800){
                 this.mycanvas.height = 800;
            }
        }
        loadResource(callback){
            //设置R对象
            this.R = {
                "bg_day"    : "images/bg_day.png",
                "bg_night"  : "images/bg_night.png",
                "bird0_0"   : "images/bird0_0.png",
                "bird0_1"   : "images/bird0_1.png",
                "bird0_2"   : "images/bird0_2.png",
                "land"   : "images/land.png",
                "pipe_down"   : "images/pipe_down.png",
                "pipe_up"   : "images/pipe_up.png",
                "title"   : "images/title.png",
                "button_play"   : "images/button_play.png",
                "tutorial"   : "images/tutorial.png",
                "0" : "images/font_048.png",
                "1" : "images/font_049.png",
                "2" : "images/font_050.png",
                "3" : "images/font_051.png",
                "4" : "images/font_052.png",
                "5" : "images/font_053.png",
                "6" : "images/font_054.png",
                "7" : "images/font_055.png",
                "8" : "images/font_056.png",
                "9" : "images/font_057.png" ,
                "gameoverbg.png" : "images/gameoverbg.png",
                "b0" : "images/b0.png",
                "b1" : "images/b1.png",
                "b2" : "images/b2.png",
                "b3" : "images/b3.png",
                "b4" : "images/b4.png",
                "b5" : "images/b5.png",
                "b6" : "images/b6.png",
                "b7" : "images/b7.png",
                "b8" : "images/b8.png",
                "b9" : "images/b9.png",
                "b10" : "images/b10.png",
                "b11" : "images/b11.png"
            };
            //现在要得到图片的总数
            var imagesAmount = Object.keys(this.R).length;
            //备份this
            var self = this;
            //计数器，加载好的图片个数
            var count = 0;
            //遍历R对象，加载图片
            for(var k in this.R){
                (function(k){
                    var image = new Image();
                    image.src = self.R[k];
                    //监听图片加载完成
                    image.onload = function(){
                        //计数
                        count++;
                        //改变R对象，让R对象对应的k的值变为这个图片对象
                        self.R[k] = this;
                        //提示用户
                        self.ctx.textAlign = "center";
                        self.ctx.font = "20px 黑体";
                        //清屏
                        self.clear();
                        self.ctx.fillText("正在加载图片" + count + "/" + imagesAmount , self.mycanvas.width/2 , self.mycanvas.height/2 * 0.618);
                        //如果加载好的数量等于总数，说明全都加载好了
                        if(count == imagesAmount){
                            //全部加载完毕，执行回调函数。
                            callback.call(self);
                        }
                    }
                })(k);
            }
        }
        clear(){
            this.ctx.clearRect(0,0,this.mycanvas.width,this.mycanvas.height);
        }
        start(){
            //start的调用是在loadResource之后
            //设置帧编号
            this.fno = 0;
            //Game类只new出场景管理器即可
            this.sm = new SceneManager();
            //命令场景管理器进入场景0
            this.sm.gotoScene(this.scene);

            //主循环，bind表示设置上下文，但是不调用，call会调用函数
            this.timer = setInterval(this.loop.bind(this),20);
        }
        loop(){
            //清屏
            this.clear();
            //帧编号加1
            this.fno++;

            //命令场景管理器更新并渲染
            this.sm.updateandrender();

            //显示帧编号，方便测试
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "top";
            this.ctx.font = "16px consolas";
            this.ctx.fillStyle = "#333";
            this.ctx.fillText("帧编号" + this.fno , 10 ,10);
            this.ctx.fillText("场景号" + this.scene , 10 ,30);
        }
    }
})();