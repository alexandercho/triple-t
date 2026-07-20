const { prisma } = require('#src/db/prisma.js');

async function prismaPlugin(app) {
  app.decorate('prisma', prisma);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
}

module.exports = {
  prismaPlugin,
};
