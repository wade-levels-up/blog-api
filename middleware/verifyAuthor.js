const CustomError = require("../utils/customError");

function verifyAuthor(req, res, next) {
  console.table(req.user);
  if (!req.user || req.user.author !== true) {
    return next(
      new CustomError("Access denied. Insufficient permissions.", 403)
    );
  }
  next();
}

module.exports = verifyAuthor;
