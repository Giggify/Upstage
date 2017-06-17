import request from 'superagent'

export function createPlayist(artists) {

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

export function getArtistTopTracks(artistId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistId}/toptracks`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body)
      })
  })
}

export function getArtwork(artistId) {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/v1/spotify/artists/${artistId}`)
      .end((err, res) => {
        err ? reject(err) : resolve(res.body.images[1].url)
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
