const bcrypt = require("bcryptjs");
const { executeWithPrisma } = require("../utils/executeWithPrisma");
const prisma = require("../utils/prismaClient");

async function getUserById(id) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
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

async function getPosts(userId) {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });
  });
}

async function getPublishedPosts(userId) {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findMany({
      where: {
        userId: userId,
        published: true,
      },
    });
  });
}

async function getUnpublishedPosts(userId) {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findMany({
      where: {
        userId: userId,
        published: false,
      },
    });
  });
}

async function getPost(postId, userId) {
  return executeWithPrisma(async (prisma) => {
    return await prisma.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });
  });
}

async function deletePost(id, userId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.post.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
  });
}

async function updatePost(postId, title, content, published, userId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.post.update({
      where: {
        id: postId,
        userId: userId,
      },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
  });
}

module.exports = {
  addUser,
  getUserById,
  addPost,
  getPosts,
  getPublishedPosts,
  getUnpublishedPosts,
  getPost,
  updatePost,
  deletePost,
};
