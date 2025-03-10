const { Router } = require("express");
const postsRouter = Router({ mergeParams: true });
const postsController = require("../controllers/postsController");

postsRouter.post("/", postsController.addPost);
postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:postid", postsController.getPost);
postsRouter.put("/:postid", postsController.updatePost);
postsRouter.delete("/:postid", postsController.deletePost);

module.exports = { postsRouter };
