var express = require('express')

var app = express()

app.set('views', './views')
app.set('view engine', 'jade')

app.use(express.static('public'))

// app.get('/', function (req, res) {
//  res.send('Hello World!')
// })

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

var request = require('request')
app.get('/memes', function (req, res) {
  var query = req.query.q || 'javascript'
  request('http://version1.api.memegenerator.net/Generators_Search?q=' + query + '&pageIndex=0&pageSize=12', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('memes', JSON.parse(body))
    } else {
      res.send(error)
    }
  })
})

// try https://api.imgflip.com/get_memes

var server = app.listen(process.env.PORT || 8888, function () {
  var address = server.address()
  console.log('Example app listening at http://%s:%s', address.address, address.port)
})
