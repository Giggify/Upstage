var test = require('ava')
var request = require('supertest')
var nock = require('nock')
var createToken = require('../../server/lib/auth').createToken
require('dotenv').config()//
var app = require('../../server/server')

test.cb('API route /city/cityName returns a location ID json', (t) => {
  const data = {
    resultsPage: {
      results: {
        location: [
          {
            metroArea: {
              id: "id",
              displayName: "nahm",
              state: {
                displayName: "state"
              },
              country: {
                displayName: "country"
              }
            }
          }
        ]
      }
    }
  }
    var token = createToken({}, app.get('JWT_SECRET'))
    var scope = nock('http://api.songkick.com')
          .get(`/api/3.0/search/locations.json?query=wellington&apikey=${process.env.SONGKICK_API}`)
          .reply(200, data)
    request(app)
    .get('/api/v1/metros/city/wellington')
    .set('Cookie', `token=${token}`)
    .expect(200)
    .then((res) => {
      t.is(res.body[0].hasOwnProperty('id'), true)
      t.end()
    })
})
