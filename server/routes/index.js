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

function getSecret (req, payload, done) {
  console.log("get Secret")
  done(null, req.app.get('JWT_SECRET'))
}

router.get('/', (req, res) => {
})

router.get('/test', (req, res) => {
    res.send(req.cookies.token)
})

router.get('/open',
  verifyJwt({
    credentialsRequired: false,
    getToken: auth.getToken,
    secret: getSecret
  }),
  (req, res) => {
    const json = { message: 'This route is public.' }
    if (req.user) {
      console.log(req.user)
      json.user = `Your user ID is: ${req.user.id}`
    }
    res.json(json)
  }
)
// router.get('/auth/twitter', session, passport.authenticate('twitter'))
// router.get('/auth/twitter/callback', session, auth.issueJwt)
router.get('/auth', session,
  passport.authenticate(
    'spotify',
    {scope: ['user-read-email', 'user-read-private'], showDialog: true}
  ));

router.get('/auth/callback', session, auth.issueJwt)

router.get('/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.json({ message: 'User logged out.' })
})


module.exports = router
