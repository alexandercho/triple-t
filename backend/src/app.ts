import Fastify, { type FastifyInstance } from 'fastify';
import { prismaPlugin } from '#src/plugins/prisma.js';
import { trpcPlugin } from '#src/plugins/trpc.js';
import { healthRoutes } from '#src/routes/health.js';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.addHook('onSend', async (_request, reply, payload) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return payload;
  });

  app.options('*', async (_request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return reply.code(204).send();
  });

  app.register(prismaPlugin);
  app.register(healthRoutes);
  app.register(trpcPlugin);

  return app;
}
