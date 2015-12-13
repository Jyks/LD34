var colors = {
	black: "#000000",
	white: "#FFFFFF",
	red: "#FF0000",
	green: "#00FF00",
	blue: "#0000FF",
	yellow: "#FFFF00",
};

function drawRect(x, y, w, h) {
	 ctx.beginPath();
	 ctx.rect(x, y, w, h);
	 ctx.closePath();
	 ctx.stroke();
}

function fillRect(x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
}

function setColor(color) {
	ctx.fillStyle = colors[color] || "#" + color;
}

function setFont(font, size) {
	ctx.font = size + "px " + font;
}

function drawText(text, x, y) {
	ctx.fillText(text, x, y + textHeight());
}

function textWidth(text) {
	return ctx.measureText(text).width;
}

function textHeight() {
	return Number(ctx.font.split("px")[0]);
}

function drawImage(img, x, y, w, h) {
	if(w === undefined || h === undefined) ctx.drawImage(img, x, y);
	else ctx.drawImage(img, x, y, w, h);
}

function drawImageCentered(img, x, y, w, h) {
	if(w === undefined || h === undefined) ctx.drawImage(img, x - img.naturalWidth / 2, y - img.naturalHeight / 2);
	else ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
}

function drawCircle(x, y, d) {
	ctx.beginPath();
	ctx.arc(x + d / 2, y + d / 2, d / 2, 0, 2 * Math.PI);
	ctx.stroke();
}

function fillCircle(x, y, d) {
	ctx.beginPath();
	ctx.arc(x + d / 2, y + d / 2, d / 2, 0, 2 * Math.PI);
	ctx.fill();
}

function fillCircleCentered(x, y, d) {
	ctx.beginPath();
	ctx.arc(x, y, d / 2, 0, 2 * Math.PI);
	ctx.fill();
}
