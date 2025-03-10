const { Router } = require("express");
const postsRouter = Router();
const {
  addPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/postsController");

postsRouter.post("/", addPost);
postsRouter.get("/", getPosts);
postsRouter.get("/:postid", getPost);
postsRouter.put("/", updatePost);
postsRouter.delete("/", deletePost);

module.exports = { postsRouter };
