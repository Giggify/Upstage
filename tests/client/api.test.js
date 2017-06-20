import test from 'ava'
import nock from 'nock'
import * as helperData from './helpers/apiSampleData'

import * as api from '../../client/api'

test.cb('getArtist returns artist object', t=>{
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/search/lorde')
    .reply(200,helperData.spotifyArtistSearch)
  api.getArtist('lorde')
    .then((res) => {
      scope.done()
      t.deepEqual(res, helperData.spotifyArtistSearch[0])
      t.end()
    })
})

test.cb('getArtistDetails gets an artist object' , t => {
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/artists/2hazSY4Ef3aB9ATXW7F5w3')
    .reply(200, helperData.getArtistDetails)

  api.getArtistDetails('2hazSY4Ef3aB9ATXW7F5w3')
    .then((res) => {
      scope.done()
      t.deepEqual(res, helperData.getArtistDetails)
      t.end()
    })
})

test.cb('getArtistId', t => {
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/search/lorde')
    .reply(200, helperData.spotifyArtistSearch)
  api.getArtistId('lorde')
    .then((res) => {
      scope.done()
      t.deepEqual(res, helperData.spotifyArtistSearch[0].id)
      t.end()
    })
})

test.cb('getTopTracks', t => {
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/artists/')
})
