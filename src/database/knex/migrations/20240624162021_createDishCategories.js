exports.up = knex => knex.schema.createTable('dish_categories', table => {
    table.integer('dish_id').unsigned().notNullable().references('id').inTable('dishes').onDelete('CASCADE');
    table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
    table.primary(['dish_id', 'category_id']);
});

exports.down = knex => knex.schema.dropTable('dish_categories');
