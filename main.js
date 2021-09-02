var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// main character object
var dino = {
	x: 10,
	y: 200,
	width: 50,
	height: 50,
	draw() {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
// 애니메이션 효과

// 장애물
class Cactus {
	constructor() {
		this.x = 500;
		this.y = 200;
		this.width = 50;
		this.height = 50;
	}

	draw() {
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var timer = 0;
var cactusArr = [];
// 1초에 60frame
function animationEffectbyFrame() {
	requestAnimationFrame(animationEffectbyFrame);
	++timer;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 2초에 1번만
	if (timer % 120 === 0) {
		// 배열로 장애물 관리
		var cactus = new Cactus();
		cactusArr.push(cactus);
	}

	// 장애물 배열 그리기
	cactusArr.forEach((a) => {
		a.x--;
		a.draw();
	})

	dino.draw();
}
animationEffectbyFrame();
