import request from 'superagent'

export function createPlayist(artists) {

}

export function getArtist(artistName) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/search/${artistName}`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body[0])
      })
  })
}

export function getArtistTopTracks(artistId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistId}/toptracks`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })
  })
}

export function getTracks(artistId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistId}/toptracks`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
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

export function createTracklistArray(artistNamesArray) {
  let tracks = []
  return new Promise((resolve, reject) => {
    artistNamesArray.map((artistName) => {
      getArtistId(artistName)
      .then((artistId) => {
        getArtistTopTracks(artistId)
        .then((trackIDs) => {
          tracks.push(trackIDs)
        })
      })
    })
    resolve(tracks)
  })
}

export function createPlaylist() {
  return new Promise((resolve, reject) => {
    request
      .post('/api/v1/spotify/users/playlist')
      .send({
        "name": "Test Upstage Playlist",
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
    console.log(tracks+" is tracks");
    request
      .post(`/api/v1/spotify/users/playlist/${playlist_id}/tracks`)
      .send(tracks)
      .end((err, res) => {
        err ? reject(err) : resolve("tracks added")
      })
  })
}
