var http = require('http'),
	fs = require('fs'),
	url = require('url');

var PORT_NUMBER = 3000;
var SERVER_URL = "localhost";

var server = http.createServer(function(request, response) {
	console.log("Request: " + request.url);

	var pathname = url.parse(request.url).pathname;
	
	switch (pathname){
		case '/results':
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end("<html><p>FAIL</p></html>");
			break;
		case '/app.js':
			fs.readFile("app.js", function(error, javascript){
				response.writeHead(200, {"Content-Type": "text/javascript"});
				response.end(javascript);
			});
			break;
		default:
			fs.readFile("index.html", function(error, html){
				response.writeHead(200, {"Content-Type": "text/html"});
				response.end(html);
			});
			break;
		}

});

server.listen(PORT_NUMBER);
console.log("Server is listening at " + SERVER_URL + ":" + PORT_NUMBER + "...");