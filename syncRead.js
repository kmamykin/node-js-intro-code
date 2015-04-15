

var fs = require('fs')

var buffer = fs.readFileSync('syncRead.js')

console.log(buffer.toString())
