const { Router } = require("express");
const postsRouter = Router();
const { addPost } = require("../controllers/postsController");

postsRouter.post("/", addPost);

module.exports = { postsRouter };
