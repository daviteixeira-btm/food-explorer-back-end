exports.up = knex => knex.schema.createTable('dish_ingredients', table => {
    table.integer('dish_id').unsigned().notNullable().references('id').inTable('dishes').onDelete('CASCADE');
    table.integer('ingredient_id').unsigned().notNullable().references('id').inTable('ingredients').onDelete('CASCADE');
    table.primary(['dish_id', 'ingredient_id']);
});

exports.down = knex => knex.schema.dropTable('dish_ingredients');
