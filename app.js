require("dotenv").config();
const express = require("express");
const passport = require("./services/authService");
const app = express();
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", routes.loginRouter);
app.use("/sign-up", routes.signUpRouter);

app.use("/users", routes.usersRouter);
app.use("/posts", routes.postsRouter);
app.use("/comments", routes.commentsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ error: error.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));
