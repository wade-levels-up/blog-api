require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", routes.userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));
