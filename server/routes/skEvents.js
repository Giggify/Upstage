var express = require('express')
var request = require('superagent')
const verifyJwt = require('express-jwt')
const auth = require('../lib/auth')
const router = express.Router()

//Protect all routes beneath this point
router.use(
  verifyJwt({
    getToken: auth.getToken,
    secret: auth.getSecret
  }),
  auth.handleError
)

// These routes are protected
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
        return event.artists[0] //events.map((event) => getArtistId(event.artists[0]))
      })
      res.json({events,artists})
    }
  })
})

module.exports = router
