




### Demo:Snake Game
![Markdown1](images/samplepic.png)

[Link](https://spiraleyeld.github.io/Snake_Game/demo.html)




### Tip:Change direction
![Markdown2](images/cor.png)

由於畫布的機制是每120毫秒會更新一次，所以我們得先搞懂蛇身變換時，陣列的配置
，假設有一條蛇，蛇頭是{x:9,y:10}，蛇身是{x:10,y:10}，假設今天蛇的長度不變，但
改變蛇的方向向下，則蛇頭會是新的座標位置，原來蛇尾的座標會消失，新的蛇尾是原
本蛇頭的座標，所以可以得知，每次改變方向的時候，蛇陣列0的位置要unshift(新增)
一個新座標，但因為只是改變方向，不是吃東西變長，所以為了維持原始長度，尾巴
要pop(陣列尾巴移除)一個蛇尾座標，如此，就可以達到蛇在移動的效果。



