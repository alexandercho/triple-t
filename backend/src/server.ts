import { buildApp } from '#src/app.js';
import { getServerConfig, loadBackendEnv } from '#src/config/env.js';
import { prisma } from '#src/db/prisma.js';

loadBackendEnv();

const app = buildApp();
const { host, port } = getServerConfig();
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((value, index) => ({
  id: index + 1,
  value,
}));

async function seedLetters(): Promise<void> {
  const count = await prisma.letter.count();
  if (count > 0) return;

  await prisma.letter.createMany({
    data: letters,
  });
}

async function start(): Promise<void> {
  try {
    await seedLetters();
  } catch (error) {
    app.log.warn({ err: error }, 'Skipping letter seed because the database is unavailable');
  }

  try {
    await app.listen({ host, port });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
