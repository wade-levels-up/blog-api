const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");

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
    throw new CustomError(`Unable to new user | ${error.message}`, 500);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await database.getAllUsers();
    if (!users) {
      throw new CustomError(`Couldn't find any users`, 404);
    }

    res.status(200).json({ users });
  } catch (error) {
    throw new CustomError(`Unable to get users | ${error.message}`, 500);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await database.getUserById(+req.user.userid);
    if (!user) {
      throw new CustomError(`Couldn't find user`, 404);
    }

    res.status(200).json({ user });
  } catch (error) {
    throw new CustomError(`Unable to get user | ${error.message}`);
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const isAuthor = req.body.isAuthor === "true";
    const userId = +req.user.id;
    await database.updateUser(username, password, email, isAuthor, userId);

    res.status(200).json({ message: `Updated user ${username}` });
  } catch (error) {
    throw new CustomError(`Unable to update user | ${error.message}`);
  }
});

module.exports = { addUser, getAllUsers, getUserById, updateUserById };
