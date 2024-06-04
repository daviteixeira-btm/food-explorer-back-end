exports.up = knex => knex.schema.createTable("categories", table => {
    table.increments("id");
    table.text("category_name");
    table.integer("dish_id").references("id").inTable("dishes");
});

exports.down = knex => knex.schema.dropTable("categories");
