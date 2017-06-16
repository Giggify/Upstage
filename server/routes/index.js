var express = require('express')
var router = express.Router()
var passport = require('passport')
const expressSession = require('express-session')
const verifyJwt = require('express-jwt')
var auth = require('../lib/auth')

const session = expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
})

router.get('/', (req, res) => {
})

router.get('/auth', session,
  passport.authenticate(
    'spotify',
    {scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private',
     'user-top-read', 'playlist-read-private'], showDialog: true}
  ));

router.get('/auth/callback', session, auth.issueJwt)

router.get('/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.json({ message: 'User logged out.' })
})


module.exports = router
