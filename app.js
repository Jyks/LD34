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
	{get: "/favicon.ico", give: "favicon.ico"},
	{get: "/background.png", give: "images/background.png"},
	{get: "/player.gif", give: "images/player.gif"}
];

static_files.forEach(function(file) {
	app.get(file.get, function(req, res) {
		res.sendFile(public_dir + file.give);
	});
});

http.listen(port);
console.log("Listening on " + port);
