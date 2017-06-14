var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var usersDb = require('../../server/db/users')
