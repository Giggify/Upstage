import test from 'ava'
import nock from 'nock'
import * as helperData from './helpers/apiSampleData'

import * as api from '../../client/api'

test.cb('getArtist returns artist object', t=>{
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/search/lorde')
    .reply(200,helperData.spotifyArtistSearch)
  api.getArtist('lorde')
    .then((res)=>{
      scope.done()
      t.deepEqual(res.body[0],helperData.spotifyArtistSearch)
      t.end()
    })
})

test.cb('getArtistTopTracks returns ')
