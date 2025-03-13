const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");

signUpRouter.post("/", signUpController.signUp);

module.exports = { signUpRouter };
