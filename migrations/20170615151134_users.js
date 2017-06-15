
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table){
        table.string('id')
        table.string('username')
        table.string('email')
        table.string('image')
         })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
