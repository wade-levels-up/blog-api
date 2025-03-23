const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");
const { user } = require("../utils/prismaClient");

const getComments = asyncHandler(async (req, res) => {
  try {
    let comments = await database.getAllComments();

    if (req.params.username) {
      comments = comments.filter(
        (comment) => comment.username === req.params.username
      );
    }

    if (req.params.commentid) {
      comments = comments.filter(
        (comment) => comment.id === +req.params.commentid
      );
    }

    if (comments.length === 0) {
      throw new CustomError(`Couldn't find any comments`, 404);
    }

    comments = comments.map((comment) => {
      const { userId, ...otherDetails } = comment;
      return otherDetails;
    });

    res.status(200).json({ comments });
  } catch (error) {
    throw new CustomError(
      `Unable to get comments | ${error}`,
      error.statusCode || 500
    );
  }
});

const getComment = asyncHandler(async (req, res) => {
  try {
    const commentId = Number(req.params.commentid);

    let comment = await database.getComment(commentId);

    if (!comment) {
      throw new CustomError(`Couldn't find comment`, 404);
    }

    const { userId, ...filteredComment } = comment;

    res.status(200).json({ filteredComment });
  } catch (error) {
    throw new CustomError(
      `Unable to get comment | ${error}`,
      error.statusCode || 500
    );
  }
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const post = await database.getPostById(+req.params.postid);
    if (post.published === false) {
      throw new CustomError(`Cannot make comments on unpublished posts`, 403);
    }

    if (!req.user) {
      throw new Error(
        `Comments can only be made by users. Please sign-up to become a user`,
        403
      );
    }

    const postId = Number(req.params.postid);
    const userId = Number(req.user.id);
    const content = req.body.content;
    const username = req.user.username;

    const user = await database.getUserById(userId);
    if (!user) {
      throw new CustomError(`Unable to find user`, 404);
    }

    await database.addComment(userId, postId, content, username);

    res.status(200).json({ message: `Added comment by ${username} to post` });
  } catch (error) {
    throw new CustomError(
      `Unable to add comment | ${error}`,
      error.statusCode || 500
    );
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new CustomError(
        `Must be logged in as a user to delete comments`,
        403
      );
    }

    const commentId = Number(req.params.commentid);
    const comment = await database.getComment(commentId);
    const post = await database.getPostById(comment.postId);

    console.log(req.user.isAuthor, post.userId, req.user.id, comment.userId);

    if (
      (req.user.isAuthor && post.userId === req.user.id) ||
      req.user.id === comment.userId
    ) {
      await database.deleteComment(commentId);
    } else {
      throw new CustomError(
        `Can only delete own comments or comments on posts you own`,
        403
      );
    }

    res.status(200).json({ message: `Deleted comment` });
  } catch (error) {
    throw new CustomError(
      `Unable to delete comment | ${error}`,
      error.statusCode || 500
    );
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new Error(`Must be logged in as a user to update comments`, 403);
    }

    const commentId = Number(req.params.commentid);
    const content = req.body.content;

    const comment = await database.getComment(commentId);
    if (!comment) {
      throw new Error(`Unable to find comment`, 404);
    }

    await database.updateComment(commentId, content);

    res.status(200).json({ message: `Updated comment` });
  } catch (error) {
    throw new CustomError(
      `Unable to update comment | ${error}`,
      error.statusCode || 500
    );
  }
});

module.exports = {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
