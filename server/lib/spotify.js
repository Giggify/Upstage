var SpotifyWebApi = require('spotify-web-api-node');
var request = require('superagent')

module.exports = {
  setConnection,
  getConnection,
  filterTracks,
  filterArtists,
  getArtistId
}

let isTest = false

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
})


function setConnection(testMode) {
  if(!testMode) {
    return spotifyApi.clientCredentialsGrant()
      .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token'])
    })
  } else {
    isTest = true
  }
}

function getConnection() {
  if(!isTest) {
    return spotifyApi.getAccessToken()
  } else {
    return 'pretendtoken'
  }
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
