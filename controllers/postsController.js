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
    // Get all the posts
    let posts = await database.getPosts();
    console.table(posts);
    console.table(req.params);

    // If a user ID is provided via params filter all posts by userID
    if (req.params.userid) {
      const userId = Number(req.params.userid);
      posts = posts.filter((post) => post.userId === userId);
    }

    // If a post ID is provided via params filter all posts by postID
    if (req.params.postid) {
      const postId = Number(req.params.postid);
      posts = posts.filter((post) => post.id === postId);
    }

    // If a published query is provided set the published variable
    let published;
    if (req.query.published) {
      published = req.query.published === "true";
    }

    // Filter posts based on whether they're posted or not
    if (published === true) {
      posts = posts.filter((post) => post.published === true);
    }
    if (published === false) {
      posts = posts.filter((post) => post.published === false);
    }

    // If no posts are found throw an error
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

const deletePost = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.postid);

    let posts = await database.getPosts();
    if (req.params.userid) {
      const userId = Number(req.params.userid);
      posts = posts.filter((post) => post.userId === userId);
    }
    posts = posts.filter((post) => post.id === postId);
    if (posts.length === 0) {
      throw new CustomError(`Can't find post`, 404);
    }

    await database.deletePost(postId);
    res.status(200).json({ message: `Deleted post: '${posts[0].title}'` });
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

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
};
