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
	combo: 0,
	combo_size: 1,
	mode: true
};

var xoffset = 0;
var img_background, img_player;

function init() {
	img_background = document.getElementById("img_background");
	img_player = document.getElementById("img_player");
}

function render() {
	setColor("black");
	setFont("Arial", 16);
	
	// Background
	for(var x = -width; x <= width; x += width)
		drawImage(img_background, x + shake.x + xoffset, 0);
	
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
	
	// Combo
	/*if(player.combo > 1 && player.combo_size > 1) {
		setFont("Arial", 10 + player.combo_size * 4);
		setColor("blue");
		drawText(player.combo, textHeight() / 2, height - textHeight() * 1.5);
	}*/
	
	// Canvas edges
	drawRect(0, 0, width, height);
}

function update(delta) {
	xoffset -= delta * .3;
	xoffset %= width;
	
	//player.g *= 1 + .002 * delta;
	//if(player.g > delta * (player.combo > 1 ? player.combo / 8 : 1)) player.g = delta * (player.combo > 1 ? player.combo / 8 : 1);
	//else if(player.g < delta / 4) player.g = delta / 4;
	
	if(player.down && player.y < height - 17) {
		player.y += .3 * delta;
	} else if(!player.down && player.y > 17) {
		player.y -= .3 * delta;
	} else {
		player.y = player.down ? height - 17 : 17;
		player.combo = 0;
	}

	/*if(player.combo > 1 && player.combo_size < player.combo) {
		player.combo_size *= 1.05;
	} else if(player.combo <= 1) {
		player.combo_size *= .7;
		if(player.combo_size < 1) player.combo_size = 1;
	}*/

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
}
