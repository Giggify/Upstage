var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var skEventSearch = require('./routes/SKeventsearch')
var skGetAreaID = require('./routes/SKgetareaid')

var usersDb = './db/users'

var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/v1/eventSearch', skEventSearch)
app.use('/api/v1/metros', skGetAreaID)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
