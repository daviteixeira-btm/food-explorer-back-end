exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.text("dish_image"); // Caso você queira adicionar a imagem do prato
    table.float("price").notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('dishes');