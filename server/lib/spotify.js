var SpotifyWebApi = require('spotify-web-api-node')

module.exports = {
  filterTracks,
  filterArtists,
  getToken
}

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})

function getToken() {
  return spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    return data.body['access_token']
  })
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

function getArtistId(artistName) {
 return new Promise(function(resolve, reject) {
   request
   .get(`/api/v1/spotify/search/${artistName}`)
   .end((err, res) => {
       if(res) {
           console.log(res)
           resolve()
       } else {
           reject()
       }
   })
 })
}
