const { usersRouter } = require("./users");
const { postsRouter } = require("./posts");
const { commentsRouter } = require("./comments");
const { loginRouter } = require("./login");

module.exports = { usersRouter, postsRouter, commentsRouter, loginRouter };
