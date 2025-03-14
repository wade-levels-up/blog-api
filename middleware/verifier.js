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
  if (!req.params.userid) {
    return next(
      new CustomError(
        `User ID must be supplied. For example: /users/6, where 6 is the user ID`,
        400
      )
    );
  }
  const userId = Number(req.user.id);

  if (!req.user || userId !== +req.params.userid) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = { verifyAuthor, verifySameUser };
