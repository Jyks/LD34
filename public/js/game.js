// This file houses the game's main logic

var shake = {
	time: 0,
	x: 0,
	y: 0
};

var player = {
	x: 400,
	y: 300,
	speedx: 0,
	speedy: 0,
	scale: 1
};

var cam = {
	x: 0,
	y: 0
};

var btn = [
	{
		x: 100,
		y: 100,
		pressed: false,
		hide: false,
		scale: 1
	},{
		x: -100,
		y: -100,
		pressed: false,
		hide: false,
		scale: 1
	}
];

var enemies = {
	16: [
		{startx: 200, starty: 300, x: 200, y: 300}
	]
};

var ai = {
	16: [
		0,
		0, 100,
		100, 100,
		100, 0,
		0, 0
	],
}

var img_background, img_player, img_btn_unpressed, img_btn_pressed;

function init() {
	img_background = document.getElementById("img_background");
	img_player = document.getElementById("img_player");
	img_btn_unpressed = document.getElementById("img_btn_unpressed");
	img_btn_pressed = document.getElementById("img_btn_pressed");
	img_enemy_16 = document.getElementById("img_enemy_16");
}

function render() {
	setColor("black");
	setFont("Arial", 16);
	
	// Background
	for(var x = -width; x <= width; x += width) {
		for(var y = -height; y <= height; y += height) {
			var draw_x = x + shake.x + (cam.x % width), draw_y = y + shake.y + (cam.y % height);
			if(draw_x < width && draw_y < height && draw_x > -width && draw_y > -height)
				drawImage(img_background, draw_x, draw_y);
		}
	}
	
	// Buttons
	btn.forEach(function(button) {
		if(button.scale > .01) {
			drawImageScaled(button.pressed ? img_btn_pressed : img_btn_unpressed,
				button.x + shake.x + cam.x,
				button.y + shake.y + cam.y,
				button.scale);
		}
	});

	// Enemies
	enemies[16].forEach(function(enemy) {
		drawImage(img_enemy_16, enemy.x + shake.x + cam.x, enemy.y + shake.y + cam.y);
	});
	
	// Player
	drawImageScaled(img_player, player.x + shake.x + cam.x, player.y + shake.y + cam.y, player.scale);

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
	// Update enemy locations
	enemies[16].forEach(function(enemy) {
		var tox = ai[16][ai[16][0]*2+1];
		var toy = ai[16][ai[16][0]*2+2];
		
		var next = function() {
			ai[16][0]++;
			if(ai[16][0] >= ai[16].length / 2 - 1) ai[16][0] = 0;
		};
		
		if(Math.abs(enemy.startx - enemy.x) < tox) enemy.x++;
		else if(Math.abs(enemy.startx - enemy.x) > tox) enemy.x--;
		else if(Math.abs(enemy.starty - enemy.y) < toy) enemy.y++;
		else if(Math.abs(enemy.starty - enemy.y) > toy) enemy.y--;
		else next();
	});
	
	btn.forEach(function(button) {
		// Hide button if pressed
		if(button.hide && button.scale > .01) button.scale /= 1.15;
		else if(button.hide && button.scale < .01) button.scale = .01;
		else if(!button.hide && button.scale < 1) button.scale *= 1.15;
		else if(!button.hide && button.scale > 1) button.scale = 1;
		
		// Check for button presses
		if(collision({
			x1: player.x,
			y1: player.y,
			x2: button.x + 16,
			y2: button.y + 16,
			w1: 32,
			h1: 32,
			w2: 48 - 32,
			h2: 48 - 32
		}) && !button.pressed && !button.hide) {
			button.pressed = true;
			button.hide = true;
			shake.time = 500;
		}
	});
	
	if(shake.time > 0) {
		shake.x = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
		shake.y = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);

		shake.time -= delta;
	} else if(shake.x !== 0 || shake.y !== 0) {
		shake.x = shake.y = 0;
	}
	
	if(!keyboard[39] && !keyboard[37]) {
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
	
	player.x += player.speedx * player.scale;
	player.y += player.speedy * player.scale;
	
	cam.x = 400 - player.x;
	cam.y = 300 - player.y;
	//cam.x -= player.speedx * player.scale;
	//cam.y -= player.speedy * player.scale;
	
	if(keyboard[90]) {
		// Get larger
		player.scale *= 1.05;
	} else if(keyboard[88]) {
		// Get smaller
		player.scale /= 1.05;
	}

	if(keyboard.press[32]) {
		var ok = false;

		btn.forEach(function(button) {
			if(button.hide && !ok) {
				button.hide = false;
				button.pressed = false;
				ok = true;
			}
		});
		
		delete keyboard.press[32];
	}
}
