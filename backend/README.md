# Backend Structure

This backend uses a standard Fastify + tRPC layout.

## Folder guide

- `src/config/` - environment loading and process configuration.
- `src/db/` - Prisma client setup and database access helpers.
- `src/routes/` - HTTP routes that belong to Fastify directly, such as the root and health endpoints.
- `src/trpc/` - tRPC router definitions and context wiring.
- `src/plugins/` - Fastify plugins and server-level integrations.
- `prisma/` - Prisma schema and migration files.
- `src/server.js` - process entrypoint that boots the HTTP server.

## Current behavior

- `GET /health` returns the health check payload.
- `GET /trpc/hello` is available through the tRPC router.
- Prisma is configured for PostgreSQL through `prisma/schema.prisma`.
- Backend source files use `#src/...` absolute import specifiers backed by Node package imports.
- In this workspace, pnpm may require `pnpm approve-builds` before Prisma generate commands can run.
