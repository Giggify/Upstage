var express = require('express')
var request = require('superagent')

const router = express.Router()
const spotify = require('../lib/spotify')

require('dotenv').config()

router.get('/:artistId/toptracks', (req, res) => {
  spotify.getTopTracks(req.params.artistId, 'NZ') // Hardcoded NZ for now. Can fix
    .then (function (tracks) {
      res.json(tracks)
    })
    .catch(function (err) {
      res.status(500).send(`Error: ${err}`)
    })
})

router.get('/:artistId', (req, res) => {
  spotify.getArtist(req.params.artistId)
    .then((artist) => {
      res.json(artist)
    })
    .catch(function (err) {
      res.status(500).send(`Error: ${err}`)
    })
})

router.get('/search/:searchStr', (req, res) => {
  spotify.searchForArtist(req.params.searchStr)
    .then(function(data) {
      res.json(data)
    })
    .catch(function (err) {
      res.status(500).send(`Error: ${err}`)
    })
})

module.exports = router
