const { Router } = require("express");
const userRouter = Router();
const { addUser } = require("../controllers/userController");

userRouter.post("/", addUser);

module.exports = { userRouter };
