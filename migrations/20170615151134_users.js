
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table){
        table.string('id').notNullable().primary()
        table.string('username')
        table.string('email')
        table.string('image')
        table.text('accessToken')
        table.text('refreshToken')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
