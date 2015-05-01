var Promise = require('q').Promise
var request = require('request')

// url -> Promise<body>
module.exports = function fetchUrl (url) {
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
