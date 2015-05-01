function * foo (x) {
  var y = 2 * (yield (x + 1))
  var z = yield (y / 3)
  return (x + y + z)
}

/*
function * foo (x) {
  var i1 = (x + 1)    // 1st iteration next()
  var in2 = yield i1  // 2st iteration next(12)
  var y = 2 * (in2)   // 2st iteration next(12)
  var i2 = (y / 3)    // 2st iteration next(12)
  var z = yield i2    // 3st iteration next(13)
  return (x + y + z)  // 3st iteration next(13)
}
*/

var it = foo(5)

// note: not sending anything into `next()` here
console.log(it.next())     // { value:6, done:false }
console.log(it.next(12))   // { value:8, done:false }
console.log(it.next(13))   // { value:42, done:true }
