var SpotifyWebApi = require('spotify-web-api-node');

module.exports = {
  setConnection,
  getConnection,
  filterTracks,
  filterArtists
}

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})


function setConnection() {
  return spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      spotifyApi.setAccessToken(data.body['access_token'])
    })
}

function getConnection() {
  return spotifyApi.getAccessToken()
}

function filterTracks(tracks) {
  return tracks.map((track) => {
    return {id: track.id}
  })
}

function filterArtists(artists, searchStr) {
  return artists.filter((artist) => {
    if (artist.name.toLowerCase() == searchStr.toLowerCase()) {
      return artist
    }
  })
}
