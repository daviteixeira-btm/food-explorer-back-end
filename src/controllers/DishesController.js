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

    async show(request, response){
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();

        const dish_ingredients = await knex("dish_ingredients")
            .where({ dish_id: id })
            .join("ingredients", "dish_ingredients.ingredient_id", "ingredients.id")
            .select("ingredients.ingredient_name");
        
        const dish_categories = await knex("dish_categories")
            .where({ dish_id: id })
            .join("categories", "dish_categories.category_id", "categories.id")
            .select("categories.category_name");

        return response.json({
            ...dish,
            ingredients: dish_ingredients.map(ingredient => ingredient.ingredient_name),
            categories: dish_categories.map(category => category.category_name)
        });
    }

    async delete(request, response){
        const { id } = request.params;
        
        await knex("dish_ingredients").where({ dish_id: id }).delete();
        
        await knex("dish_categories").where({ dish_id: id }).delete();
        
        await knex("dishes").where({ id }).delete();
        
        return response.json({ message: "Prato deletado com sucesso" });
    }

    async index(request, response) {
        const { title, user_id, ingredients } = request.query;
    
        let dishesQuery = knex("dishes").orderBy("title");
    
        if (user_id) {
            dishesQuery = dishesQuery.where({ user_id });
        }
    
        if (title) {
            dishesQuery = dishesQuery.whereLike("title", `%${title}%`);
        }
    
        if (ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
    
            dishesQuery = dishesQuery
                .join("dish_ingredients", "dishes.id", "=", "dish_ingredients.dish_id")
                .join("ingredients", "dish_ingredients.ingredient_id", "=", "ingredients.id")
                .whereIn("ingredients.ingredient_name", filterIngredients)
                .groupBy("dishes.id");
        }
    
        const dishes = await dishesQuery.select("dishes.*");
    
        const dishesWithDetails = await Promise.all(dishes.map(async (dish) => {
            const dishIngredients = await knex("ingredients")
                .join("dish_ingredients", "ingredients.id", "=", "dish_ingredients.ingredient_id")
                .where("dish_ingredients.dish_id", dish.id)
                .select("ingredients.ingredient_name");
    
            const dishCategories = await knex("categories")
                .join("dish_categories", "categories.id", "=", "dish_categories.category_id")
                .where("dish_categories.dish_id", dish.id)
                .select("categories.category_name");
    
            return {
                ...dish,
                ingredients: dishIngredients.map(ingredient => ingredient.ingredient_name),
                categories: dishCategories.map(category => category.category_name)
            };
        }));
    
        return response.json(dishesWithDetails);
    }
}

module.exports = DishesController;