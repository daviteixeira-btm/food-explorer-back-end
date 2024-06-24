exports.up = knex => knex.schema.createTable('categories', table => {
    table.increments('id');
    table.string('category_name').notNullable();
});

exports.down = knex => knex.schema.dropTable('categories');