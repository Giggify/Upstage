module.exports = {
  setConnection,
  getConnection
}

function setConnection() {

}
function getConnection() {

}




spotifyAccessToken() {
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
       spotifyApi.setAccessToken(data.body['access_token'])
  })
  spotifyApi.getAccessToken()
}
