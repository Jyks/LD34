var app = require('express')();
var http = require('http').Server(app);

var public_dir = __dirname + "/public/";
var port = 6969;

var static_files = [
	{get: "/", give: "index.html"},
	{get: "/init.js", give: "js/init.js"},
	{get: "/game.js", give: "js/game.js"},
	{get: "/graphics.js", give: "js/graphics.js"},
	{get: "/input.js", give: "js/input.js"},
	{get: "/random.js", give: "js/random.js"},
	{get: "/util.js", give: "js/util.js"},
	{get: "/map.js", give: "js/map.js"},
	{get: "/favicon.ico", give: "favicon.ico"},
	{get: "/floor.png", give: "images/floor.png"},
	{get: "/wall.png", give: "images/wall.png"},
	{get: "/player.png", give: "images/player.png"},
	{get: "/btn_unpressed.png", give: "images/btn_unpressed.png"},
	{get: "/btn_pressed.png", give: "images/btn_pressed.png"},
	{get: "/enemy_16.png", give: "images/enemy_16.png"},
];

static_files.forEach(function(file) {
	app.get(file.get, function(req, res) {
		res.sendFile(public_dir + file.give);
	});
});

http.listen(port);
console.log("Listening on " + port);
