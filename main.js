var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


// images
var dino_img = new Image();
dino_img.src = "dino.png";
var cactus_img = new Image();
cactus_img = "cactus.png";

// main character object
var dino = {
	x: 10,
	y: 200,
	width: 50,
	height: 50,
	draw() {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(dino_img, this.x, this.y, this.width, this.height);
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
		ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height);
	}
}

var timer = 0;
var cactusArr = [];
var jump_timer = 0;
var animation;

// 1초에 60frame
function animationEffectbyFrame() {
	animation = requestAnimationFrame(animationEffectbyFrame);
	++timer;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 2초(120 프레임)에 1번만
	if (timer % 220 === 0) {
		// 배열로 장애물 관리
		var cactus = new Cactus();
		cactusArr.push(cactus);
	}

	// 장애물 배열 그리기
	cactusArr.forEach((a, i, o) => {
		// x좌표가 0 미만이면 제거
		if (a.x < 0) {
			// 제거한다.
			o.splice(i, 1);
		}
		a.x--;

		// collision check
		check_collision(dino, a);
		a.draw();
	})

	// dino jump
	if (is_jump == true) {
		dino.y -= 2;
		++jump_timer;
	} else {
		if (dino.y < 200) {
			dino.y += 2;
		}
	}

	if (jump_timer > 50) {
		is_jump = false;
		jump_timer = 0;
	}
	dino.draw();
}
animationEffectbyFrame();

// collision check
function check_collision(dino, cactus) {
	var x_diff = cactus.x - (dino.x + dino.width);
	var y_diff = cactus.y - (dino.y + dino.height);
	if (x_diff < 0 && y_diff < 0) {
		// 클리어
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		cancelAnimationFrame(animation);
	}
}


var is_jump = false;
document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		is_jump = true;
	}
})
