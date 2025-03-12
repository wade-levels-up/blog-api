const { Router } = require("express");
const postsRouter = Router({ mergeParams: true });
const postsController = require("../controllers/postsController");
const { commentsRouter } = require("./comments");

const passport = require("../services/authService");
const verifyAuthor = require("../middleware/verifyAuthor");

postsRouter.post("/", postsController.addPost);
postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:postid", postsController.getPosts);
postsRouter.put("/:postid", postsController.updatePost);
postsRouter.delete(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  verifyAuthor,
  postsController.deletePost
);

postsRouter.use("/:postid/comments", commentsRouter);

module.exports = { postsRouter };
