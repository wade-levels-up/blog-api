const { userRouter } = require("./user");
const { Router } = require("express");
const indexRouter = Router();
const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");

indexRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const user = await database.getUserById(1);
    res.status(200).json({ user: user.username });
  })
);

module.exports = { indexRouter, userRouter };
