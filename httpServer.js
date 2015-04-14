var
  fs = require('fs'),
  http = require('http')

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  fs.readFile('httpServer.jss', function (err, buffer) {
    if (err) {
      res.end(err.toString())
    } else {
      res.end(buffer.toString())
    }
  })
}).listen(8888, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8888/')
