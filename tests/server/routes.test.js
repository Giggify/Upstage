import test from 'ava'
import request from 'supertest'
import nock from 'nock'

require('dotenv').config()

var environment = process.env.NODE_ENV || 'development'
var dbConfig = require('../../knexfile')[environment]
var connection = require('knex')(dbConfig)

var createToken = require('../../server/lib/auth').createToken

var isTest = true

const server = require('../../server/server')
let app = server(connection, isTest)

test.cb('check top tracks route', t => {
 const tracksObj = {
   tracks: [
     { id: '4hTXeWayUVMwoz6v1CviSN', name: 'Copacabana' },
     { id: '3iaj0MtII6VPVhwQa4eeX3', name: 'Qué Bien' }
   ]
 }

 let scope = nock('https://api.spotify.com')
   .get('/v1/artists/2hazSY4Ef3aB9ATXW7F5w3/top-tracks?country=NZ')
   .reply(200, tracksObj)

 request(app)
   .get('/api/v1/spotify/artists/2hazSY4Ef3aB9ATXW7F5w3/toptracks')
   .expect(200)
   .then((res) => {
     scope.done()
     t.is(res.body.length, 2)
     t.is(res.body[1].id, '3iaj0MtII6VPVhwQa4eeX3')
     t.end()
   })
})


test.cb('check artist id route', t => {
 const artistObj = {
   name: 'Izal',
   type: 'artist'
 }

 let scope = nock('https://api.spotify.com')
   .get('/v1/artists/2hazSY4Ef3aB9ATXW7F5w3')
   .reply(200, artistObj)

 request(app)
   .get('/api/v1/spotify/artists/2hazSY4Ef3aB9ATXW7F5w3')
   .expect(200)
   .then((res) => {
     scope.done()
     t.is(res.body.name, 'Izal')
     t.is(res.body.type, 'artist')
     t.end()
   })

})

test.cb('check search route', t => {
 let artistObj = {
   artists: {
     items: [
       {
         name: 'Oasis',
         id: '2DaxqgrOhkeH0fpeiQq2f4'
       },
       {
         name: 'Oasisteststst',
         id: '2DaxqgrOhkead9ceiQq2f4'
       },

     ]
   }
 }

 let scope = nock('https://api.spotify.com')
   .get('/v1/search?q=oasis&type=artist&limit=1')
   .reply(200, artistObj)

 request(app)
   .get('/api/v1/spotify/search/oasis')
   .expect(200)
   .then((res) => {
     scope.done()
     t.is(res.body[0].name, 'Oasis')
     t.is(res.body[0].id, '2DaxqgrOhkeH0fpeiQq2f4')
     t.end()
   })
})

test.cb('check get user route', t => {
 const userObj = {
   'display_name' : 'Alan Jordan',
   'id' : 'eljordy_uk',
   'images' : [
     {
      'url' : 'http://profile-images.scdn.co/artists/default/d4f208d4d49c6f3e1363765597d10c4277f5b74f'
     }
   ]
 }

 let scope = nock('https://api.spotify.com')
   .get('/v1/users/eljordy_uk')
   .reply(200, userObj)

   request(app)
     .get('/api/v1/spotify/users/eljordy_uk')
     .expect(200)
     .then((res) => {
       scope.done()
       t.is(res.body.display_name, 'Alan Jordan')
       t.end()
     })
})

test.cb('check createPlaylist post route', t => {
let scope = nock('https://api.spotify.com')
  .post(`/v1/users/eljordy_uk/playlists`)
  .reply(201, {test: "73a"})
  let token = createToken({id: "eljordy_uk"}, app.get('JWT_SECRET'))
  request(app)
    .post('/api/v1/spotify/users/playlist')
    .set('Cookie', `token=${token}`)
    .then((result) => {
      scope.done()
      t.is(result.body.test, "73a")
      t.end()
    })
  })

  test.cb('check addTrack post route', t => {
  let scope = nock('https://api.spotify.com')
    .post(`/v1/users/eljordy_uk/playlists/73a/tracks`)
    .reply(201, {test: "haha"})
    let token = createToken({id: "eljordy_uk"}, app.get('JWT_SECRET'))
    request(app)
      .post('/api/v1/spotify/users/playlist/73a/tracks')
      .set('Cookie', `token=${token}`)
      .then((result) => {
        scope.done()
        t.is(result.text, "eljordy_uk")
        t.end()
      })
    })

  test.todo('/me gets user id and image')
