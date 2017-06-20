const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  create,
  exists,
  getById,
  getByName,
  updateUserTokens
}

function create (user, testDb) { // insert spotify_id, username, image, access/refresh tokens here
  const connection = testDb || knex
  return connection('users')
    .insert(user)
}

function exists (id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('id', id)
    .then(count => {
      return count[0].n > 0
    })
}

function getById (id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .where('id', id)
    .first()
}

function updateUserTokens (id, accessToken, refreshToken, testDb) {
    const connection = testDb || knex
    return connection('users')
        .where('id', id)
        .update({accessToken, refreshToken})
}

function getByName (username, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select()
    .where('username', username)
}
