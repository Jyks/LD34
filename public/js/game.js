// This file houses the game's main logic

var shake = {
	time: 0,
	x: 0,
	y: 0
};

var bullets = [];
var enemies = [[],[]];

var xoffset = 0, y = 400, g = 0, pull = 0, origpull = 0, momentum = 0, lastenemy = 64, time = 0;
var img_background, img_player, img_enemy1, img_enemy2;

function bullet(bx, by, bs, bd) {
	bullets[bullets.length] = {
		x: bx,
		y: by,
		s: bs,
		d: bd
	};

	debug("Bullet time! " + JSON.stringify(bullets[bullets.length-1]));
}

function init() {
	img_background = document.getElementById("img_background");
	img_player = document.getElementById("img_player");
	img_enemy1 = document.getElementById("img_enemy1");
	img_enemy2 = document.getElementById("img_enemy2");
}

function render() {
	setColor("black");
	setFont("Arial", 16);
	
	// Background
	for(var i = -width; i <= width; i += width)
		drawImage(img_background, i + shake.x + (xoffset % width), shake.y - 10);
	
	// Bullets
	bullets.forEach(function(bullet) {
		fillCircleCentered(xoffset + bullet.x + shake.x, bullet.y + shake.y, bullet.d);
	});

	// Enemies
	enemies[0].forEach(function(enemy) {
		// Type 1
		drawImageCentered(img_enemy1, enemy.x + xoffset + shake.x, enemy.y + shake.y,
					enemy.scale * img_enemy1.naturalWidth, enemy.scale * img_enemy2.naturalHeight);
	});
	enemies[1].forEach(function(enemy) {
		// Type 2
		drawImageCentered(img_enemy2, enemy.x + xoffset + shake.x, enemy.y + shake.y,
					enemy.scale * img_enemy2.naturalWidth, enemy.scale * img_enemy2.naturalHeight);
	});
	
	// Player
	if(pull === 0) drawImageCentered(img_player, 260 + shake.x, y + shake.y);
	else drawImage(img_player,
			260 + shake.x - pull - img_player.naturalWidth / 2,
			y + shake.y - img_player.naturalHeight / 2,
			img_player.naturalWidth + pull,
			img_player.naturalHeight);
	
	// FPS
	if(debug()) {
		setColor("white");
		fillRect(6, 6, textWidth(fps) + 4, textHeight() + 4);
		setColor("red");
		drawText(fps, 8, 8);
	}

	// Floor
	setColor("black");
	fillRect(0, height - 4, width, 4);
	
	// Canvas edges
	drawRect(0, 0, width, height);
}

function update(delta) {
	time += delta / 16;
	xoffset -= (1 + time / 10000) * delta * .025;
	
	if((lastenemy > 64 && randomInt(72) === 8) || lastenemy > 256) {
		for(var i = 0; i < 8; i++) {
			if(randomInt(16) === 2) {
				if(randomInt(2) === 1) {
					// Type 1
					enemies[0][enemies[0].length] = {x: width - xoffset, y: 32 + i * (height / 8), scale: 1};
				} else {
					// Type 2
					enemies[1][enemies[1].length] = {x: width - xoffset, y: 32 + i * (height / 8), scale: 1};
				}
			}
		}
		
		lastenemy = 0;
	} else lastenemy += delta / 16;

	if(shake.time > 0) {
		shake.x = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
		shake.y = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
		shake.time -= delta;
	} else if(shake.x !== 0 || shake.y !== 0) {
		shake.x = 0;
		shake.y = 0;
	}
	
	for(var i = 0; i < bullets.length; i++) {
		if(bullets[i] === undefined) continue;

		bullets[i].x += .025 * bullets[i].s * delta;
		if(xoffset + bullet.x > width) {
			debug((xoffset + bullet.x) + " greater than " + width);
			delete bullets[i];
		}
		
		for(var j = 0; j < enemies[1].length; j++) {
			if(enemies[1][j] !== undefined
			&& bullets[i] !== undefined
			&& enemies[1][j].x - img_enemy2.naturalWidth / 2  - bullets[i].d / 2 < bullets[i].x
			&& enemies[1][j].y - img_enemy2.naturalHeight / 2 - bullets[i].d / 2 < bullets[i].y
			&& enemies[1][j].x + img_enemy2.naturalWidth / 2 + bullets[i].d / 2 > bullets[i].x
			&& enemies[1][j].y + img_enemy2.naturalHeight / 2 + bullets[i].d / 2 > bullets[i].y) {
				delete enemies[1][j];
				delete bullets[i];
			}
		}
		
		for(var j = 0; j < enemies[0].length; j++) {
			if(enemies[0][j] !== undefined
			&& bullets[i] !== undefined
			&& enemies[0][j].x - img_enemy1.naturalWidth / 2  - bullets[i].d / 2 < bullets[i].x
			&& enemies[0][j].y - img_enemy1.naturalHeight / 2 - bullets[i].d / 2 < bullets[i].y
			&& enemies[0][j].x + img_enemy1.naturalWidth / 2 + bullets[i].d / 2 > bullets[i].x
			&& enemies[0][j].y + img_enemy1.naturalHeight / 2 + bullets[i].d / 2 > bullets[i].y) {
				enemies[0][j].scale /= 1 + bullets[i].d / 6;
				if(enemies[0][j].scale <= .2) delete enemies[0][j];
				delete bullets[i];
			}
		}
	}
	
	if(!keyboard[37]) {
		if(pull == 0) {
			y += g;
			
			if(y < 17) {
				y = 17;
				if(g < 0) g = 0;
			} else if(y < height - img_player.naturalHeight / 2 - 4) g += 1;
			else g = 0;
			
			if(y > height - img_player.naturalHeight / 2 - 4) y = height - img_player.naturalHeight / 2 - 4;
			
			if(shake.time > 0) {
				shake.x = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
				shake.y = choose([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
				
				shake.time -= delta;
			} else if(shake.x !== 0 || shake.y !== 0) {
				shake.x = 0;
				shake.y = 0;
			}
			
			if(keyboard.press[38]) {
				if(g >= 0) g = -20;
				delete keyboard.press[38];
			}
		} else if(pull > 0) {
			momentum += .1 * delta;
			pull -= momentum;
			
			if(pull < 0) {
				if(origpull > 16) bullet(-xoffset + 260, y, delta * 2 - (origpull / 20), origpull / 8);
				pull = 0;
				origpull = 0;
				g = 0;
			}
		}
	} else {
		shake.time = 10;
		pull += .075 * delta;
		origpull = pull;
	}
}
