const { Router } = require("express");
const postsRouter = Router();
const {
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/postsController");

postsRouter.post("/", addPost);
postsRouter.put("/", updatePost);
postsRouter.delete("/", deletePost);

module.exports = { postsRouter };
