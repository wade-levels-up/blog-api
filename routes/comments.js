const { Router } = require("express");
const commentsRouter = Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

const passport = require("../services/authService");
const { verifyAuthor, verifySameUser } = require("../middleware/verifier");

// Routes

commentsRouter.get("/", commentsController.getComments);
commentsRouter.get("/:commentid", commentsController.getComment);

// Protected Routes

commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentsController.addComment
);

commentsRouter.delete(
  "/:commentid",
  verifySameUser,
  commentsController.deleteComment
);
commentsRouter.put(
  "/:commentid",
  verifySameUser,
  commentsController.updateComment
);

module.exports = { commentsRouter };
