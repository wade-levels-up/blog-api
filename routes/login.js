const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.post("/", loginController.verifyLogin);

module.exports = { loginRouter };
