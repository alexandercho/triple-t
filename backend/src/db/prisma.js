const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('#src/generated/prisma/client.ts');
const { loadBackendEnv } = require('#src/config/env.js');

loadBackendEnv();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = {
  prisma,
};
