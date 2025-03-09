const prisma = require("./prismaClient");

async function executeWithPrisma(callback) {
  try {
    return await callback(prisma);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { executeWithPrisma };
