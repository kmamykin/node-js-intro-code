var Promise = require('q').Promise
var fetchUrl = require('./fetchUrl') // returns Promise
var downloadImage = require('./downloadImage') // returns Promise
var memes = require('./memes')

//fetchUrl(memes.urls[0]).then(console.log, console.error) // chainable

//Promise.all(memes.urls.map(fetchUrl)).then(function (results) {
//  console.log(results)
//}, console.error)

fetchUrl(memes.urls[0]) // Promise<String>
  .then(JSON.parse)     // Promise<Object>
  .then(memes.extractImageUrls) // Promise<[String]>
  .then(memes.mapToFilenames) // Promise<[[String, String]]>
  .then(downloadImages) // [Promise<image>]
  .then(Promise.all)    // Promise<[image]>
  .then(console.log, console.error)

//var Q = require('q')
//var readFile = Q.denodeify(fs.readFile)
//readFile('promises.js').then(function (buffer) {
//  console.log(buffer.toString())
//})

function downloadImages (imageUrlsWithFilenames) {
  return imageUrlsWithFilenames.map(function (urlAndFilename) {
    return downloadImage(urlAndFilename[0], urlAndFilename[1])
  })
}

