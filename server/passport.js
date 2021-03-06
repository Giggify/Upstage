require('dotenv').load()
var passport = require('passport')
var SpotifyStrategy = require('passport-spotify').Strategy;
var users = require('./lib/users')

module.exports = function(app) {
  var connection = app.get("connection")
  app.use(require('cookie-parser')());
  app.use(passport.initialize())

  passport.use(new SpotifyStrategy({
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK,
    },

    function(accessToken, refreshToken, profile, done) {
           users.getById(profile.id, connection) //find or create
           .then(function(user){
                if (user) {
                    users.updateUserTokens(profile.id, accessToken, refreshToken, connection)
                        .then(function(res) {
                            user.accessToken = accessToken
                            user.refreshToken = refreshToken
                            return done(null, user)
                        })
                } else {
                    let newUser = {id: profile.id, username: profile.displayName, email: profile._json.email, image: profile.photos[0], accessToken, refreshToken}
                    users.create(newUser, connection)
                    .then(function(res){
                        return done(null, newUser);

                    })
                    .catch(function (err) {
                        return done(null, false, {
                          message: 'Create User Error'
                        });
                    })
                }
            })

    })) //passport.use

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    users.getById(id, connection)
      .then(function(user) {
        done(null, user)
      })
      .catch(done)

  })

  return passport
}
