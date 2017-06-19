import test from 'ava'
import request from 'supertest'
import nock from 'nock'

require('dotenv').config()

const app = require('../../server/server')
const isTest = true
const spotify = require('../../server/lib/spotify')

spotify.setConnection(isTest)

test.skip('faking passing test', t=>{
  t.pass()
})

test('check top tracks route', t => {
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
   .get('/api/v1/spotify/artists/2hazSY4Ef3aB9ATXW7F5w3/toptracks')
   .expect(200)
   .then((res) => {
     console.log(res.body);
     scope.done()
     t.is(res.body.length, 2)
     t.end()
   })
})

//
// test.skip('check artist id route', t => {
//  const artistObj = {
//    name: 'Izal',
//    type: 'artist'
//  }
//
//  let scope = nock('https://api.spotify.com')
//    .get('/v1/artists/2hazSY4Ef3aB9ATXW7F5w3')
//    .reply(200, artistObj)
//
//  request(app)
//    .get('/api/v1/spotify/2hazSY4Ef3aB9ATXW7F5w3')
//    .expect(200)
//    .then((res) => {
//      scope.done()
//      t.is(res.body.name, 'Izal')
//      t.is(res.body.type, 'artist')
//      t.end()
//    })
//
// })
//
// test.skip('check search route', t => {
//  let artistObj = {
//    artists: {
//      items: [
//        {
//          name: 'Oasis',
//          type: 'artist',
//          id: '2DaxqgrOhkeH0fpeiQq2f4'
//        },
//        {
//          name: 'Oasisteststst',
//          type: 'artist',
//          id: '2DaxqgrOhkead9ceiQq2f4'
//        },
//
//      ]
//    }
//  }
//
//  let scope = nock('https://api.spotify.com')
//    .get('/v1/search?q=oasis&type=artist')
//    .reply(200, artistObj)
//
//  request(app)
//    .get('/api/v1/spotify/search/oasis')
//    .expect(200)
//    .then((res) => {
//      scope.done()
//      t.is(res.body[0].name, 'Oasis')
//      t.is(res.body[0].type, 'artist')
//      t.end()
//    })
// })
//
// test.skip('check get user route', t => {
//  const userObj = {
//    'display_name' : 'Alan Jordan',
//    'id' : 'eljordy_uk',
//    'images' : [
//      {
//       'url' : 'http://profile-images.scdn.co/artists/default/d4f208d4d49c6f3e1363765597d10c4277f5b74f'
//      }
//    ]
//  }
//
//  let scope = nock('https://api.spotify.com')
//    .get('/v1/users/eljordy_uk')
//    .reply(200, userObj)
//
//    request(app)
//      .get('/api/v1/spotify/users/eljordy_uk')
//      .expect(200)
//      .then((res) => {
//        scope.done()
//        t.is(res.body.display_name, 'Alan Jordan')
//        t.end()
//      })
// })
