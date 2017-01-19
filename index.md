## Welcome to AWei's GitHub




### Snake Game
![Markdown1](images/samplepic.png)

[Demo](https://spiraleyeld.github.io/Snake_Game/demo.html)

### 
![Markdown2](images/cor.png)

```markdown

  function heartChange(){
					
					if(Math.abs(r[0].x-x1)<t1 && Math.abs(r[0].y-y1)<t2){
						
						while(true){
							var countError =0;
							x1=canvas.width*Math.random();
							y1=canvas.height*Math.random();
							for(var i=0;i<r.length;i++){
								if(Math.abs(r[i].x-x1)<12 && Math.abs(r[i].y-y1)<12){
									countError+=1;
								}
							}
							
                            if(y1>10 && y1<170 && x1>10 && x1<350 && countError==0){
								break;
							}
								
						}
                        
						// If the heart changed the positon one time, then score +1 and the list +1. 
						score+=1;
						r.unshift({x:r[0].x,y:r[0].y});
					}
				}  

```



