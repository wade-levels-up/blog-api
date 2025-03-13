const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const database = require("../services/databaseService");

const signUp = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await database.addUser(username, password, email);

    res.status(200).json({ message: `New user '${username}' created` });
  } catch (error) {
    throw new CustomError(
      `Unable to sign up | ${error}`,
      error.statusCode || 500
    );
  }
});

module.exports = { signUp };
