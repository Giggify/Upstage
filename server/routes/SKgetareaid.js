var express = require('express')
var request = require('superagent')

const router = express.Router()

router.get('/city/:citName', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/search/locations.json?query=${req.params.cityname}&apikey=${process.env.SONGKICK_API}`)
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

router.get('/latlong/:latLong', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/search/locations.json?location=geo:${req.params.latLong}&apikey=${process.env.SONGKICK_API}`)
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

router.get('/ip/:userIp', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/search/locations.json?location=ip:${req.params.userIp}&apikey=${process.env.SONGKICK_API}`)
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
