import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '#src/generated/prisma/client.js';
import { loadBackendEnv } from '#src/config/env.js';

loadBackendEnv();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });
