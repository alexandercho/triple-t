const { prisma } = require('#src/db/prisma.js');

function createContext() {
  return { prisma };
}

module.exports = {
  createContext,
};
