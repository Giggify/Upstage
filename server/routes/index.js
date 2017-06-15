var express = require('express')
var router = express.Router()
var passport = require('passport')
const expressSession = require('express-session')
var auth = require('../lib/auth')

const session = expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
})

router.get('/', (req, res) => {

})

router.get('/test', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies.token)
})
// router.get('/auth/twitter', session, passport.authenticate('twitter'))
// router.get('/auth/twitter/callback', session, auth.issueJwt)
router.get('/auth', session,
  passport.authenticate(
    'spotify',
    {scope: ['user-read-email', 'user-read-private']}
  ));

router.get('/auth/callback', session, auth.issueJwt)


module.exports = router
