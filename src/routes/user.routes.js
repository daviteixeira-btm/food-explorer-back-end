const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();


function usersMiddleware(request, response, next){
    console.log("Usuário passou pelo Middleware!");
    if(!request.body.isAdmin){
        return response.json({ message: "user unathorized..."})
    }
    next();
}

const usersController = new UsersController();

usersRoutes.use(usersMiddleware);

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;