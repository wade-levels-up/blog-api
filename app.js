require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));
