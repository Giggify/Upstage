var test = require('ava')
var request = require('supertest')
var nock = require('nock')
var createToken = require('../../server/lib/auth').createToken
require('dotenv').config()

var app = require('../../server/server')

test.cb('User without login is denied the access to this route', t => {
  request(app)
    .get('/api/v1/events/31455')
    .expect(403)
    .end((err, res) => {
      t.ifError(err)
      t.is(res.body.message, 'Access to this resource was denied.')
      t.end()
    })
})


test.cb('API route /events/locationID returns a json', (t) => {
  const data = {
    resultsPage: {
      results: {
        event: []
      }
    }
  }
  var token = createToken({}, app.get('JWT_SECRET'))
  var scope = nock('http://api.songkick.com')
          .get(`/api/3.0/metro_areas/31455/calendar.json?apikey=${process.env.SONGKICK_API}`)
          .reply(200, data)

    request(app)
    .get('/api/v1/events/31455')
    .set('Cookie', `token=${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
     // scope.done()
      t.true(res.body.hasOwnProperty('events'))
      t.true(res.body.hasOwnProperty('artists'))
      t.end()
   })
})
