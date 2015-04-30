var async = require('async')
var request = require('request')

var urls = [
  'http://version1.api.memegenerator.net/Generators_Search?q=clinton&pageIndex=0&pageSize=12',
  'https://api.imgflip.com/get_memes'
]

async.map(urls, request, function (err, results) {
  if (err) return console.error(err)
  console.log(results.map(function (result) {return JSON.parse(result.body)}))
})
