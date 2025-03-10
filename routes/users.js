const { Router } = require("express");
const usersRouter = Router();
const { postsRouter } = require("./posts");
const usersController = require("../controllers/usersController");

usersRouter.post("/", usersController.addUser);
usersRouter.use("/:userid/posts", postsRouter);

module.exports = { usersRouter };
