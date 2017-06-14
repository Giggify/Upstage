const getUsers = (db) => {
  return db('users')
    .select('*')
}

module.exports = {
  getUsers
}
