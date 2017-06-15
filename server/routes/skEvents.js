var express = require('express')
var request = require('superagent')

const router = express.Router()

router.get('/:locationID', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/metro_areas/${req.params.locationID}/calendar.json?apikey=${process.env.SONGKICK_API}`)
  .end((err,result) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      console.log({result: result.body.resultsPage.results});
      let searchResults = result.body.resultsPage.results.event
      console.log({searchResults});
      let events = searchResults.map((result)=> {
          return (
            {
              gig: result.displayName || "NA",
              city: result.location.city || "NA",
              lat: result.location.lat || "NA",
              long: result.location.lng || "NA",
              artists: result.performance.map(performer => performer.artist.displayName) || "NA",
              date: result.start.date,
              time: result.start.time
              // if we only want headline artists then this becomes:
              // artists: result.performance[0].artist.displayName
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
