const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/groundNew.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const foodGoodImg = new Image();
foodGoodImg.src = "img/foodGood.png";

const BigFoodImg = new Image();
BigFoodImg.src = "img/foodBig.png";

let backGround = document.querySelector('body');

let block = 32;

let flag1 = true;

let flag2 = true;

let score = 0;

let bestScore = 0;

let colorHead = 120;

let clearDrawGame = true;

let checkPause = true;

//класс еды
class Food {
	constructor() {
		this.food = {
			x: Math.floor((Math.random() * 17 + 1)) * block,
			y: Math.floor((Math.random() * 15 + 3)) * block,
		};
	}

	eat(snakeX, snakeY, proverka) {
		if (snakeX == this.food.x && snakeY == this.food.y) {
			score++;
			if (score > bestScore) bestScore = score;

			this.food = {
				x: Math.floor((Math.random() * 17 + 1)) * block,
				y: Math.floor((Math.random() * 15 + 3)) * block,
			};
			if (proverka == "fd1") {
				score++;
				if (score > bestScore) bestScore = score;

				colorHead -= 5;
				if (colorHead < 70) colorHead = 70;

				console.log(colorHead);

				let helpTail = {
					x: snakeX,
					y: snakeY
				};
				snk.snake.push(helpTail);
				flag1 = true;
				flag2 = true;
			}
		}
		else if (proverka == "fd") {
			snk.snake.pop();
		}
	}
}
//--------------------------------------------------------------

let fd = new Food();
let fd1 = new Food();

//класс змеи
class Snake {
	snake = [];

	constructor() {
		this.snake[0] = {
			x: 9 * block,
			y: 10 * block
		};
	}

	drawSnake() {
		for (let i = 0; i < this.snake.length; i++) {
			if (i == 0) {
				if (colorHead == 120) {
					ctx.fillStyle = "#238100";
				}
				else if (colorHead == 115) {
					backGround.style.background = "#00FFFA";
					ctx.fillStyle = "#4B69EB";
				}
				else if (colorHead == 110) {
					backGround.style.background = "#E900FF";
					ctx.fillStyle = "blueviolet";
				}
				else if (colorHead == 105) {
					backGround.style.background = "#FA5504";
					ctx.fillStyle = "#730202";
				}
				else if (colorHead == 100) {
					backGround.style.background = "#FFFF00";
					ctx.fillStyle = "yellow";
				}
				else if (colorHead < 100) {
					backGround.style.background = "#9C9C9C";
					ctx.fillStyle = "black";
				}
			}
			else if (i % 3 == 1) {
				if (colorHead == 120) ctx.fillStyle = "#66FF66";
				else if (colorHead == 115) ctx.fillStyle = "#49CEE6";
				else if (colorHead == 110) ctx.fillStyle = "#A75CF2";
				else if (colorHead == 105) ctx.fillStyle = "#A60303";
				else if (colorHead == 100) ctx.fillStyle = "#FFF257";
				else if (colorHead < 100) ctx.fillStyle = "#575757";
			}
			else if (i % 3 == 2) {
				if (colorHead == 120) ctx.fillStyle = "#99FF99";
				else if (colorHead == 115) ctx.fillStyle = "#6EE3E6";
				else if (colorHead == 110) ctx.fillStyle = "#BF8DF2";
				else if (colorHead == 105) ctx.fillStyle = "#F20505";
				else if (colorHead == 100) ctx.fillStyle = "#FFF1A0";
				else if (colorHead < 100) ctx.fillStyle = "#757575";
			}
			else if (i % 3 == 0) {
				if (colorHead == 120) ctx.fillStyle = "#CCFFCC";
				else if (colorHead == 115) ctx.fillStyle = "#9CE2E6";
				else if (colorHead == 110) ctx.fillStyle = "#DAC2F2";
				else if (colorHead == 105) ctx.fillStyle = "#F24E29";
				else if (colorHead == 100) ctx.fillStyle = "#FFFCA1";
				else if (colorHead < 100) ctx.fillStyle = "#A1A1A1";
			}
			ctx.fillRect(this.snake[i].x, this.snake[i].y, block, block);
		}
	}
}
//--------------------------------------------------------------------

let snk = new Snake();



//обработка события нажатие на кнопку "Начать заново"
const clickRestart = document.getElementById('restart');
clickRestart.addEventListener("click", restartFuncButton);

function restartFuncButton() {
	location.reload();
}
//--------------------------------------------------------

//рестарт с помощью пробела
document.addEventListener("keydown", restartFuncKey);

function restartFuncKey(event) {
	if (event.keyCode == 32) location.reload();
}
//--------------------------------------------------



//обработка события нажатие на кнопку "keyboard"
const clickKeyboard = document.getElementById('keyboard');
clickKeyboard.addEventListener("click", keyboardFuncButton);

function keyboardFuncButton() {
	alert('              УПРАВЛЕНИЕ\nWASD или стрелочки = движение\nSpace = начать заново\nEsc = пауза\nQ = инструкция управления');
}
//----------------------------------------------

//открытие инструкции управления с помощью клавиши q
document.addEventListener("keydown", keyboardFuncKey);

