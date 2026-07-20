import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import type { FastifyPluginAsync } from 'fastify';
import { createContext } from '#src/trpc/context.js';
import { appRouter } from '#src/trpc/router.js';

export const trpcPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });
};
