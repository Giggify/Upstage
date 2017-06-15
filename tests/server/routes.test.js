 var test = require('ava')
import request from 'supertest'
import nock from 'nock'

var app = require('../../server/server')

test.cb('check top tracks route', t => {
  const tracksObj = {
    tracks: [
      { id: "4hTXeWayUVMwoz6v1CviSN", name: "Copacabana" },
      { id: "3iaj0MtII6VPVhwQa4eeX3", name: "Qué Bien" }
    ]
  }

  let scope = nock('https://api.spotify.com')
    .get('/v1/artists/2hazSY4Ef3aB9ATXW7F5w3/top-tracks?country=NZ')
    .reply(200, tracksObj)

  request(app)
    .get('/api/v1/spotify/2hazSY4Ef3aB9ATXW7F5w3/toptracks')
    .expect(200)
    .then((res) => {
      scope.done()
      t.is(res.body.length, 2)
      t.end()
    })
})
