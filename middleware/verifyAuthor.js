const CustomError = require("../utils/customError");

function verifyAuthor(req, res, next) {
  if (req.user.isAuthor === false) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = verifyAuthor;
