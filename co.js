var co = require('co')

co(function * () {
  var result = yield Promise.resolve(true)
  // var result = yield Promise.reject(new Error('What?'))
  return result
}).then(console.log, function (err) { console.error(err.stack) })
