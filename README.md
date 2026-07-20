# triple-t 🏏🥁

---

**Triple-T: TypeScript. tRPC. Terraform.**

**This repo will always be Tung Tung Tung Sahere. 🥁**
<p align="center">
  <img src="triple-t.png" width="50%" />
</p>
---

**Triple-T** is a full-stack monorepo powered by the holy trinity of modern TypeScript development:

- **TypeScript** for end-to-end type safety
- **tRPC** for a shared API contract
- **Terraform** for infrastructure as code


Triple-T is a clean starter template built around a **Fastify API**, a **tRPC contract layer**, an **Expo frontend**, **Prisma-backed PostgreSQL persistence**, and **Terraform cloud scaffolding**.

Think of it as a small but mighty development squad where the frontend, backend, database, and infrastructure all speak the same language.

Project notes and developer guidance live in `docs/`.

---

# Architecture 🏏🥁

Triple-T follows a simple request flow:

```

Expo app
↓
tRPC client
↓
Fastify server
↓
tRPC router
↓
Prisma
↓
PostgreSQL

```

The longer version:

1. The root workspace acts as the command center, managing orchestration scripts inside `scripts/`.
1. `pnpm setup` prepares the battlefield:
   - installs app dependencies
   - starts PostgreSQL through Docker
   - generates Prisma clients
   - runs database migrations
1. `pnpm start` summons the full development stack:
   - backend API
   - frontend Expo app
   - coordinated process management
1. The backend lives in `backend/` and exposes HTTP routes plus a fully typed tRPC API.
1. The frontend lives in `frontend/` and consumes the backend through a shared tRPC + React Query client layer.
1. Terraform code in `terraform/` defines the infrastructure blueprint when Triple-T is ready to leave the local arena and enter the cloud.

---

## Request Flow 🥁

Triple-T is designed to keep types flowing from database to UI.

The journey of a request:

1. A screen in the Expo app calls a generated tRPC hook.
1. The frontend tRPC client sends the request to the backend URL defined in `EXPO_PUBLIC_API_URL`.
1. Fastify receives the request and hands it to the tRPC router.
1. The router performs application logic and reads/writes data through Prisma.
1. Prisma communicates with PostgreSQL, which runs locally through Docker during development.

One source of truth. No duplicated API types. No mysterious runtime surprises.

---

# Repo Layout 🏏

```

.
├── backend/      # Fastify, tRPC, Prisma, database logic
├── frontend/     # Expo Router app, UI, frontend tRPC client
├── terraform/    # Infrastructure as code
├── scripts/      # Root automation commands
├── docs/         # Developer notes and project guidance
└── triple-t.png  # The mighty Triple-T emblem

````

Detailed breakdown:

- `scripts/` - root automation for setup and local development.
- `backend/` - Fastify server, tRPC routers, Prisma schema, and database code.
- `frontend/` - Expo Router application, UI components, and tRPC client setup.
- `terraform/` - infrastructure modules and environment examples.
- `docs/` - project documentation for maintainers and agents.
- `triple-t.png` - the official Triple-T battle banner.

---

# Setup 🥁

First time entering the Triple-T arena?

Run:

```bash
pnpm setup
````

The setup ritual will:

1. Ask you for a new project name.
2. Validate that the name is kebab-case alphanumeric:

   * lowercase letters
   * numbers
   * hyphens only
3. Replace all `triple-t` references throughout the repo.
4. Install dependencies for:

   * `backend/`
   * `frontend/`
5. Start the local PostgreSQL container through Docker.
6. Generate Prisma clients and run database migrations.

If you are creating a fresh project from this template, `pnpm setup` is your first command.

---

# Start 🚀

Once setup is complete:

```bash
pnpm start
```

This launches the full Triple-T squad:

1. The backend starts in development mode from `backend/`.
2. The frontend launches through Expo from `frontend/`.
3. If one side crashes, the root process shuts down the other side as well.

No abandoned processes. No zombie servers.

---

# Current Scope 🏏

Triple-T currently includes:

* A Fastify backend with tRPC procedures and health routes.
* An Expo frontend consuming backend data through the shared tRPC client.
* Prisma schema management and migrations for PostgreSQL.
* Docker-based local database setup.
* Terraform scaffolding ready for future infrastructure expansion.
* Root workspace scripts that keep development commands consistent.

The foundation is built. The next upgrades are yours.

---

# More Details 📚

For deeper dives:

* [`backend/README.md`](backend/README.md)
* [`frontend/README.md`](frontend/README.md)
* [`terraform/README.md`](terraform/README.md)
* [`docs/README.md`](docs/README.md)
 

