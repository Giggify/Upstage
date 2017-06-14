var createServer = require('./server')

var environment = process.env.NODE_ENV || 'development'
var dbConfig = require('../knexfile')[environment]
var connection = require('knex')(dbConfig)

var server = createServer(connection)

var PORT = process.env.PORT || 3000
server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
