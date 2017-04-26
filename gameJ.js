		
			
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
				
//載入人物圖片
var ghost = new Image() ; var heart = new Image();
var guide = new Image(); var gg	= new Image();

ghost.src = "images/ghost.png" ; heart.src = "images/heart.png";	  
guide.src = "images/awsd.png"; gg.src = "images/gg.png";
				
var score=0; //給予分數初値，以及顯示字體的相關參數waw
var count = 0; // 給予執行主程式的初値

context.font="15px Courier New";
context.fillStyle="white";				

snakeCor = [{x:190,y:80}]; // 小精靈的座標
heartCorX = 150, heartCorY =50; // 愛心的座標
tipX = 320, tipY =8; // 上下左右提示的座標				

moveY=0; //y座標移動的距離初値
moveX=0; //x座標移動的距離初値
movDis=29; // x,y 座標移動的每次移動的距離
var limitX =15; var limitY =15; //此段是要控制小精靈距離愛心多遠才算吃掉		

// 遊戱的主執行程式
function main(){
	draw();
}

function draw() {	  					   
	switch(count) 
	{		
		case 0:
		// 說明：
		// 1.程式每run一次，一開始會先把上一次有更動過的圖層淸掉
		// 2.接著依序draw 各項要素
		// 3.因爲要素與要素之間有順序關係，越後面越上層，彼此不干擾。
		context.clearRect(0,0,400,200); // 第零層 clear picture
		context.fillText("Score : "+score,8,18); // 第一層 成績	 
		context.drawImage(guide,0,0,70,45,tipX,tipY,70,45); // 第二層 指標
		
		for(var i =0;i<snakeCor.length; i++){ // 第三層 小精靈(畫出整條蛇)
			context.drawImage(ghost,0,0,29,26,snakeCor[i].x,snakeCor[i].y,29,26);
			if(snakeCor.length==1){
				iThink='awei_is_cool';
			}else if(i==snakeCor.length-1){
				snakeCor.pop();
			}
		};
		
		context.drawImage(heart,0,0,25,25,heartCorX,heartCorY,25,25); // 第四層 愛心
		// 指定小精靈在正常情況下的位移，以及隨時搭配"心動時刻"										
		if(snakeCor[0].y>0 || snakeCor[0].y<176 && snakeCor[0].x>0 || snakeCor[0].x<378 ){
			snakeCor[0].y+=moveY;
			snakeCor[0].x+=moveX;
		// 判斷蛇身是否有重疊，，如果成立count+1，因為count=1，所以遊戲會停止執行。
			for(var i=1;i<snakeCor.length;i++){
				if(snakeCor[0].x==snakeCor[i].x && snakeCor[0].y == snakeCor[i].y){
					count=0;
					count+=1;
					if(count>0){						
						context.drawImage(gg,0,0,150,60,125,75,150,60);
					}
				}
			}
			snakeCor.unshift({x:snakeCor[0].x,y:snakeCor[0].y});				
			heartChange();
		}
		// 匡住小精靈的移動範圍
		if(snakeCor[0].y<=0){						
			snakeCor[0].y=175;						
		}
		if(snakeCor[0].y>=176){								
			snakeCor[0].y=0;					
		}
		if(snakeCor[0].x<=0){
			snakeCor[0].x=376;									
		}
		if(snakeCor[0].x>=377){
			snakeCor[0].x=-25;										
		}								
			break;
	}
}

var blockUpper=true;var blockRight=true;
var blockDown=true;	var blockLeft=true;
var keyPress;

function fowardChange(){
	keyPress = event.keyCode;
	switch (keyPress) {
		case 87: // keyboard: W
		break;
		case 68: // keyboard: D
		break;
		case 83: // keyboard: S
		break;
		case 65: // keyboard: A
		break;
		case 32: // keyboard: Space
		break;
	}
// 這邊有個小技巧，如果x座標已經設定移動距離moveY，y座標的移動距離moveX要設定爲0，
// 目的是要讓小精靈行進時，每次按鍵都維持在單一方向。
	if(keyPress==87 && blockUpper==true){
		moveY=-movDis;
		moveX=0;
		blockRight=true;
		blockDown=false;
		blockLeft=true;					
	}
	if(keyPress==68 && blockRight==true){
		moveX=movDis;
		moveY=0;
		blockUpper=true;
		blockDown=true;
		blockLeft=false;					
	}
	if(keyPress==83 && blockDown==true){
		moveY=movDis;
		moveX=0;
		blockUpper=false;
		blockRight=true;
		blockLeft=true;
	}
	if(keyPress==65 && blockLeft==true){
		moveX=-movDis;
		moveY=0;
		blockUpper=true;
		blockRight=false;
		blockDown=true;					
	}
}
				
// 主要是計算小精靈與愛心的距離（絶對値）當兩者非常接近時，就改變愛心的位置。
function heartChange(){
	if(Math.abs(snakeCor[0].x-heartCorX)<limitX && Math.abs(snakeCor[0].y-heartCorY)<limitY){					
		while(true){
			var countError =0;
			heartCorX=canvas.width*Math.random();
			heartCorY=canvas.height*Math.random();
			for(var i=0;i<snakeCor.length;i++){
				if(Math.abs(snakeCor[i].x-heartCorX)<12 && Math.abs(snakeCor[i].y-heartCorY)<12){
					countError+=1;
				}
			}
			if(heartCorY>10 && heartCorY<170 && heartCorX>10 && heartCorX<350 && countError==0){
				break;
			}				
		}
		// 只要讓愛心位移（被吃）一次，分數就加一					
		score+=1;
		snakeCor.unshift({x:snakeCor[0].x,y:snakeCor[0].y});
	}
}				
// html載入時，重複執行main
window.addEventListener('load',setInterval(main, 120),false);
window.addEventListener('load',heartChange,false);
window.addEventListener('keyup',fowardChange,false);
				
