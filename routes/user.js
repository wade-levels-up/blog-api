const { Router } = require("express");
const userRouter = Router();
const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");

userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    await database.addUser(req.body.username, req.body.password);
    res
      .status(200)
      .json({ message: `Added ${req.body.username} to the database` });
  })
);

module.exports = { userRouter };
