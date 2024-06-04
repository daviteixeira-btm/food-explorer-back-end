exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("dish_image");
    table.integer("user_id").references("id").inTable("users");
    table.integer("category_id").references("id").inTable("categories");
    table.decimal("price", 10, 2);
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
