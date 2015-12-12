// This file catches input events and turns them into easy-to-use object

var keyboard = {press: [], release: []};
var mouse = {
	down: false,
	x: -1,
	y: -1
};

canvas.onmousedown = function() { return false; };

canvas.addEventListener("mousedown", function(evt) {
	mouse.down = true;
	return false;
}, false);

document.addEventListener("mouseup", function(evt) {
	mouse.down = false;
	return false;
}, false);

document.addEventListener("mousemove", function(evt) {
	mouse.x = evt.x - canvas.offsetLeft;
	mouse.y = evt.y - canvas.offsetTop;
}, false);

window.addEventListener("keydown", function(evt) {
	keyboard[evt.keyCode] = true;
	keyboard.press[evt.keyCode] = true;
	debug("pressed " + evt.keyCode);
	evt.preventDefault();
}, false);

window.addEventListener("keyup", function(evt) {
	keyboard.release[evt.keyCode] = true;
	delete keyboard[evt.keyCode];
}, false);
