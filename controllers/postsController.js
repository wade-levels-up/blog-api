const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");

const addPost = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new CustomError(`Must be logged in as a user to create posts`, 401);
    }

    if (req.user.isAuthor === false) {
      throw new CustomError(`Must be an author to create posts`, 401);
    }

    const author = req.user.username;
    const { title, summary, content } = req.body;
    const published = req.body.published === "false" ? false : true;

    await database.addPost(
      title,
      author,
      summary,
      content,
      published,
      req.user.id
    );
    res
      .status(200)
      .json({ message: `Added '${req.body.title}' to your posts` });
  } catch (error) {
    throw new CustomError(`Unable to create new post | ${error.message}`, 500);
  }
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    // Get all the posts
    let posts = await database.getPosts();

    // If no user object has been attached to the request only return published posts
    if (!req.user) {
      posts = posts.filter((post) => post.published === true);
    }

    if (req.params.username) {
      if (req.user.username !== req.params.username) {
        throw new CustomError(
          `You may only request posts by your own username which is '${req.user.username}'. The posts you requested were by '${req.params.username}' which doesn't match.`
        );
      }
    }

    // If there is a user object attached, return all posts if the user id is the same, or the post is published
    // This makes it so a user who is an author can retrieve their own unpublished and published posts
    if (req.user) {
      const user = await database.getUserById(+req.user.id);
      if (+req.user.id !== user.id) {
        throw new CustomError(
          `You may only request resources that belong to you`,
          403
        );
      }
      posts = posts.filter(
        (post) => post.userId === req.user.id || post.published === true
      );
    }

    // If a username is provided via params filter all posts by username
    if (req.params.username) {
      const username = req.params.username;
      posts = posts.filter((post) => post.author === username);
    }

    // If a post ID is provided via params filter all posts by postID
    if (req.params.postid) {
      const postId = Number(req.params.postid);
      posts = posts.filter((post) => post.id === postId);
    }

    // If no posts are found throw an error
    if (posts.length === 0) {
      throw new CustomError(`Couldn't find any posts`, 404);
    }

    // Remove user ID from posts and return all other details
    // Keeps user ID being returned to the client
    posts = posts.map((post) => {
      const { userId, ...otherDetails } = post;
      return otherDetails;
    });

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
    if (!req.params.postid) {
      return new CustomError(`Must provide ID of post to delete`);
    }
    const postId = Number(req.params.postid);

    // Check to see that the post we're trying to delete exists, if not throw an error
    let posts = await database.getPosts();
    posts = posts.filter((post) => post.id === postId);
    if (posts.length === 0) {
      throw new CustomError(`Can't find post to delete`, 404);
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
    const { title, summary, content } = req.body;
    const published = req.body.published === "true";
    if (!req.params.postid) {
      return new CustomError(`Must provide ID of post to update`);
    }
    const postId = Number(req.params.postid);

    // Check to see that the post we're trying to update exists, if not throw an error
    let posts = await database.getPosts();
    posts = posts.filter((post) => post.id === postId);
    if (posts.length === 0) {
      throw new CustomError(`Can't find post to update`, 404);
    }

    await database.updatePost(postId, title, summary, content, published);
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
