const { Router } = require("express");
const usersRouter = Router();
const { postsRouter } = require("./posts");
const { commentsRouter } = require("./comments");
const usersController = require("../controllers/usersController");

const passport = require("../services/authService");
const { verifySameUser } = require("../middleware/verifier");

// Routes

usersRouter.post("/", usersController.addUser);

// Protected Routes

// Updating users and getting user details are only accessible to users
// Users can only update and get their own details

usersRouter.get(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  verifySameUser,
  usersController.getUserByName
);

// usersRouter.put(
//   "/:userid",
//   passport.authenticate("jwt", { session: false }),
//   verifySameUser,
//   usersController.updateUserById
// );

usersRouter.use(
  "/:username/posts",
  passport.authenticate("jwt", { session: false }),
  postsRouter
);

usersRouter.use(
  "/:username/comments",
  passport.authenticate("jwt", { session: false }),
  commentsRouter
);

module.exports = { usersRouter };
