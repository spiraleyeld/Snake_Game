
//定義畫布	
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.font = "13px fantasy";
context.fillStyle = "white";

//載入圖片
var ghost = new Image(); var heart = new Image();
var guide = new Image(); var gg = new Image();
var ghostHead = new Image();
var headUpLeft = new Image();
var headUpRight = new Image();
var headLeft = new Image();
var headRight = new Image();
var headDownLeft = new Image();
var headDownRight = new Image();

ghost.src = "images/ghost.png"; heart.src = "images/heart.png";
guide.src = "images/awsd.png"; gg.src = "images/gg.png";
ghostHead.src = "images/ghostHead.png";

headUpRight.src = "images/headUpLeft.png";
headUpLeft.src = "images/headUpLeft.png";
headLeft.src = "images/headLeft.png";
headRight.src = "images/headRight.png";
headDownLeft.src = "images/headDownLeft.png";
headDownRight.src = "images/headDownRight.png";

//設定初值
var score = 0; //給予分數初値，以及顯示字體的相關參數waw
var count = 0; // 給予執行主程式的初値	
var snakeCor = [{ x: 190, y: 80 }]; // 小精靈的座標
var heartCorX = 150, heartCorY = 50; // 愛心的座標
var tipX = 220; var tipY = 8; // 上下左右提示的座標	
var moveY = 0; //y座標移動的距離初値
var moveX = 0; //x座標移動的距離初値
var movDis = 30; // x,y 座標移動的每次移動的距離
var limitX = 15; var limitY = 15; //此段是要控制小精靈距離愛心多遠才算吃掉
var blockUpper = true; var blockRight = true;
var blockDown = true; var blockLeft = true;
var keyPress;
var timestampOld = 0
var timestampNew = 0
var countExceptAction = 0

function draw() {
	// 說明：
	// 1.程式每run一次，一開始會先把上一次有更動過的圖層淸掉
	// 2.接著依序draw 各項要素
	// 3.因爲要素與要素之間有順序關係，越後面越上層，彼此不干擾。
	switch (count) {
		case 0:
			context.clearRect(0, 0, 300, 200); // 第零層 clear picture
			context.fillText("Score : " + score, 8, 40); // 第一層 成績	 
			context.fillText("Restart : Enter", 8, 20);
			context.drawImage(guide, 0, 0, 70, 45, tipX, tipY, 70, 45); // 第二層 指標

			for (var i = 0; i < snakeCor.length; i++) { // 第三層 小精靈(畫出整條蛇)

				switch (i) {
					case 0:
						context.drawImage(ghostHead, 0, 0, 29, 26, snakeCor[i].x, snakeCor[i].y, 29, 26);
						break;
					case 1:
						context.drawImage(ghostHead, 0, 0, 29, 26, snakeCor[i].x, snakeCor[i].y, 29, 26);
						break;
					default:
						context.drawImage(ghost, 0, 0, 29, 26, snakeCor[i].x, snakeCor[i].y, 29, 26);
						break;
				}

				if (snakeCor.length == 1) {
					iThink = 'awei_is_cool';
				} else if (i == snakeCor.length - 1) {
					snakeCor.pop();
				}
			};

			context.drawImage(heart, 0, 0, 25, 25, heartCorX, heartCorY, 25, 25); // 第四層 愛心
			// 指定小精靈在正常情況下的位移，以及隨時搭配"心動時刻"										
			if (snakeCor[0].y > 0 || snakeCor[0].y < 176 && snakeCor[0].x > 0 || snakeCor[0].x < 378) {
				//console.log("Now: ", snakeCor);
				snakeCor[0].y += moveY;
				snakeCor[0].x += moveX;
				snakeBodyGroth(snakeCor)
				checkDie(snakeCor);
				changeHeart();
			}
			checkWall(snakeCor);
			countExceptAction = 0;
			break;
	}
}

function snakeBodyGroth(snakeCor) {
	snakeCor.unshift({ x: snakeCor[0].x, y: snakeCor[0].y });
}

