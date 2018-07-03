(function(){
	window.SceneManager = class SceneManager{
		constructor(){
			this.bindEvent();
		}
		gotoScene(number){
			//更新game类的场景编号
			game.scene = number;

			//根据当前进入了第几个场景来决定new出谁
			switch(game.scene){
				case 0 :
					game.background = new Background();
					game.land = new Land();
					//小信号量，logo的y
					this.logoY = -48;
					//小信号量，开始按钮的y
					this.startBtnY = game.mycanvas.height;
					this.startBtnEndY = 440;
					//小信号量，注意这个鸟和Bird类没有关系！！
					this.birdY = 240;
					this.birdImages = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]];
					this.birdWing = 0;
					this.birdYMin = 240;
					this.birdYMax = 300;
					this.birdSpeed = 2;
					this.birdDirection = "DOWN";
					break;
				case 1 :
					game.background = new Background();
					game.land = new Land();
					//鸟
					this.birdY = 240;
					this.birdImages = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]];
					this.birdWing = 0;
					//教程图片
					this.tutorialY = 300;
					this.tutorialOpacity = 1;
					break;
				case 2 :
					game.background = new Background();
					game.land = new Land();
					game.bird = new Bird();
					game.pipeArr = [];
					game.score = 0;	//每次进入场景2，分数重新算
					break;
				case 3 :
					this.gameoverbgOpacity = 1;
					//爆炸序号
					this.bomb = 0;
					this.lock = false;
					//播放音乐
					document.querySelector("#sfx_hit").load();
					document.querySelector("#sfx_hit").play();
					document.querySelector("#sfx_die").load();
					document.querySelector("#sfx_die").play();
					break;
			}
		}
		updateandrender(){
			//根据是几号场景来决定哪些东西要更新和渲染
			switch(game.scene){
				case 0 :
					//背景和大地
					game.background.render();
					game.land.update();
					game.land.render();

					//LOGO。裸写，所谓的裸写表示不需要把logo做成一个类
					this.logoY+=10;
					if(this.logoY > 160) this.logoY = 160;
					game.ctx.drawImage(game.R["title"] , (game.mycanvas.width - 178) / 2 , this.logoY);
					
					//开始按钮
					this.startBtnY-=10;
					if(this.startBtnY < this.startBtnEndY){
						this.startBtnY = this.startBtnEndY;
					}
					game.ctx.drawImage(game.R["button_play"], (game.mycanvas.width - 116) / 2 , this.startBtnY);
					
					//小鸟
					if(this.birdDirection == "DOWN"){
						this.birdY += this.birdSpeed;
						if(this.birdY > this.birdYMax){
							this.birdDirection = "UP";
						}
					}else if(this.birdDirection == "UP"){
						this.birdY -= this.birdSpeed;
						if(this.birdY < this.birdYMin){
							this.birdDirection = "DOWN";
						}
					}
					//翅膀
					game.fno % 3 == 0 && this.birdWing++;
					if(this.birdWing > 2) this.birdWing = 0;
					game.ctx.drawImage(this.birdImages[this.birdWing] , (game.mycanvas.width - 48) / 2 , this.birdY);
					break;
				case 1 :
					//背景和大地
					game.background.render();
					game.land.update();
					game.land.render();
					//小鸟
					game.fno % 3 == 0 && this.birdWing++;
					if(this.birdWing > 2) this.birdWing = 0;
					game.ctx.drawImage(this.birdImages[this.birdWing] , (game.mycanvas.width - 48) / 2 * 0.618 , 200);
					//教程小图
					this.tutorialOpacity -=0.1;
					if(this.tutorialOpacity < 0) this.tutorialOpacity = 1;
					game.ctx.save();
					game.ctx.globalAlpha = this.tutorialOpacity;
					game.ctx.drawImage(game.R["tutorial"], (game.mycanvas.width - 114) / 2 , this.tutorialY);
					game.ctx.restore();
					break;
				case 2 :
			        //更新、渲染背景
			        game.background.update();
			        game.background.render();
			        //更新、渲染大地
			        game.land.update();
			        game.land.render();
			        //更新、渲染小鸟
			        game.bird.update();
			        game.bird.render();

			        //每帧都要更新、渲染所有管子
			        for(var i = game.pipeArr.length - 1 ; i >= 0 ; i--){
						game.pipeArr[i].update();
						game.pipeArr[i].render();
			        };

			        //每100帧产生新的管子
			        if(game.fno % 100 == 0) game.pipeArr.push(new Pipe());

			        //图形化显示分数
			        //得到分数的位数
			        var length = game.score.toString().length;
			        //基准位置（就是最开头的数字的x值）
			        var base = game.mycanvas.width / 2 - length * 14;
			        //当前这个字符应该在的位置
			        for(var i = 0 ; i < length ; i++){
			        	game.ctx.drawImage(game.R[game.score.toString().charAt(i)],base + 28 * i,100);
			        }
			        
					break;
				case 3 :
					//渲染背景
			        game.background.render();
			        //渲染大地
			        game.land.render();
			       
			        //每帧都要更新、渲染所有管子
			        for(var i = game.pipeArr.length - 1 ; i >= 0 ; i--){
						game.pipeArr[i].render();
			        };

			        //图形化显示分数
			        //得到分数的位数
			        var length = game.score.toString().length;
			        //基准位置（就是最开头的数字的x值）
			        var base = game.mycanvas.width / 2 - length * 14;
			        //当前这个字符应该在的位置
			        for(var i = 0 ; i < length ; i++){
			        	game.ctx.drawImage(game.R[game.score.toString().charAt(i)],base + 28 * i,100);
			        }

			        //渲染掉血图
			        this.gameoverbgOpacity-=0.05;
			        if(this.gameoverbgOpacity > 0){
			        	game.ctx.save();
				        game.ctx.globalAlpha = this.gameoverbgOpacity;
				        game.ctx.drawImage(game.R["gameoverbg.png"],0,0,game.mycanvas.width , game.mycanvas.height)
						game.ctx.restore();
			        }
			        //小鸟掉落
			        if(game.bird.cy < game.land.y){
			        	//渲染小鸟
			        	game.bird.cy+= 11;
			        	game.bird.render();
			        }else{
			        	//渲染爆炸动画
			        	game.fno % 3 == 0 && this.bomb++;
			        	if(this.bomb > 11){
			        		//爆炸结束了，显示logo
			        		// game.ctx.drawImage(game.R["logo"],game.mycanvas.width / 2 - 112.5 , 200);
			        		game.ctx.textAlign = "center";
			        		game.ctx.fillStyle = "white";
			        		game.ctx.font = "22px 微软雅黑";
			        		game.ctx.fillText("点击任意地方继续",game.mycanvas.width / 2 , 270);
			        		this.lock = true;
			        		return;
			        	}
			        	game.ctx.drawImage(game.R["b" + this.bomb],game.bird.cx - 40,game.bird.cy - 110);
			        }
			      
					break;
			}
		}
		bindEvent(){
			var self = this;
			var lock = true;
			//添加事件监听
			game.mycanvas.addEventListener("click",function(event){
				if(!lock) return;
				var x = event.offsetX;
				var y = event.offsetY;

				handler(x,y);

				lock = true;
			},false);


			document.addEventListener("touchstart",function(event){
				var x = event.touches[0].clientX;
				var y = event.touches[0].clientY;

				console.log(x,y)

				handler(x,y);
				lock = false;
			},false);


			function handler(x,y){
				switch(game.scene){
					case 0 :
						//点击到了按钮
						if(x > game.mycanvas.width / 2 - 58 && x < game.mycanvas.width / 2 + 58 && y > self.startBtnY && y < self.startBtnY + 70){
							//去1号场景
							self.gotoScene(1);
						}
						break;
					case 1 :
						self.gotoScene(2);
						break;
					case 2 :
						game.bird.fly();
						break;
					case 3 :
						self.lock && self.gotoScene(0);
						break;
				}
			}
		}
	}
})();