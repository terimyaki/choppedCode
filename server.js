var http = require('http');

var PORT_NUMBER = 3000;

var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end();
});

server.listen(PORT_NUMBER);
console.log("Server is listening at localhost:" + PORT_NUMBER + "...");