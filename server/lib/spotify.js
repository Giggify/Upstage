var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config()

module.exports = {
  getTopTracks
}

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

function getTopTracks(artistId, locationCode) {
  return spotifyApi.getArtistTopTracks(artistId, locationCode).then(function(result) {
    return filterTracks(result.body.tracks)
  }, function(err) {
    return err
  })
}

function filterTracks(tracks) {
  return tracks.map((track) => {
    return {id: track.id, name: track.name}
  })
}
