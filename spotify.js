// Set necessary parts of the credentials on the constructor

require('dotenv').config()

var SpotifyWebApi = require('spotify-web-api-node');
//
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
  }, function(err) {
    console.error(err);
  });
  }, function(err) {
    console.log('Something went wrong!', err);
  });
