		
			
				var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
				
				//載入人物圖片
				var ghost = new Image() ;
				var heart = new Image();
				var guide = new Image();
				


				ghost.src = "images/ghost.png" ;
				heart.src = "images/heart.png";	  
				guide.src = "images/awsd.png";
				

				//此段是要控制小精靈距離愛心多遠才算吃掉
				var t1 =15;
				var t2 =15;	  
				
				//給予分數初値，以及顯示字體的相關參數
				var score=0;
				context.font="5px 微軟正黑體";
				context.fillStyle="white";
				

				// 給予執行主程式的初値
				var count = 0;
				
				// 小精靈的座標
				r = [{x:190,y:80}];
				d = r.length;
				// 愛心的座標
				x1 = 150, y1 =50;
				// 上下左右提示的座標
				x2 = 320, y2 =8;

		
				var cor= {x:0,y:0};
				
				z=0; //y座標移動的距離初値
				q=0; //x座標移動的距離初値
				k=25; // x,y 座標移動的每次移動的距離
				

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

							// clear picture
							context.clearRect(0,0,400,200);
							// 第一層 成績
							context.fillText("S c o r e :  "+score,8,18);	
							// 第二層 指標
							context.drawImage(guide,0,0,70,45,x2,y2,70,45);
							// 第三層 小精靈(畫出整條蛇)
							for(var i =0;i<r.length; i++){
								context.drawImage(ghost,0,0,29,26,r[i].x,r[i].y,29,26);
								if(r.length==1){
									iThink='awei_is_cool';
								}else if(i==r.length-1){
									r.pop();
								}

							};
							
							
							// 第四層 愛心
							context.drawImage(heart,0,0,25,25,x1,y1,25,25);

							 
							// 指定小精靈在正常情況下的位移，以及隨時搭配"心動時刻"
							
							
							
						
							if(r[0].y>=0 || r[0].y<=176 && r[0].x>=0 || r[0].x<=372 ){
							r[0].y+=z;
							r[0].x+=q;
							r.unshift({x:r[0].x,y:r[0].y});
							
							heartChange();
							}
							// 匡住小精靈的移動範圍
							if(r[0].y<=0){
								r[0].y=0;
								alert('gg');
							}
							// 匡住小精靈的移動範圍
							if(r[0].y>=176){
								r[0].y=176;
								alert('gg');
							}
							// 匡住小精靈的移動範圍
							if(r[0].x<=0){
								r[0].x=0;
								alert('gg');
							}
							// 匡住小精靈的移動範圍
							if(r[0].x>=372){
								r[0].x=372;
								alert('gg');
							}
									
								
							
									
							break;
					}
				}

			



				var code1;
				function fowardChange(){
					code1 = event.keyCode;
					switch (code1) {
						case 87:
						break;
						case 68:
						break;
						case 83:
						break;
						case 65:
						break;
						case 32:
						break;
					}
					// 這邊有個小技巧，如果x座標已經設定移動距離z，y座標的移動距離q要設定爲0，
					// 目的是要讓小精靈行進時，每次按鍵都維持在單一方向。
					if(code1==87){
						
						
						z=-k;
						q=0;
						
						
					}
					if(code1==68){
						q=k;
						z=0;
						
					}
					if(code1==83){
						z=k;
						q=0;
						
					}
					if(code1==65){
						q=-k;
						z=0;
						
					}
					if(code1==32){
						q=0;
						z=0;	
					}
					if(code1==null){
						q=0;
						z=0;
						
					}
				}

				
				// 主要是計算小精靈與愛心的距離（絶對値）當兩者非常接近時，就改變愛心的位置。
				function heartChange(){
					
					if(Math.abs(r[0].x-x1)<t1 && Math.abs(r[0].y-y1)<t2){
						
						while(true){
							x1=canvas.width*Math.random();
							y1=canvas.height*Math.random();
								if(y1>0 && y1<176 && x1>0 && x1<372){
									break;
								}
								// 只要讓愛心位移（被吃）一次，分數就加一
						}
						score+=1;
						r.unshift({x:r[0].x,y:r[0].y});
					}
				}
				
		
				
				// html載入時，重複執行main
				window.addEventListener('load',setInterval(main, 120),false);
				window.addEventListener('load',heartChange,false);
			
				window.addEventListener('keyup',fowardChange,false);
				
