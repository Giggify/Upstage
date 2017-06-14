var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var api = require('./routes/index')
var usersDb = './db/users'


var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/v1', api)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
