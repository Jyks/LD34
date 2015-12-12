// Here we initialize the canvas code

var canvas, ctx;

var width = 800;
var height = 600;
var fps = 60;
var debug_mode = true;

function debug(msg) {
	if(msg === undefined) return debug_mode;
	else if(debug_mode) console.log(msg);
}

window.onload = function() {
	canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	
	ctx = canvas.getContext("2d");
	
	requestAnimationFrame = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| window.mozRequestAnimationFrame;
	
	var frames = 0;
	
	var main = function() {
		var now = Date.now();
		var delta = now - last;
		frames++;
		
		update(delta);
		ctx.clearRect(0, 0, width, height);
		render();
		
		last = now;
		requestAnimationFrame(main);
	}
	
	init();
	var last = Date.now();
	main();

	setInterval(function() {
		fps = frames;
		frames = 0;
	}, 1000);
}
