var express = require('express')
var request = require('superagent')
var SpotifyWebApi = require('spotify-web-api-node');

const router = express.Router()
const spotify = require('../lib/spotify')

require('dotenv').config()

function filterTracks(tracks) {
  return tracks.map((track) => {
    return {id: track.id, name: track.name}
  })
}

function filterArtists(artists, searchStr) {
  return artists.filter((artist) => {
    if (artist.name.toLowerCase() == searchStr.toLowerCase()) {
      return artist
    }
  })
}

const url = 'https://api.spotify.com'

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})

router.get('/:artistId/toptracks', (req, res) => {
  request
    .get(`${url}/v1/artists/${req.params.artistId}/top-tracks?country=NZ`)
    .set('Authorization', `Bearer ${req.app.get('accessTokenFunction')()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(filterTracks(response.body.tracks))
    })
})

router.get('/:artistId', (req, res) => {
  request
    .get(`${url}/v1/artists/${req.params.artistId}`)
    .set('Authorization', `Bearer ${spotifyApi.getAccessToken()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(response.body)
    })
})

router.get('/search/:searchStr', (req, res) => {
  request
    .get(`${url}/v1/search?q=${req.params.searchStr}&type=artist`)
    .set('Authorization', `Bearer ${spotifyApi.getAccessToken()}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      error ? res.send(error) : res.json(filterArtists(response.body.artists.items, req.params.searchStr))
    })
})

module.exports = router
