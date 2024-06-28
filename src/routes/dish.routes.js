const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

/*function usersMiddleware(request, response, next){
    console.log("Usuário passou pelo Middleware!");
    if(!request.body.isAdmin){
        return response.json({ message: "user unathorized..."})
    }
    next();
}*/

const dishesController = new DishesController();

//dishesRoutes.use(usersMiddleware);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;