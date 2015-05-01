var Promise = require('q').Promise
var request = require('request')
var fs = require('fs')

// url -> filename -> Promise<filename>
module.exports = function downloadImage (uri, filename) {
  return new Promise(function (resolve, reject, notify) {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', function () { resolve(filename) })
      .on('error', reject)
  })
}
