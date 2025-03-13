const CustomError = require("../utils/customError");

function verifyAuthor(req, res, next) {
  if (!req.user || req.user.isAuthor !== true) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

function verifySameUser(req, res, next) {
  const userId = Number(req.user.id);
  if (!req.user || userId !== req.params.userid) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = { verifyAuthor, verifySameUser };
