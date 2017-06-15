var express = require('express')
var request = require('superagent')
var SpotifyWebApi = require('spotify-web-api-node');

const router = express.Router()
const spotify = require('../lib/spotify')

require('dotenv').config()

const url = 'https://api.spotify.com'

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    token = data.body['access_token']
    router.get('/test', (req, res) => {
      request
        .get(`${url}/v1/albums/0sNOF9WDwhWunNAHPD3Baj`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .end((error, response) => {
          error ? res.send(error) : res.json(response.body)
        })
    })
  })





router.get('/test', (req, res) => {
  request
    .get(`${url}/v1/albums/0sNOF9WDwhWunNAHPD3Baj`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(response.body)
    })
})



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
