var Promise = require('q').Promise

// TODO: add error handling

module.exports = function await (generatorFn) {
  var gen = generatorFn()
  return new Promise(function (resolve, reject) {
    function iterate (iterationValue) {
      var iteration = gen.next(iterationValue) // feed iterationValue into next iteration, get result of iteration .value is a promise
      if (iteration.done) {
        if (iteration.value) {
          toPromise(iteration.value).then(resolve, reject)
        } else {
          // generator function finished without a return value
          resolve()
        }
      } else {
        toPromise(iteration.value).then(function (nextIterationInput) {
          iterate(nextIterationInput)
        }, reject)
      }
    }

    function toPromise (iterationValue) {
      if (iterationValue.then) {
        // dealing with a promise
        return iterationValue
      } else if ((iterationValue instanceof Array) && (iterationValue.length) && (iterationValue[0].then)) {
        // dealing with an array of promises
        return Promise.all(iterationValue)
      } else {
        // dealing with a regular value/array/object
        return Promise.resolve(iterationValue)
      }
    }

    iterate() // no iterationValue to feed the generator
  })
}


