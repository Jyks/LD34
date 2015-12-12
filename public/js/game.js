// This file houses the game's main logic

var shake = {
	time: 0,
	x: 0,
	y: 0
};

var player = {
	y: 300,
	g: 0,
	down: true,
	combo: 0
};

var xoffset = 0;
var img_background, img_player;

function init() {
	img_background = document.getElementById("img_background");
	img_player = document.getElementById("img_player");
	
	debug("Initialized.");
}

function render() {
	setColor("black");
	setFont("Arial", 16);
	
	// Background
	for(var x = -width; x <= width; x += width) {
		drawImage(img_background, x + shake.x + (xoffset % width), 0);
	}

	// Player
	ctx.save();
	ctx.scale(1, player.down ? 1 : -1);
	drawImageCentered(img_player, 260 + shake.x, (player.y + shake.y) * (player.down ? 1 : -1));
	ctx.restore();
	
	// FPS
	if(debug()) {
		setColor("white");
		fillRect(6, 6, textWidth(fps) + 4, textHeight() + 4);
		setColor("red");
		drawText(fps, 8, 8);
	}
	
	// Canvas edges
	drawRect(0, 0, width, height);
}

function update(delta) {
	xoffset -= delta * .3;
	
	player.g *= 1 + .002 * delta;
	if(player.g > delta) player.g = delta;
	else if(player.g < 4) player.g = 4;
	
	if(player.down && player.y < height - 17) {
		player.y += player.g;
	} else if(!player.down && player.y > 17) {
		player.y -= player.g;
	} else {
		player.g = 4;
		player.y = player.down ? height - 17 : 17;
		player.combo = 0;
	}

	if(shake.time > 0) {
		shake.x = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
		shake.y = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);

		shake.time -= delta;
	} else if(shake.x !== 0 || shake.y !== 0) {
		shake.x = 0;
		shake.y = 0;
	}
	
	if(keyboard.press[38] || keyboard.press[40]) {
		player.down = !player.down;
		player.combo++;
		delete keyboard.press[38];
		delete keyboard.press[40];
	}

	/*if(!keyboard[39] && !keyboard[37]) {
		if(player.speedx > 0) {
			player.speedx -= .1 * delta;
			if(player.speedx < 0) player.speedx = 0;
		} else if(player.speedx < 0) {
			player.speedx += .1 * delta;
			if(player.speedx > 0) player.speedx = 0;
		}
	}

	if(!keyboard[38] && !keyboard[40]) {
		if(player.speedy > 0) {
			player.speedy -= .1 * delta;
			if(player.speedy < 0) player.speedy = 0;
		} else if(player.speedy < 0) {
			player.speedy += .1 * delta;
			if(player.speedy > 0) player.speedy = 0;
		}
	}

	if(keyboard[37]) player.speedx -= .05 * delta; // left
	if(keyboard[38]) player.speedy -= .05 * delta; // up
	if(keyboard[39]) player.speedx += .05 * delta; // right
	if(keyboard[40]) player.speedy += .05 * delta; // down

	if(player.speedx > .3 * delta) player.speedx = .3 * delta;
	else if(player.speedx < -(.3 * delta)) player.speedx = -(.3 * delta);

	if(player.speedy > .3 * delta) player.speedy = .3 * delta;
	else if(player.speedy < -(.3 * delta)) player.speedy = -(.3 * delta);
	
	if(keyboard[32]) {
		shake.time = delta * 2;
		player.x += 3 * player.speedx;
		player.y += 3 * player.speedy;
	} else {
		player.x += player.speedx;
		player.y += player.speedy;
		
		cam.x -= player.speedx;
		cam.y -= player.speedy;
	}*/
}
