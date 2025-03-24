const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");
const { validationResult } = require("express-validator");
const {
  validateUsername,
  validatePassword,
  validateEmail,
} = require("../middleware/validators");

const addUser = [
  validateUsername,
  validatePassword,
  validateEmail,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsgArr = [];
        let errorMsgString;
        errors.array().forEach((error) => {
          errorMsgArr.push(error.msg);
        });
        errorMsgString = errorMsgArr.join(" | ");
        throw new CustomError(`Invalid credentials | ${errorMsgString}`);
      }

      const users = await database.getAllUsers();
      users.forEach((user) => {
        if (user.username === req.body.username) {
          throw new CustomError(
            `Username ${req.body.username} already in use`,
            409
          );
        }
        if (user.email === req.body.email) {
          throw new CustomError(`Email ${req.body.email} already in use`, 409);
        }
      });

      const { username, password, email } = req.body;
      let isAuthor = false;
      if (req.body.isAuthor && req.body.isAuthor === "true") {
        isAuthor = true;
      }

      await database.addUser(username, password, email, isAuthor);
      res
        .status(200)
        .json({ message: `Added ${req.body.username} to the database` });
    } catch (error) {
      throw new CustomError(`Unable to add new user | ${error.message}`, 500);
    }
  }),
];

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

const getUserByName = asyncHandler(async (req, res) => {
  try {
    const userData = await database.getUserByName(req.user.username);
    if (!userData) {
      throw new CustomError(`Couldn't find user`, 404);
    }

    const { id, password, ...user } = userData;

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

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  getUserByName,
  updateUserById,
};
