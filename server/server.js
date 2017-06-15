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
const spotify = require('./routes/spotify')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(passport.initialize())
passport.use(new LocalStrategy(auth.verify))

//api routes here
app.use('/api/v1/events', skEventSearch)
app.use('/api/v1/metros', skGetAreaID)
app.use('/api/v1/spotify', spotify)

module.exports = app
