const path = require('path')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')

<<<<<<< HEAD
const auth = require('./lib/auth')
const api = require('./routes/index')
const usersDb = './db/users'

const app = express()
=======
var songkickeventsearch = require('./routes/SKeventsearch')
var usersDb = './db/users'

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true
}


var app = express()
app.use(cors(corsOptions))
>>>>>>> develop

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(passport.initialize())


<<<<<<< HEAD
app.use('/api/v1', api)
passport.use(new LocalStrategy(auth.verify))
=======
app.use('/api/v1/eventsearch', songkickeventsearch)
>>>>>>> develop

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
