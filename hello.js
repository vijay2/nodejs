var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8012, '0.0.0.0');
console.log('Server running at http://139.59.74.228:8080/');
