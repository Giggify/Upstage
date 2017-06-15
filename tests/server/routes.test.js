var test = require('ava')
import request from 'supertest'
import nock from 'nock'

var createServer = require('../../server/server')

// var configureDatabase = require('./helpers/database-config')
// configureDatabase(test, createServer)

test.skip('faking passing test', t=>{
  t.pass()
})


test.cb('check top tracks route', t => {
const tracksArray = [
      { id: "4hTXeWayUVMwoz6v1CviSN", name: "Copacabana" },
      { id: "3iaj0MtII6VPVhwQa4eeX3", name: "Qué Bien" }
    ]
    let scope = nock('http://localhost:80')
      .get('/api/v1/spotify/2hazSY4Ef3aB9ATXW7F5w3/toptracks')
      .reply(200, tracksArray)

      console.log(scope.body);


})


// return request(t.context.app)
// .expect(200)
//   .then((result) => {
//     return new Promise((resolve, reject) => {
//       t.is(true, true)
//       resolve()
//     })
//   })
