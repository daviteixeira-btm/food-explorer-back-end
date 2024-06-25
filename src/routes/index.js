const { Router } = require("express");

const usersRoutes = require("./user.routes");
const dishesRoutes = require("./dish.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);

module.exports = routes;