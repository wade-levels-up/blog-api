const bcrypt = require("bcryptjs");
const { executeWithPrisma } = require("../utils/executeWithPrisma");
const prisma = require("../utils/prismaClient");

// User functions

async function getAllUsers() {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.user.findMany();
  });
}

async function getUserById(id) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  });
}

async function getUserByName(username) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  });
}

async function addUser(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await executeWithPrisma(async (prisma) => {
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    });
  });
}

async function updateUser(username, password, email, isAuthor, userId) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await executeWithPrisma(async (prisma) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        isAuthor: isAuthor,
      },
    });
  });
}

// Post functions

async function addPost(title, content, published, userId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        userId: userId,
      },
    });
  });
}

async function getPosts() {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findMany();
  });
}

async function getPostById(postId) {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  });
}

async function deletePost(postId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  });
}

async function updatePost(postId, title, content, published) {
  await executeWithPrisma(async (prisma) => {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
  });
}

// Comment functions

async function getCommentsByPostId(postId) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
  });
}

async function getAllComments() {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.comment.findMany();
  });
}

async function getComment(commentId) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  });
}

async function addComment(userId, postId, content, username) {
  await executeWithPrisma(async (prisma) => {
    await prisma.comment.create({
      data: {
        userId: userId,
        postId: postId,
        content: content,
        username: username,
      },
    });
  });
}

async function deleteComment(commentId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  });
}

async function updateComment(commentId, content) {
  await executeWithPrisma(async (prisma) => {
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });
  });
}

module.exports = {
  getAllUsers,
  getUserByName,
  updateUser,
  addUser,
  getUserById,
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getAllComments,
  getCommentsByPostId,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
