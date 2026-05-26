# Contributing to Vazen

Thank you for helping improve [Vazen](https://vazen.dev). This guide walks through local setup, environment configuration, day-to-day commands, and how we expect pull requests to look.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating. Security issues should follow [SECURITY.md](./SECURITY.md), not public issues with exploit details.

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Get the code](#get-the-code)
3. [Install dependencies](#install-dependencies)
4. [Start backing services (Docker)](#start-backing-services-docker)
5. [Configure environment variables](#configure-environment-variables)
6. [Database migrations](#database-migrations)
7. [Run the apps](#run-the-apps)
8. [Quality checks before you open a PR](#quality-checks-before-you-open-a-pr)
9. [Git hooks and commit messages](#git-hooks-and-commit-messages)
10. [Pull request checklist](#pull-request-checklist)
11. [Environment variables reference](#environment-variables-reference)

---

## Prerequisites

| Tool | Version / notes |
|------|-----------------|
| **Node.js** | `>= 22.22.3` (see root `package.json` `engines`) |
| **pnpm** | `10.33.4` (see root `packageManager`; use [Corepack](https://nodejs.org/api/corepack.html): `corepack enable`) |
| **Docker** | For local PostgreSQL and Redis (recommended) |
| **Git** | With hooks via [Lefthook](https://lefthook.dev/) (installed with the repo) |

Optional but used in this monorepo:

- [**portless**](https://portless.sh/) — local HTTPS hostnames for `web` and `docs` (wired in app `package.json` scripts)
- [**Playwright**](https://playwright.dev/) — for `pnpm e2e` / `pnpm web:e2e`

---

## Get the code

1. Fork the repository on GitHub (if you are not a direct collaborator).
2. Clone your fork and add upstream:

   ```bash
   git clone https://github.com/<your-username>/vazen.git
   cd vazen
   git remote add upstream https://github.com/stack-found/vazen.git
   ```

3. Base your work on `dev` and create a branch:

   ```bash
   git fetch upstream
   git checkout dev
   git pull upstream dev
   git checkout -b feat/short-description
   ```

---

## Install dependencies

From the repository root:

```bash
pnpm install
```

Install Git hooks (Lefthook):

```bash
pnpm exec lefthook install
```

---

## Start backing services (Docker)

PostgreSQL and a local Upstash-compatible Redis HTTP proxy match the defaults in `apps/web/.env.example`.

```bash
pnpm docker:up
```

| Service | Host port | Default credentials / token |
|---------|-----------|-----------------------------|
| PostgreSQL | `5432` | user `postgres`, password `postgres`, database `vazen_db` |
| Redis | `6379` | (internal to Compose) |
| Serverless Redis HTTP | `8079` | token `vazen` |

Stop services: `pnpm docker:down`  
Remove volumes: `pnpm docker:clean`

---

## Configure environment variables

### Web app (required for `web` dev/build)

Copy the example file and fill in secrets for features you need (OAuth, Statsig, PostHog, Sentry, R2):

```bash
cp apps/web/.env.example apps/web/.env.local
```

Next.js loads `apps/web/.env.local` (and related `.env*` files). Most variables for the running app live here.

### Package tooling (Drizzle, etc.)

When running database commands from `packages/db`, copy:

```bash
cp packages/db/.env.example packages/db/.env
```

Similarly, if you work on Redis or R2 packages directly:

```bash
cp packages/redis/.env.example packages/redis/.env
cp packages/storage/.env.example packages/storage/.env
```

Validated variables are defined in each package’s `env.ts` (via [@t3-oss/env-nextjs](https://env.t3.gg/)). Invalid or missing required values fail at build/runtime when that code path is loaded.

---

## Database migrations

With Docker Postgres running and `packages/db/.env` configured:

```bash
cd packages/db
pnpm db:push      # push schema (common for local dev)
# or
pnpm db:migrate   # apply migrations
pnpm db:studio    # Drizzle Studio
```

Schema change playbook: [packages/db/SCHEMA.md](https://github.com/stack-found/vazen/blob/main/packages/db/SCHEMA.md) (also in-repo at [`packages/db/SCHEMA.md`](../packages/db/SCHEMA.md)).

---

## Run the apps

From the repo root:

| Command | What it does |
|---------|----------------|
| `pnpm dev` | Turbo dev for all apps/packages that define `dev` |
| `pnpm web:dev` | Web app only |
| `pnpm docs:dev` | Docs app only |

Local URLs (see [README](../README.md)):

- Web: `https://local.web.vazen.id`
- Docs: `https://local.docs.vazen.id`

We use `.id` instead of `.localhost` because some OAuth providers reject `.localhost` redirect URLs during local development.

---

## Quality checks before you open a PR

From the repository root:

```bash
pnpm fmt          # oxfmt
pnpm lint         # oxlint (via turbo)
pnpm typecheck    # TypeScript across the monorepo
pnpm build        # full turbo build (optional but recommended)
pnpm web:e2e      # Playwright e2e for web (when touching UI/flows)
```

---

## Git hooks and commit messages

**Pre-commit** (see [`lefthook.yml`](../lefthook.yml)):

- Format staged files with **oxfmt**
- Lint staged TS/JS with **oxlint** (`pnpm lint -- --fix`)
- Validate **renovate** config when those files change

**Commit message** — [Conventional Commits](https://www.conventionalcommits.org/) enforced by **commitlint** ([`commitlint.config.ts`](../commitlint.config.ts)).

Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

Example:

```text
feat(web): add banner flag to homepage
```

---

## Pull request checklist

Open pull requests against the **`dev`** branch (not `main`). `main` is reserved for releases.

- [ ] Branch is up to date with `dev` (`git fetch upstream && git rebase upstream/dev`)
- [ ] PR base branch is **`dev`**
- [ ] `pnpm fmt`, `pnpm lint`, and `pnpm typecheck` pass locally
- [ ] Database changes include migrations or documented `db:push` steps
- [ ] New env vars are documented in `.env.example` and in the table below
- [ ] No secrets committed (`.env.local`, API keys, tokens)
- [ ] PR description explains **why** and how to test
- [ ] You have read the [Code of Conduct](./CODE_OF_CONDUCT.md)

---

## Environment variables reference

Primary template: [`apps/web/.env.example`](../apps/web/.env.example).  
Validation: `packages/*/env.ts`.

| Variable | Scope | Required locally | Description | Local default / notes |
|----------|--------|------------------|-------------|------------------------|
| `NODE_ENV` | Runtime | Set by tooling | `development` / `production` | Set automatically by Next.js |
| `ANALYZE` | Build | No | Set to `true` to enable Next bundle analyzer | Empty in example |
| `DATABASE_URL` | Server | **Yes** (web + db) | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/vazen_db` |
| `UPSTASH_REDIS_REST_URL` | Server | **Yes** | Upstash REST URL (local SRH proxy in Docker) | `http://localhost:8079` |
| `UPSTASH_REDIS_REST_TOKEN` | Server | **Yes** | Token for REST Redis | `vazen` (matches Compose `SRH_TOKEN`) |
| `GOOGLE_CLIENT_ID` | Server | **Yes** for Google sign-in | OAuth client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Server | **Yes** for Google sign-in | OAuth client secret | From Google Cloud Console |
| `BETTER_AUTH_SECRET` | Server | Recommended | Better Auth secret | Generate a strong random string |
| `BETTER_AUTH_API_KEY` | Server | Optional | Better Auth API key | Per Better Auth docs |
| `STATSIG_SERVER_API_KEY` | Server | **Yes** if using flags | Statsig server key | From Statsig console |
| `NEXT_PUBLIC_STATSIG_CLIENT_KEY` | Client | **Yes** if using flags | Statsig client key | Public; browser-exposed |
| `FLAGS_SECRET` | Server | No | Required only for [flags precompute](https://flags-sdk.dev/docs/frameworks/next/precompute#prerequisites) | Optional in `packages/flags/env.ts` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client | **Yes** if analytics enabled | PostHog project key | Must start with `phc_` |
| `NEXT_PUBLIC_POSTHOG_HOST` | Client | **Yes** if analytics enabled | PostHog API host | e.g. `https://us.i.posthog.com` |
| `NEXT_PUBLIC_SENTRY_DSN` | Client | **Yes** if Sentry enabled | Sentry DSN (URL) | From Sentry project settings |
| `SENTRY_ORG` | Server | **Yes** for Sentry build plugin | Sentry organization slug | Build-time |
| `SENTRY_PROJECT` | Server | **Yes** for Sentry build plugin | Sentry project slug | Build-time |
| `NEXT_PUBLIC_SENTRY_CSP_REPORT_ENDPOINT` | Client | **Yes** if CSP reporting enabled | Sentry CSP report URL | Valid URL |
| `R2_ACCOUNT_ID` | Server | **Yes** if using storage | Cloudflare account ID | `packages/storage` |
| `R2_ACCESS_KEY_ID` | Server | **Yes** if using storage | R2 access key | `packages/storage` |
| `R2_SECRET_ACCESS_KEY` | Server | **Yes** if using storage | R2 secret key | `packages/storage` |
| `PLAYWRIGHT_PORT` | Test | No | Port for Playwright web server | Defaults to `3000` |
| `CI` | CI | Set in CI | Enables stricter Playwright / Sentry behavior | Do not set locally unless mimicking CI |
| `VERCEL_ENV` | Hosting | N/A locally | `production` / `preview` for flag targeting | Set on Vercel |

**Where to put files**

| Path | Purpose |
|------|---------|
| `apps/web/.env.local` | Main Next.js app configuration |
| `packages/db/.env` | Drizzle Kit (`db:push`, `db:migrate`, `db:studio`) |
| `packages/redis/.env` | Redis package validation when run in isolation |
| `packages/storage/.env` | R2 / storage package when run in isolation |

Never commit `.env.local`, `.env`, or production secrets. Use `.env.example` as the source of truth for new variables.

---

## Monorepo layout (quick reference)

| Path | Role |
|------|------|
| `apps/web` | Main Next.js application |
| `apps/docs` | Documentation site (Fumadocs) |
| `packages/*` | Shared libraries (`@repo/db`, `@repo/auth`, …) |
| `e2e/web` | Playwright tests for web |
| `tooling/*` | Shared Playwright, ESLint/Oxlint, TSConfig |

---

## Questions?

Open a [Discussion](https://github.com/stack-found/vazen/discussions) or an issue with the `question` label if something in this doc is outdated—PRs that improve this file are welcome.
