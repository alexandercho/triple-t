import { prisma } from '#src/db/prisma.js';

export function createContext() {
  return { prisma };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
