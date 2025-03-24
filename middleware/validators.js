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
    })
    .withMessage("Password should not contain the username"),
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
    .isLength({ max: 1500, min: 3 })
    .withMessage("Summary must be between 3 and 1500 characters"),
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

const validateComment = [
  body("content")
    .trim()
    .isLength({ max: 1000, min: 2 })
    .withMessage("Comment must be between 2 and 1000 characters"),
  body("content").notEmpty().withMessage("Comment content cannot be empty"),
  body("content")
    .matches(/^[a-zA-Z0-9\s.,!?]*$/)
    .withMessage("Comment content contains invalid characters"),
  body("content")
    .custom((comment) => {
      const editedComment = comment.toLowerCase();
      if (
        editedComment.includes("fuck") ||
        editedComment.includes("shit") ||
        editedComment.includes("cunt") ||
        editedComment.includes("piss") ||
        editedComment.includes("bitch") ||
        editedComment.includes("bastard") ||
        editedComment.includes("whore") ||
        editedComment.includes("slut") ||
        editedComment.includes("moot") ||
        editedComment.includes("dick")
      ) {
        throw new Error(`Comment cannot contain profanities`);
      }
      return true;
    })
    .withMessage("Comment cannot contain profanities"),
];

module.exports = {
  validateUsername,
  validatePassword,
  validateEmail,
  validatePost,
  validateComment,
};
