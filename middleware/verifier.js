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
  // If no username is supplied as a param through an error
  if (!req.params.username) {
    return next(
      new CustomError(
        `Username must be supplied. For example: /users/john, where 'john' is the user`,
        400
      )
    );
  }
  // If there isn't a user logged in OR the user's username doesn't match the resource they're requesting
  // throw an error
  if (!req.user || req.user.username !== req.params.username) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = { verifyAuthor, verifySameUser };
