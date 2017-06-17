import request from 'superagent'

export function createPlayist(artists) {

}

export function getArtistIds(artistNameArr) {
  artistNameArr.map((artist) => {
    request
      .get(`/api/v1/spotify/search/${artist}`)
      .end((err, res) => {
        console.log(res)
      })
  })
}
