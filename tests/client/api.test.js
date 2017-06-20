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
    .get('/api/v1/spotify/artists/2hazSY4Ef3aB9ATXW7F5w3/toptracks')
    .reply(200, helperData.topTracks)
  api.getTopTracks('2hazSY4Ef3aB9ATXW7F5w3')
    .then((res) => {
      scope.done()
      t.deepEqual(res[1].id, helperData.topTracks[1].id)
      t.is(res.length, 10)
      t.end()
    })
})

test.cb('createPlaylist', t => {
  const scope = nock('http://localhost:80')
    .post('/api/v1/spotify/users/playlist')
    .reply(201,{id:"playlistID"})
  api.createPlaylist()
    .then((data)=>{
      scope.done()
      t.is(data.id,"playlistID")
      t.end()
    })
})

test.cb('addTrackToPlaylist', t => {
  const scope = nock('http://localhost:80')
    .post(`/api/v1/spotify/users/playlist/73a/tracks`)
    .reply(201,{id:"test"})
  api.addTrackToPlaylist(["track1","track2"],"73a")
    .then((data)=>{
      scope.done()
      console.log(data);
      t.deepEqual(data, "{\"id\":\"test\"}")
      t.end()
    })
})

test.cb('getUserInfo with a fake cookie', t => {
  const scope = nock('http://localhost:80')
    .get('/api/v1/spotify/me')
    .reply(200, helperData.getUserInfo)
  api.getUserInfo(helperData.cookie)
    .then((res) => {
      scope.done()
      t.deepEqual(res, helperData.getUserInfo)
      t.end()
    })
})
