import test from 'ava'
import supertest from 'supertest'
import nock from 'nock'

const spotify = require('../../server/lib/spotify')


test.skip('faking passing test', t=>{
  t.pass()
})

test.skip('getArtistId returns an ArtistID', function(t) {
    var expected = '08td7MxkoHQkXnWAYD8d6Q'
    return spotify.getArtistId('Tania Bowra')
        .then(function (result) {
            var actual = result
            t.is(actual, expected)
        })
})


//get a valid token





// test.cb('API route /events/locationID returns a json', (t) => {
//   const data = {
//     resultsPage: {
//       results: {
//         event: []
//       }
//     }
//   }
//     var scope = nock('http://api.spotify.com')
//           .post(`/v1/users/${req.params.id}/playlist`)
//           .reply(200, data)
//
//     request(app)
//     .get('/api/v1/events/31455')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .then((res) => {
//       scope.done()
//       t.true(res.body.hasOwnProperty('events'))
//       t.true(res.body.hasOwnProperty('artists'))
//       t.end()
//       })
//     })
