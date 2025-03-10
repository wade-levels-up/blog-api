const { Router } = require("express");
const postsRouter = Router();
const {
  addPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postsController");

postsRouter.post("/", addPost);
postsRouter.get("/", getPosts);
postsRouter.put("/", updatePost);
postsRouter.delete("/", deletePost);

module.exports = { postsRouter };
