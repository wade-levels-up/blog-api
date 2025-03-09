const { Router } = require("express");
const usersRouter = Router();
const { addUser } = require("../controllers/usersController");

usersRouter.post("/", addUser);

module.exports = { usersRouter };
