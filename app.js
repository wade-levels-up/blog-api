require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./services/authService");
const app = express();
const routes = require("./routes/index");

const allowedOrigins = [process.env.PROXY];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming request origin:", origin); // Logs the origin
    console.log("Incoming request path:", this.req?.path); // Logs the path of the request
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS @API"));
    }
  },
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
