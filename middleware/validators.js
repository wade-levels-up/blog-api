const { body } = require("express-validator");

const validateUsername = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 30 characters"),
];

const validatePassword = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be 8 or more characters long")
    .custom((password, { req }) => {
      if (password.includes(req.body.username)) {
        throw new Error("Password should not contain the username");
      }
      return true;
    }),
];

const validateEmail = [
  body("email")
    .trim()
    .isEmail({ require_tld: true })
    .withMessage(
      "Email must be a Top-Level Domain. For exmaple, ending in .com, .org or .net"
    ),
];

const validatePost = [
  body("title")
    .trim()
    .isLength({ max: 50, min: 3 })
    .withMessage("Title must be between 3 and 50 characters"),
  body("summary")
    .isLength({ max: 1000, min: 3 })
    .withMessage("Summary must be between 3 and 1000 characters"),
  body("content")
    .isLength({ min: 3 })
    .withMessage("Content cannot be less than 3 characters long"),
  body("published")
    .custom((value) => {
      if (value !== "true" && value !== "false") {
        throw new Error("Published state must be either 'true' or 'false'");
      }
      return true;
    })
    .withMessage("Published state must be either 'true' or 'false'"),
];

module.exports = {
  validateUsername,
  validatePassword,
  validateEmail,
  validatePost,
};
