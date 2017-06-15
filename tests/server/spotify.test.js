import test from 'ava'
import nock from 'nock'

var spotify = require('../../server/lib/spotify')

test.skip('getTopTracks gets tracks', (t) => {
  const tracksArray = [
    { id: "4hTXeWayUVMwoz6v1CviSN", name: "Copacabana" },
    { id: "3iaj0MtII6VPVhwQa4eeX3", name: "Qué Bien" }
  ]
  let scope = nock('https://api.spotify.com')
    .get('/v1/artists/2hazSY4Ef3aB9ATXW7F5w3/top-tracks?country=NZ')
    .reply(200, tracksArray)

  spotify.getTopTracks('2hazSY4Ef3aB9ATXW7F5w3', 'NZ', (actual) => {
    console.log(actual);
    scope.done()
    nock.cleanAll()
    t.end()

  })
})
