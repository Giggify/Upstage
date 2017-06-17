
const jwt = require('jsonwebtoken')
const passport = require('passport')

const users = require('./users')

function createToken (user, secret) { // insert access/refresh token from spotify
  return jwt.sign({
    id: user.id,
    username: user.username,
    image: user.image,
    accessToken : user.accessToken,
    refreshToken : user.refreshToken
  }, secret, {
    expiresIn: 60 * 60 * 24
  })
}

function getToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.token) {
    return req.cookies.token
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

function handleError (err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Access to this resource was denied.',
      error: err.message
    })
  }
  next()
}

function issueJwt (req, res, next) {
  passport.authenticate('spotify',
      (err, user, info) => {
        if (err) {
          return res.status(500).json({
            message: 'Authentication failed due to a server error.',
            info: err.message
          })
        }

        if (!user) {
          return res.json({
            message: 'Authentication failed.',
            info: info.message
          })
        }
        const token = createToken(users, req.app.get('JWT_SECRET'))
        // Ideally use `secure: true` in production
        res.cookie('token', token, { httpOnly: true })
        res.redirect('/')
      })(req, res, next)
}

function verify (username, done) {
  users.getByName(username)
    .then(users => {
      if (users.length === 0) {
        return done(null, false, { message: 'Unrecognised user.' })
      }

      done(null, user)
    })
  .catch(err => {
    done(err, false, { message: "Couldn't check your credentials with the database." })
  })
}

module.exports = {
  handleError,
  issueJwt,
  verify,
  getToken
}
