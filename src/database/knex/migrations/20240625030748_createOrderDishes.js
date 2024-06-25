exports.up = knex => knex.schema.createTable('order_dishes', table => {
    table.integer('order_id').unsigned().notNullable().references('id').inTable('orders').onDelete('CASCADE');
    table.integer('dish_id').unsigned().notNullable().references('id').inTable('dishes').onDelete('CASCADE');
    table.primary(['order_id', 'dish_id']);
});

exports.down = knex => knex.schema.dropTable('order_dishes');