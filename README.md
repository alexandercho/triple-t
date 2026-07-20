# triple-t 🏏

![triple-t logo](triple-t.png)

triple-t is a full-stack monorepo built around a Fastify API, a tRPC contract layer, an Expo frontend, Prisma-backed Postgres persistence, and Terraform scaffolding for cloud deployment. Think of it as a clean starter where the backend, frontend, and infrastructure all share the same source of truth.

Project notes live in `docs/`.

## Architecture 🏏

The repo is organized around a simple flow:

`Expo app` -> `tRPC client` -> `Fastify server` -> `tRPC router` -> `Prisma` -> `PostgreSQL`

Here is the longer version:

1. The root workspace owns the orchestration scripts in `scripts/`.
1. `pnpm setup` prepares the local environment, installs both app packages, starts Postgres in Docker, and runs Prisma generate and migrate.
1. `pnpm start` launches the backend and frontend together for day-to-day development.
1. The backend exposes HTTP routes and a typed tRPC API from `backend/`.
1. The frontend consumes that API from `frontend/` through a shared tRPC + React Query client layer.
1. Terraform code in `terraform/` describes the cloud-side shape of the project when you are ready to deploy it.

### Request Flow

The app is intentionally typed end to end:

1. A screen in the Expo app calls a generated tRPC hook.
1. The frontend tRPC client sends the request to the backend URL from `EXPO_PUBLIC_API_URL`.
1. Fastify receives the request and forwards it into the tRPC router.
1. The router can read and write data through Prisma.
1. Prisma talks to PostgreSQL, which is started locally by Docker during setup.

## Repo Layout 🏏

- `scripts/` - root automation for setup and local development.
- `backend/` - Fastify, tRPC, Prisma, and database code.
- `frontend/` - Expo Router app, UI, and the frontend tRPC client.
- `terraform/` - infrastructure modules and environment examples.
- `docs/` - short project notes for maintainers and agents.
- `triple-t.png` - the project image used in this README.

## Setup

Run setup from the repo root:

```bash
pnpm setup
```

That script will:

1. Prompt for a new project name.
1. Require the name to be kebab-case alphanumeric, using only lowercase letters, numbers, and hyphens.
1. Replace every `triple-t` instance in the repo with the name you enter.
1. Install dependencies for `backend/` and `frontend/`.
1. Start the local Postgres container with Docker.
1. Run Prisma generate and Prisma migrate for the backend.

If you are creating a fresh project from this template, `pnpm setup` is the first command to run.

## Start

Once setup is complete, start the app with:

```bash
pnpm start
```

This launches both parts of the stack together:

1. The backend runs in development mode from `backend/`.
1. The frontend starts the Expo app from `frontend/`.
1. If either side exits with an error, the root process shuts the other one down too.

## Current Scope

- Backend exposes a the letters of the alphabet with tRPC procedure and health routes.
- Frontend reads backend data through the shared tRPC client layer.
- Prisma handles schema generation and migrations for PostgreSQL.
- Terraform scaffolding is present for future infrastructure work.
- The root workspace scripts keep setup and startup behavior consistent across the repo.

## More Details

- [`backend/README.md`](backend/README.md)
- [`frontend/README.md`](frontend/README.md)
- [`terraform/README.md`](terraform/README.md)
- [`docs/README.md`](docs/README.md)
