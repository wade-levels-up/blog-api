const { Router } = require("express");
const postsRouter = Router({ mergeParams: true });
const postsController = require("../controllers/postsController");
const { commentsRouter } = require("./comments");

const passport = require("../services/authService");
const { verifyAuthor, verifySameUser } = require("../middleware/verifier");

// Routes

postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:postid", postsController.getPosts);

// Protected Routes

// Authors can create posts for themselves
postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  verifyAuthor,
  verifySameUser,
  postsController.addPost
);

postsRouter.put(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  verifyAuthor,
  verifySameUser,
  postsController.updatePost
);

postsRouter.delete(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  verifyAuthor,
  verifySameUser,
  postsController.deletePost
);

postsRouter.use("/:postid/comments", commentsRouter);

module.exports = { postsRouter };
