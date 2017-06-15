var express = require('express')
var router = express.Router()
var passport = require('passport')


router.get('/', (req, res) => {

})

router.get('/auth',
  passport.authenticate(
    'spotify',
    {scope: ['user-read-email', 'user-read-private']}
  ),
  function(req, res){
   // The request will be redirected to spotify for authentication, so this
   // function will not be called.
});

router.get('/auth/callback',
  passport.authenticate('spotify', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.

    res.send('success');
  });

module.exports = router
