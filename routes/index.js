const { usersRouter } = require("./users");
const { postsRouter } = require("./posts");
const { commentsRouter } = require("./comments");
const { loginRouter } = require("./login");
const { signUpRouter } = require("./sign-up");

module.exports = {
  usersRouter,
  postsRouter,
  commentsRouter,
  signUpRouter,
  loginRouter,
};
