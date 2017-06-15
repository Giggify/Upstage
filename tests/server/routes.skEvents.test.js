var test = require('ava')
var request = require('supertest')
var nock = require('nock')
require('dotenv').config()

var app = require('../../../server/server')


test.cb('API route /events/locationID returns a json', (t) => {
    var scope = nock('http://localhost:3000')
          .get('/api/v1/events/31455')
          .reply(200, {name: "Hi, my name is"})
    request(app)
    .get(scope)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err,res) => {
      if(err) throw errs
      else(console.log(res.body))
      t.end()
      })
    })
