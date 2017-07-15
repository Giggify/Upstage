var test = require('ava')
var request = require('supertest')
var nock = require('nock')
require('dotenv').config()

var environment = process.env.NODE_ENV || 'development'
var dbConfig = require('../../knexfile')[environment]
var connection = require('knex')(dbConfig)

var isTest = true
var createToken = require('../../server/lib/auth').createToken

const server = require('../../server/server')
let app = server(connection, isTest)

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
      scope.done()
      t.true(res.body.hasOwnProperty('events'))
      t.true(res.body.hasOwnProperty('artists'))
      t.end()
      })
})

test.cb('API route /events/locationID redirects to auth when user is not logged in', (t) => {
  request(app)
  .get('/api/v1/events/31455')
  .expect(302)
  .then((res) => {
    t.end()
  })
})
