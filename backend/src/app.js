const Fastify = require('fastify');
const { healthRoutes } = require('#src/routes/health.js');

function buildApp() {
  const app = Fastify({ logger: true });

  app.addHook('onSend', async (request, reply, payload) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return payload;
  });

  app.options('*', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return reply.code(204).send();
  });

  const { prismaPlugin } = require('#src/plugins/prisma.js');
  const { trpcPlugin } = require('#src/plugins/trpc.js');

  app.register(prismaPlugin);
  app.register(healthRoutes);
  app.register(trpcPlugin);

  return app;
}

module.exports = {
  buildApp,
};
