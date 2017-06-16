var express = require('express')
var request = require('superagent')

const router = express.Router()

router.get('/city/:cityName', (req,res) => {
  request
  .get(`http://api.songkick.com/api/3.0/search/locations.json?query=${req.params.cityName}&apikey=${process.env.SONGKICK_API}`)
  .end((err,result) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      let citiesArray=result.body.resultsPage.results.location
      let city=[]
      if (citiesArray){
        city=citiesArray.map((result)=>{
          return(
          result.metroArea.state ?
          {
            id:result.metroArea.id,
            name:result.metroArea.displayName,
            state:result.metroArea.state.displayName,
            country:result.metroArea.country.displayName
          } : {
            id:result.metroArea.id,
            name:result.metroArea.displayName,
            state:" ",
            country:result.metroArea.country.displayName
          }
        )})
      } else {
        let city=[]
      }
      res.json(city)
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
      res.json(result.body.resultsPage.results)
    }
  })
})

module.exports = router
