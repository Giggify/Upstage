import request from 'superagent'

export function createPlayist(artists) {

}

export function getArtistId(artistName) {
  request
    .get(`/api/v1/spotify/search/${artistName}`)
    .end((err, res) => {
      return res.body[0].id
    })
}

export function getArtistTopTracks(artistId) {
  request
    .get(`/api/v1/spotify/artists/${artistId}/toptracks`)
    .end((err, res) => {
      return res.body
    })
}

export function createTracklistArray(artistNamesArray) {
  let tracksArray = []
    artistNamesArray.map((artistName) => {
      return getArtistId(artistName)
      })
      .then((artistID) => {
        console.log(artistID)
      })
      return tracksArray

  }
