var Promise = require('q').Promise
var fetchUrl = require('./fetchUrl')
var downloadImage = require('./downloadImage')
var memes = require('./memes')
var await = require('./await')

await(function * () {
  var initial = 0
  var res1 = yield asyncAdd(initial, 1)
  var res2 = yield asyncAdd(res1, 1)
  var res3 = yield asyncAdd(res2, 1)
  var res4 = yield asyncAdd(res3, 1)
  return asyncAdd(res4, 1)
}).then(console.log, console.error)

await(function * () {
  var body = yield fetchUrl(memes.urls[0])
  var urlsToFiles = memes.mapToFilenames(memes.extractImageUrls(JSON.parse(body)))
  return urlsToFiles.map(function (arr) { return downloadImage(arr[0], arr[1]) }) // return array of Promises
}).then(console.log, console.error)

function asyncAdd (val1, val2) {
  return new Promise(function (resolve, reject) {
    process.nextTick(function () {
      resolve(val1 + val2)
    })
  })
}
