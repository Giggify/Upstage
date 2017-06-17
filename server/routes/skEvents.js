var express = require('express')
var request = require('superagent')
const verifyJwt = require('express-jwt')
const auth = require('../lib/auth')

const router = express.Router()

function getSecret (req, payload, done) {
  done(null, req.app.get('JWT_SECRET'))
}

router.get('/test', (req, res) => {
  res.send(req.user)
})

// This route will set the req.user object if it exists, but is still public
router.get('/open',
  verifyJwt({
    credentialsRequired: false,
    getToken: auth.getToken,
    secret: getSecret
  }),
  (req, res) => {
    const json = { message: 'This route is public.' }
    console.log(req.user)
    if (req.user) {
      json.user = `Your user ID is: ${req.user.id}`
    }
    res.json(json)
  }
)

// Protect all routes beneath this point
// router.use(
//   verifyJwt({
//     getToken: auth.getToken,
//     secret: getSecret
//   }),
//   auth.handleError
// )

// These routes are protected
router.get('/closed', (req, res) => {
  res.json({ message: `Yup, you seem to be user ${req.user.id}.` })
})

router.get('/createPlaylist/:name', (req, res) => {
  console.log(req.user.accessToken)
  res.send('hi')
})

router.get('/:locationID', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/metro_areas/${req.params.locationID}/calendar.json?apikey=${process.env.SONGKICK_API}`)
  .end((err,result) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      let searchResults = result.body.resultsPage.results.event || []
      let events = searchResults.map((result)=> {
          return (
            {
              gig: result.displayName || "NA",
              city: result.location.city || "NA",
              lat: result.location.lat || "NA",
              long: result.location.lng || "NA",
              artists: result.performance.map(performer => performer.artist.displayName) || "NA",
              // if we only want headline artists then this becomes:
              // artists: result.performance[0].artist.displayName
              date: result.start.date || "NA",
              time: result.start.time || "NA"
            }
          )
        })
      let artists = events.map((event)=> {
        return event.artists[0]
      })
      res.json({events,artists})
    }
  })
})

module.exports = router
