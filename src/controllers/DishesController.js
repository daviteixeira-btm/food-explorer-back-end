const knex = require("../database/knex");

class DishesController {
    async create(request, response){
        const { 
            title, 
            description, 
            price, 
            ingredients, 
            categories,
            user_id  // Pegando user_id do corpo da requisição
        } = request.body;

        // Validar se user_id está presente
        if (!user_id) {
            return response.status(400).json({ message: "user_id is required" });
        }

        // Inserir o prato na tabela "dishes"
        const [dish_id] = await knex("dishes").insert({
            title,
            description,
            price,
            user_id  // Certificando-se que user_id está sendo passado corretamente
        });

        // Inserir categorias, se não existirem, e associar ao prato
        for (const category_name of categories) {
            let [category] = await knex("categories").select("id").where({ category_name });
            
            if (!category) {
                [category] = await knex("categories").insert({ category_name }).returning("id");
            }
            
            await knex("dish_categories").insert({
                dish_id,
                category_id: category.id
            });
        }

        // Inserir ingredientes, se não existirem, e associar ao prato
        for (const ingredient_name of ingredients) {
            let [ingredient] = await knex("ingredients").select("id").where({ ingredient_name });
            
            if (!ingredient) {
                [ingredient] = await knex("ingredients").insert({ ingredient_name }).returning("id");
            }
            
            await knex("dish_ingredients").insert({
                dish_id,
                ingredient_id: ingredient.id
            });
        }

        response.json({ id: dish_id });
    }
}

module.exports = DishesController;