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

function getConnection(isTest) {
  return isTest ? 'iAm4pr3t3ndt0k3N' : spotifyApi.getAccessToken()
}

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


// spotifyAccessToken() {
//   spotifyApi.clientCredentialsGrant()
//     .then(function(data) {
//        spotifyApi.setAccessToken(data.body['access_token'])
//   })
//   spotifyApi.getAccessToken()
// }
