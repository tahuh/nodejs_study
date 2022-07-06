var http = require('http');

http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type' : 'text/html' });
	response.end('<h1>Hello World!</h1>');
}).listen(3000, function() {
	console.log('server is running at http://127.0.0.1:3000');
	console.log(__filename);
	console.log(__dirname);
})
