const asyncHandler = require("express-async-handler");
const database = require("../services/databaseService");
const CustomError = require("../utils/customError");
const { user } = require("../utils/prismaClient");

const getComments = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.postid);

    const comments = await database.getComments(postId);

    if (comments.length === 0) {
      throw new CustomError(`Couldn't find any comments`, 404);
    }

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

    const comment = await database.getComment(commentId);

    if (!comment) {
      throw new CustomError(`Couldn't find comment`, 404);
    }

    res.status(200).json({ comment });
  } catch (error) {
    throw new CustomError(
      `Unable to get comment | ${error}`,
      error.statusCode || 500
    );
  }
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const postId = Number(req.params.postid);
    const { username, content, userId } = req.body;

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
    const commentId = Number(req.params.commentid);

    await database.deleteComment(commentId);

    res.status(200).json({ message: `Deleted comment` });
  } catch (error) {
    throw new CustomError(
      `Unable to delete comment | ${error}`,
      error.statusCode || 500
    );
  }
});

module.exports = { getComments, getComment, addComment, deleteComment };
