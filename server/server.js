const path = require('path')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser')
const auth = require('./lib/auth')
const api = require('./routes/index')
const usersDb = './db/users'

const skEventSearch = require('./routes/skEvents')
const skGetAreaID = require('./routes/skMetro')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(passport.initialize())
passport.use(new LocalStrategy(auth.verify))

//api routes here
app.use('/api/v1/events', skEventSearch)
app.use('/api/v1/metros', skGetAreaID)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
