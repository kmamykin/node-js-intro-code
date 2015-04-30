var Promise = require('q').Promise
var request = require('request')
var fs = require('fs')

var urls = [
  'http://version1.api.memegenerator.net/Generators_Search?q=clinton&pageIndex=0&pageSize=12',
  'http://version1.api.memegenerator.net/Generators_Search?q=bush&pageIndex=0&pageSize=12',
  'https://api.imgflip.com/get_memes'
]

//fetchUrl(urls[0]).then(console.log, console.error) // chainable

//Promise.all(urls.map(fetchUrl)).then(function (results) {
//  console.log(results)
//}, console.error)

fetchUrl(urls[0])
  .then(JSON.parse)
  .then(extractImageUrls2('bals'))
  .then(downloadImages)
  .then(Promise.all)
  .then(console.log, console.error)

// url -> Promise<body>
function fetchUrl (url) {
  // Use ES6 compatible Promise
  return new Promise(function (resolve, reject, notify) {
    request(url, function (error, response, body) {
      if (error) {
        reject(error)
      } else if (response.statusCode >= 400) {
        reject(response.statusMessage)
      } else {
        resolve(body)
      }
    })
  })
}
//var Q = require('q')
//var readFile = Q.denodeify(fs.readFile)
//readFile('promises.js').then(function (buffer) {
//  console.log(buffer.toString())
//})

// url -> filename -> Promise<filename>
function downloadImage (uri, filename) {
  return new Promise(function (resolve, reject, notify) {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', function () { resolve(filename) })
      .on('error', reject)
  })
}

function downloadImages (imageUrls) {
  return imageUrls.map(function (imageUrl) {
    return downloadImage(imageUrl, newImageFileName())
  })
}

function extractImageUrls2(param) {
  return function extractImageUrls (data) {
    return data.result.map(function (meme) { return meme.imageUrl })
  }
}

var counter = 0
function newImageFileName () {
  var time = new Date().getTime().toString()
  return './public/' + time + '-' + counter++ + '.jpg'
}