function checkDie(snakeCor) {
	//console.log(countduplicateBody);
	// 判斷蛇身是否有重疊，，如果成立count+1，因為count=1，所以遊戲會停止執行。
	for (var i = 4; i < snakeCor.length; i++) {
		if (snakeCor[1].x == snakeCor[i].x && snakeCor[1].y == snakeCor[i].y) {
			//console.log(snakeCor);
			count = 1;
			if (count > 0) {
				context.drawImage(gg, 0, 0, 150, 60, 75, 75, 150, 60);
			}
		}
	}
}

function checkWall(snakeCor) {
	// 匡住小精靈的移動範圍
	if (snakeCor[0].y <= 0) {
		snakeCor[0].y = 175;
	}
	if (snakeCor[0].y >= 190) {
		snakeCor[0].y = 0;
	}
	if (snakeCor[0].x <= 0) {
		snakeCor[0].x = 276;
	}
	if (snakeCor[0].x >= 277) {
		snakeCor[0].x = -25;
	}
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	while (1)
		if ((new Date().getTime() - start) > milliseconds)
			break;
}


function changeFoward() {
	//console.log(snakeCor);
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

	//極為重要的一步，因為畫布是每150毫秒更新一次，
	//按鍵按太快，有可能導致moveX, moveY, 後面的蓋掉前面的，而導致蛇原地平行移動。
	if (countExceptAction !== 0) {
		return;
	} else {
		countExceptAction += 1;
	}
	
	// 這邊有個小技巧，如果x座標已經設定移動距離moveY，y座標的移動距離moveX要設定爲0，
	// 目的是要讓小精靈行進時，每次按鍵都維持在單一方向。
	if (keyPress == 87 && blockUpper == true) {
		//console.log(87);
		moveY = -movDis;
		moveX = 0;
		blockUpper = false; blockRight = true; blockDown = false; blockLeft = true;
		//console.log(moveX, moveY);

	}
	if (keyPress == 68 && blockRight == true) {
		//console.log(68);
		moveX = movDis;
		moveY = 0;
		blockRight = false; blockUpper = true; blockDown = true; blockLeft = false;
		//console.log(moveX, moveY );
	}
	if (keyPress == 83 && blockDown == true) {
		//console.log(83);
		moveY = movDis;
		moveX = 0;
		blockDown = false; blockUpper = false; blockRight = true; blockLeft = true;
		//console.log(moveX, moveY);
	}
	if (keyPress == 65 && blockLeft == true) {
		//console.log(65);
		moveX = -movDis;
		moveY = 0;
		blockLeft = false; blockUpper = true; blockRight = false; blockDown = true;
		//console.log(moveX, moveY);
	}
}

// 主要是計算小精靈與愛心的距離（絶對値）當兩者非常接近時，就改變愛心的位置。
function changeHeart() {
	if (Math.abs(snakeCor[0].x - heartCorX) < limitX && Math.abs(snakeCor[0].y - heartCorY) < limitY) {
		while (true) {
			var countError = 0;
			heartCorX = canvas.width * Math.random();
			heartCorY = canvas.height * Math.random();
			for (var i = 0; i < snakeCor.length; i++) {
				if (Math.abs(snakeCor[i].x - heartCorX) < 12 && Math.abs(snakeCor[i].y - heartCorY) < 12) {
					countError += 1;
				}
			}
			if (heartCorY > 10 && heartCorY < 170 && heartCorX > 10 && heartCorX < 280 && countError == 0) {
				break;
			}
		}
		// 只要讓愛心位移（被吃）一次，分數就加一					
		score += 1;
		snakeBodyGroth(snakeCor);
	}
}

document.addEventListener('keyup', function (e) {
	if (e.keyCode == 32 || e.keyCode == 13)
		window.location.reload();
})
// html載入時，重複執行main
window.addEventListener('load', function () { setInterval(draw, 150) }, false);
window.addEventListener('load', changeHeart, false);
window.addEventListener('keydown', changeFoward, false);

