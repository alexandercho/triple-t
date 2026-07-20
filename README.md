# triple-t

triple-t is currently a boilerplate Fastify + tRPC backend with an Expo frontend.

Project notes live in `docs/`.

## 🛠️ The Tech Stack

* **Frontend Mobile & Web:** Expo (React Native)
* **API Architecture:** tRPC (End-to-end type safety)
* **Backend Server:** Fastify (High-performance Node.js framework)

---

## 🏗️ System Architecture & Workflow

```
               +------------------------+
               |   Expo Client (App)    |
               +-----------+------------+
                           |
                           | tRPC
                           v
               +------------------------+
               |    Fastify Server      |
               +------------------------+

```

## Current Scope

- Backend exposes a `hello` tRPC procedure.
- Frontend reads that procedure through the shared client layer.
- Root scripts start both services in development.
- `pnpm setup` installs both app packages, starts local Postgres, and runs the backend Prisma setup.
- Terraform scaffolding lives in `terraform/` for AWS hosting work.
