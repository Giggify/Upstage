var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var skEventSearch = require('./routes/skEvents')
var skGetAreaID = require('./routes/skMetro')

const usersDb = './db/users'

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/v1/events', skEventSearch)
app.use('/api/v1/metros', skGetAreaID)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
