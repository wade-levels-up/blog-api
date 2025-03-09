const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");

const addUser = asyncHandler(async (req, res) => {
  try {
    await database.addUser(
      req.body.username,
      req.body.password,
      req.body.email
    );
    res
      .status(200)
      .json({ message: `Added ${req.body.username} to the database` });
  } catch (error) {
    throw new Error(`Unable to create new user | ${error}`);
  }
});

module.exports = { addUser };
