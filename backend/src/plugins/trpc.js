const { fastifyTRPCPlugin } = require('@trpc/server/adapters/fastify');
const { appRouter } = require('#src/trpc/router.js');
const { createContext } = require('#src/trpc/context.js');

async function trpcPlugin(app) {
  app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });
}

module.exports = {
  trpcPlugin,
};
