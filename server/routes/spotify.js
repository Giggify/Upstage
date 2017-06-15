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

module.exports = router


    // Runs a search on a str.
    //Need to filter and get an EXACT match in data.body.artists[i].name
    // And return ID
    // spotifyApi.searchArtists('Oasis')
    //   .then(function(data) {
    //     console.log('Search artists by "Oasis"', data.body.artists);
    //   }, function(err) {
    //     console.error(err);
    //   });

    // Returns multiple artits?
    // Do we need this?
      // Get multiple artists
  // spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  //   .then(function(data) {
  //     console.log('Artists information', data.body);
  //   }, function(err) {
  //     console.error(err);
  //   });

  // Returns top 10 tracks by an artist
