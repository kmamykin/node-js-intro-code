var fs = require('fs')
var crypto = require('crypto')
var shasum = crypto.createHash('sha1')

module.exports = {
  doSync: function () {
    return { result: 'OK' }
  },
  doAsync: function (callback) {
    fs.readFile('exampleModule.js', myFunc(callback))
  }
}

function myFunc (callback) {
  return function (err, buffer) {
    if (err) return callback(err, null)
    shasum.update(buffer)
    callback(null, shasum.digest('hex'))
  }
}
