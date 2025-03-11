const { Router } = require("express");
const postsRouter = Router({ mergeParams: true });
const postsController = require("../controllers/postsController");
const { commentsRouter } = require("./comments");

postsRouter.post("/", postsController.addPost);
postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:postid", postsController.getPosts);
postsRouter.put("/:postid", postsController.updatePost);
postsRouter.delete("/:postid", postsController.deletePost);

postsRouter.use("/:postid/comments", commentsRouter);

module.exports = { postsRouter };
