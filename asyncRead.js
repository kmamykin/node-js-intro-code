var fs = require('fs')

fs.readFile('asyncRead.js', function (err, buffer) {
  if (err) return console.log(err)
  console.log(buffer.toString())
})
