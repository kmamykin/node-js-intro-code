function * fn () {
  console.log(yield 1)
  console.log(yield 2)
}

var gen = fn()
console.log(gen.next('one'))
console.log(gen.next('two'))


