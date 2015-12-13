// This file houses the game's main logic

var shake = {
	time: 0,
	x: 0,
	y: 0
};

var xoffset = 0, y = 400, g = 0, pull = 0, momentum = 0;
var img_background, img_player, img_block;

function init() {
	img_background = document.getElementById("img_background");
	img_player = document.getElementById("img_player");
	img_block = document.getElementById("img_block");
}

function render() {
	setColor("black");
	setFont("Arial", 16);
	
	// Background
	for(var i = -width; i <= width; i += width)
		drawImage(img_background, i + shake.x + (xoffset % width), 0);
	
	// Player
	drawImageCentered(img_player, 260 + shake.x - pull, y + shake.y);
	
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
	
	if(!keyboard[37]) {
		if(pull == 0) {
			y += g;
			
			if(y < 17) {
				y = 17;
				if(g < 0) g = 0;
			} else if(y < height - 17) g += 1;
			else g = 0;
			
			if(y > height - 17) y = height - 17;
			
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
				//y -= 100;
				delete keyboard.press[38];
			}
		} else if(pull > 0) {
			momentum += .1 * delta;
			pull -= momentum;
			
			if(pull < 0) {
				pull = 0;
				g = 0;
			}
		}
	} else pull += .075 * delta;
}
