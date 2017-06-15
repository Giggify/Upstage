
exports.up = function(knex, Promise) {
    return knex.schema.createTable('playlist', function (table){
        table.string('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.string('users_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlist')
};
