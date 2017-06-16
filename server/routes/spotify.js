var express = require('express')
var request = require('superagent')

const router = express.Router()
const spotify = require('../lib/spotify')

require('dotenv').config()

const url = 'https://api.spotify.com'

router.get('/:artistId/toptracks', (req, res) => {
  request
    .get(`${url}/v1/artists/${req.params.artistId}/top-tracks?country=NZ`)
    .set('Authorization', `Bearer ${spotify.getConnection()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(spotify.filterTracks(response.body.tracks))
    })
})

router.get('/:artistId', (req, res) => {
  request
    .get(`${url}/v1/artists/${req.params.artistId}`)
    .set('Authorization', `Bearer ${spotify.getConnection()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(response.body)
    })
})

router.get('/search/:searchStr', (req, res) => {
  request
    .get(`${url}/v1/search?q=${req.params.searchStr}&type=artist`)
    .set('Authorization', `Bearer ${spotify.getConnection()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(spotify.filterArtists(response.body.artists.items, req.params.searchStr))
    })
})

router.get('/users/:id', (req, res) => {
  request
    .get(`${url}/v1/users/${req.params.id}`)
    .set('Authorization', `Bearer ${spotify.getConnection()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.status(500).send(error) : res.json(response.body)
    })
})

module.exports = router
