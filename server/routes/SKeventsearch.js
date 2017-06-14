var express = require('express')
var request = require('superagent')

const router = express.Router()

router.get('/:locationid', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/metro_areas/${req.params.locationid}/calendar.json?apikey=${process.env.SONGKICK_API}`)
  .end((err,result) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      console.log(result.body);
      res.json(result.body.resultsPage.results)
    }
  })
})

module.exports = router
