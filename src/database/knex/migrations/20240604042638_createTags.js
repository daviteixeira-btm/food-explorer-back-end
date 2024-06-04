exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("tag_name");
    table.integer("user_id").references("id").inTable("users");
    table.integer("dish_id").references("id").inTable("dishes");
});

exports.down = knex => knex.schema.dropTable("tags");
