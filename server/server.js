var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')

var api = require('./routes/index')
var usersDb = './db/users'

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true
}

var app = express()
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api/v1', api)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
