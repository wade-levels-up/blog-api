const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");

const addPost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const published = req.body.published === "false" ? false : true;

    const userId = Number(req.params.userid);

    await database.addPost(title, content, published, userId);
    res.status(200).json({ message: `Added ${req.body.title} to your posts` });
  } catch (error) {
    throw new CustomError(`Unable to create new post | ${error.message}`, 500);
  }
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const userId = Number(req.params.userid);
    let published;
    if (req.query.published) {
      published = req.query.published === "true";
    }

    let posts;
    if (published === true) {
      posts = await database.getPublishedPosts(userId);
    } else if (published === false) {
      posts = await database.getUnpublishedPosts(userId);
    } else {
      posts = await database.getPosts(userId);
    }

    if (posts.length === 0) {
      throw new CustomError(`No published posts for user exist`, 404);
    }

    res.status(200).json({ posts });
  } catch (error) {
    throw new CustomError(
      `Unable to get posts | ${error}`,
      error.statusCode || 500
    );
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.postid);
    const userId = Number(req.params.userid);

    const post = await database.getPost(postId, userId);
    if (!post) {
      throw new CustomError(`Cannot find post`, 404);
    }
    res.status(200).json({ post: post });
  } catch (error) {
    throw new CustomError(
      `Unable to get post | ${error.message}`,
      error.statusCode || 500
    );
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.postid);
    const userId = Number(req.params.userid);

    const post = await database.getPost(postId, userId);
    if (!post) {
      throw new CustomError(`Can't find post`, 404);
    }

    await database.deletePost(postId, userId);
    res.status(200).json({ message: `Deleted post: '${post.title}'` });
  } catch (error) {
    throw new CustomError(
      `Unable to delete post | ${error}`,
      error.statusCode || 500
    );
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const published = Boolean(req.body.published);
    const postId = Number(req.params.postid);
    const userId = Number(req.params.userid);

    const post = await database.getPost(postId, userId);
    if (!post) {
      throw new CustomError(`Can't find post`, 404);
    }

    await database.updatePost(postId, title, content, published, userId);
    res.status(200).json({ message: `Updated post ID ${postId}` });
  } catch (error) {
    throw new CustomError(
      `Unable to update post | ${error}`,
      error.statusCode || 500
    );
  }
});

module.exports = { addPost, getPosts, getPost, updatePost, deletePost };
