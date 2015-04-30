var m = require('./exampleModule')

console.log(m.doSync())

m.doAsync(function (err, result) {
  if (err) return console.error(err)
  console.log(result)
})
