import request from 'superagent'

export function getArtist(artistName) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/search/${artistName}`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body[0])
      })
  })
}

export function getArtistDetails(artistID) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistID}`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })
  })
}

export function getArtistId(artistName) {
  return new Promise((resolve, reject) => {
    request
    .get(`/api/v1/spotify/search/${artistName}`)
    .end((err, res) => {
      err ? reject(err) : resolve(res.body[0].id)
    })
  })
}

export function getTopTracks(artistId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistId}/toptracks`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })
  })
}

export function createPlaylist() {
  return new Promise((resolve, reject) => {
    request
      .post('/api/v1/spotify/users/playlist')
      .send({
        "name": "This Is An Upstage Playlist",
        "public": true,
        "collaborative": false,
        "description": "Top tracks from artists performing near you"
      })
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })
  })
}

export function addTrackToPlaylist(tracks, playlist_id) {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/v1/spotify/users/playlist/${playlist_id}/tracks`)
      .send(tracks)
      .end((err, res) => {
        err ? reject(err) : resolve(res.text)
      })
  })
}

export function getUserInfo(cookie) {
  return new Promise((resolve, reject) => {
    if (cookie.length > 0) {
      request
      .get('/api/v1/spotify/me')
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })}
    else {
      request
        .get('/api/v1/spotify/me')
        .end((err, res) => {
          err ? reject(err) : resolve("No cookies")
        })
    }
  })
}
