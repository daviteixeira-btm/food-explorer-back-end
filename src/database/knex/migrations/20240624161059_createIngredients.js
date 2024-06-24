exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments('id');
    table.string('ingredient_name').notNullable();
});

exports.down = knex => knex.schema.dropTable('ingredients');