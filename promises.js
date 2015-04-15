var Q = require('q')
var request = require('request')
var fs = require('fs')

var urls = [
  'http://version1.api.memegenerator.net/Generators_Search?q=clinton&pageIndex=0&pageSize=12',
  'https://api.imgflip.com/get_memes'
]
// url -> Promise
function fetchUrl (url) {
  // Use ES6 compatible Promise
  return new Q.Promise(function (resolve, reject, notify) {
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

fetchUrl(urls[0]).then(console.log, console.error)

// Q.all(urls.map(fetchUrl)).then(function (results) {
//  console.log(results)
// })

// fetchUrl(urls[0])
//  .then(JSON.parse)
//  .then(function (data) {return data.result})
//  .then(function (memes) {return memes.map(function (meme) {return meme.imageUrl})})
//  .then(function (imageUrls) {
//    return imageUrls.map(function (imageUrl) {
//      return downloadImage(imageUrl, newImageFileName())
//    })
//  })
//  .then(Q.all)
//  .then(console.log)

function downloadImage (uri, filename) {
  return new Q.Promise(function (resolve, reject, notify) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', function () {
      resolve(filename)
    }).on('error', reject)
  })
}

var counter = 0
function newImageFileName () {
  var time = new Date().getTime().toString()
  return './public/' + time + '-' + counter++ + '.jpg'
}

