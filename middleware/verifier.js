const CustomError = require("../utils/customError");

function verifyAuthor(req, res, next) {
  if (!req.user || req.user.isAuthor !== true) {
    return next(
      new CustomError(
        "Access denied. Insufficient permissions. Only authors allowed.",
        403
      )
    );
  }
  next();
}

function verifySameUser(req, res, next) {
  const userId = Number(req.user.id);

  if (!req.params.userid) {
    return next(
      new CustomError(
        `User ID must be supplied in URL. For example: /users/6/posts, where 6 is the user ID`,
        400
      )
    );
  }

  if (!req.user || userId !== +req.params.userid) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = { verifyAuthor, verifySameUser };
