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

const getPosts = asyncHandler(async (req, res) => {
  try {
    const userId = Number(req.body.userId);

    const posts = await database.getPosts(userId);
    res.status(200).json({ posts: posts });
  } catch (error) {
    throw new Error(`Unable to get posts | ${error}`);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.body.id);

    await database.deletePost(postId);
    res.status(200).json({ message: `Deleted post ID ${postId}` });
  } catch (error) {
    throw new Error(`Unable to delete post | ${error}`);
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const published = Boolean(req.body.published);
    const postId = Number(req.body.id);

    await database.updatePost(postId, title, content, published);
    res.status(200).json({ message: `Updated post ID ${postId}` });
  } catch (error) {
    throw new Error(`Unable to update post | ${error}`);
  }
});

module.exports = { addPost, getPosts, updatePost, deletePost };
