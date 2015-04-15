

var fs = require('fs')
fs.readFile('asyncRead.js', function (err, buffer) {
  if (err) return console.error(err)
  console.log(buffer.toString())
})
