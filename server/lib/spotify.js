var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config()

module.exports = {
  getTopTracks,
  getArtist,
  searchForArtist
}

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token'])
  }, function(err) {
    console.log('Something went wrong!', err)
  })

function getTopTracks(artistId, locationCode) {
  return spotifyApi.getArtistTopTracks(artistId, locationCode)
    .then(function(result) {
      return filterTracks(result.body.tracks)
    }, function(err) {
      return err
  })
}

function getArtist(artistId) {
  return spotifyApi.getArtist(artistId)
    .then(function(result) {
      return result.body
    }, function(err) {
      return err
  })
}

function searchForArtist(searchStr) {
  return spotifyApi.searchArtists(searchStr)
    .then(function(result) {
      return result.body
    }, function(err) {
      return err
  })
}

function filterTracks(tracks) {
  return tracks.map((track) => {
    return {id: track.id, name: track.name}
  })
}

function filterArtists(artists) {
  return artists.map((artist) => {
    console.log(artist);
  })
}
