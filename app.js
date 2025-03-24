require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./services/authService");
const app = express();
const routes = require("./routes/index");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", routes.loginRouter);

app.use("/users", routes.usersRouter);
app.use("/posts", routes.postsRouter);
app.use("/comments", routes.commentsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));
