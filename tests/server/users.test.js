import test from 'ava'

const configureDatabase = require('./helpers/database-config')
configureDatabase(test)

const users = require('../../server/lib/users')

test('create creates a user', t => {
  const user = {id: 'asdasd', userName: 'Bob'}
  return users.create(user, t.context.connection)
    .then((result) => {
      return new Promise((resolve, reject) => {
        t.is(result[0], 2)
        resolve()
      })
    })
})

test('exists', t => {
  return users.exists('test_user', t.context.connection)
    .then((result) => {
      return new Promise((resolve, reject) => {
        t.is(result, true)
        resolve()
      })
    })
})

test('does not exist', t => {
  return users.exists('test_user2', t.context.connection)
    .then((result) => {
      return new Promise((resolve, reject) => {
        t.is(result, false)
        resolve()
      })
    })
})