function keyboardFuncKey(event) {
	if (event.keyCode == 81) {
		alert('              УПРАВЛЕНИЕ\nWASD или стрелочки = движение\nSpace = начать заново\nEsc = пауза\nQ = инструкция управления');
	}
}
//----------------------------------------------



//обработка события нажатие на кнопку "pause"
const clickPause = document.getElementById('pause');
clickPause.addEventListener("click", pauseFuncButton);

let pauseImg = document.getElementById('pauseImg');

function pauseFuncButton() {
	if (clearDrawGame == true && checkPause == true) {
		clearDrawGame = false;
		pauseList.style.display = 'flex';
		pauseImg.src = "img/pauseTreug.png";
	}
	else if (clearDrawGame == false && checkPause == true) {
		clearDrawGame = true;
		pauseList.style.display = 'none';
		pauseImg.src = "img/pausePalki.png";
		drawGame();
	}
}
//----------------------------------------------

//пауза с помощью клавиши ESC
document.addEventListener("keydown", pauseFuncKey);

function pauseFuncKey(event) {
	if (event.keyCode == 27) {
		if (clearDrawGame == true && checkPause == true) {
			clearDrawGame = false;
			pauseList.style.display = 'flex';
			pauseImg.src = "img/pauseTreug.png";
		}
		else if (clearDrawGame == false && checkPause == true) {
			clearDrawGame = true;
			pauseList.style.display = 'none';
			pauseImg.src = "img/pausePalki.png";
			drawGame();
		}
	}
}
//----------------------------------------------



//создание действия клавиатуры (движение змейки)
document.addEventListener("keydown", direction);

let move;

function direction(event) {
	if((event.keyCode == 37 || event.keyCode == 65) && move != "right")
		move = "left";
	else if ((event.keyCode == 38 || event.keyCode == 87) && move != "down")
		move = "up";
	else if ((event.keyCode == 39 || event.keyCode == 68) && move != "left")
		move = "right";
	else if ((event.keyCode == 40 || event.keyCode == 83) && move != "up")
		move = "down";
}
//------------------------------------------------------------------------

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) {
			clearDrawGame = false;
			checkPause = false;
        }
	}
}

let drawGame = function() {
	ctx.drawImage(ground, 0, 0); //рисуем поле
			
	ctx.drawImage(foodImg, fd.food.x, fd.food.y); //рисуем еду на поле

	//добавление новой еды
	if ((score != 0 && score % 10 == 0) || flag2 == false) {
		if (flag1 == true) {
			fd1.food.x = Math.floor((Math.random() * 17 + 1)) * block;
			fd1.food.y = Math.floor((Math.random() * 15 + 3)) * block;
			if (fd.food.x == fd1.food.x && fd.food.y == fd1.food.y) {
				if (fd.food.x / block == 1) fd1.food.x = 3 * block;
				else if (fd.food.x / block == 17) fd1.food.x = 15 * block;
				else fd1.food.x = (fd.food.x / block - 1) * block;
			}
			flag1 = false;
			flag2 = false;
		}
		ctx.drawImage(foodGoodImg, fd1.food.x, fd1.food.y);
		fd1.eat(snk.snake[0].x, snk.snake[0].y, "fd1");
	}
	//----------------------------
			
	ctx.drawImage(BigFoodImg, block * 0.6, block * 0.31); //рисуем еду у счётчика
			
	snk.drawSnake(); //рисуем змею
			
	//оформляем счётчик
	if (score < 10) ctx.fillStyle = "white";
	else if (score < 20) ctx.fillStyle = "#4B69EB";
	else if (score < 30) ctx.fillStyle = "blueviolet";
	else if (score < 40) ctx.fillStyle = "red";
	else if (score < 50) ctx.fillStyle = "yellow";
	else if (score < 256) ctx.fillStyle = "black";
	ctx.font = "50px Play";
	ctx.fillText(score, block * 2.5, block * 1.7);
	//--------------------------------------------

	//оформляем лучший результат
	ctx.fillStyle = "white";
	ctx.font = "50px Play";
	ctx.fillText(`Рекорд: ${bestScore}`, block * 10, block * 1.7);
	//-----------------------------------------------
			
	let snakeX = snk.snake[0].x; //координаты головы по x
	let snakeY = snk.snake[0].y; //координаты головы по y
			
	fd.eat(snakeX, snakeY, "fd"); //проверка, съели ли мы еду
			
	if (snakeX < block || snakeX > block * 17 || snakeY < 3 * block || snakeY > block * 17) { //проверка выхода за пределы
		clearDrawGame = false;
		checkPause = false;
	}

	//определение движения змеи
	if (move == "left") snakeX -= block;
	if (move == "right") snakeX += block;
	if (move == "up") snakeY -= block;
	if (move == "down") snakeY += block;
	//-------------------------------
			
	let newHead = { //новые координаты головы
		x: snakeX,
		y: snakeY
	};
			
	eatTail(newHead, snk.snake); //проверка, не съели ли мы хвост
			
	snk.snake.unshift(newHead); //передвижение головы
	if (clearDrawGame == true) game = setTimeout(drawGame, colorHead);
}

drawGame();

//local storage
window.onunload = function() {
	localStorage.setItem('best', JSON.stringify(bestScore));
}

window.onload = function() {
	let bestA = localStorage.getItem('best');
	bestScore = JSON.parse(bestA);
}
//-----------------------------------------------------------