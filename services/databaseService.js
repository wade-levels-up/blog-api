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

module.exports = { addUser, getUserById, addPost };
