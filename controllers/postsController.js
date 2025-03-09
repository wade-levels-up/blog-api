const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");

const addPost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const published = Boolean(req.body.published);
    const userId = Number(req.body.userId);

    await database.addPost(title, content, published, userId);
    res.status(200).json({ message: `Added ${req.body.title} to your posts` });
  } catch (error) {
    throw new Error(`Unable to create new post | ${error}`);
  }
});

module.exports = { addPost };
