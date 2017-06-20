
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 'test_user',
          userName: 'test user',
          email: 'test@test.com',
          image: 'test.jpg',
          accessToken: '123',
          refreshToken: '1234'
        }
      ])
    })
}
