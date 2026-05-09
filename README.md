# vazen

[![VAZEN](./github.svg)](https://github.com/hashversion/vazen)

> - Demo site :: [web.vazen.dev](https://web.vazen.dev)

## What is vazen?

- [**Vazen**](https://vazen.dev) :: velocity + (minimal & simplicity)

### Dev Toolkit

- [**pnpm**](https://pnpm.io) :: Fast, disk-efficient package manager
- [**portless**](https://portless.sh) :: Clean local hostnames for app development
- [**commitlint**](https://commitlint.js.org/) :: Enforces Conventional Commits
- [**lefthook**](https://lefthook.dev/) :: Fast Git hooks (pre-commit, pre-push, etc.)
- [**fallow**](https://fallow.tools) :: Dead-code analysis and project cleanup
- [**oxfmt**](https://oxc.rs/docs/guide/usage/formatter.html) :: Opinionated code formatter
- [**oxlint**](https://oxc.rs/docs/guide/usage/linter.html) :: Static analysis and linting
- [**Playwright**](https://playwright.dev/) :: End-to-end testing for browser workflows
- [**Docker**](https://www.docker.com/) :: Local development via Docker Compose
- [**t3-oss/env-nextjs**](https://env.t3.gg/) :: Validates environment variables at build-time
- [**Nosecone**](https://docs.arcjet.com/nosecone/quick-start) :: Security headers made simple (Arcjet’s OSS library)

### Tech Stack

- [**Next.js v16**](https://nextjs.org/) :: React framework with app router
- [**React.js v19**](https://react.dev/) :: Latest React with React compiler enabled
- [**Typescript**](https://www.typescriptlang.org/) :: Type-safe development
- [**Tailwind CSS v4**](https://tailwindcss.com/) :: Utility-first CSS framework
- [**oRPC**](https://orpc.dev/) :: tRPC alternative with built-in OpenAPI support
- [**Tanstack Query**](https://tanstack.com/query/latest) :: Data fetching and caching
- [**PostgreSQL**](https://postgresql.org/) :: Primary database
- [**Upstash**](https://upstash.com) :: Severless redis
- [**Drizzle ORM**](https://orm.drizzle.team/) :: Sequel (SQL) Statement Builder
- [**Better-Auth**](https://better-auth.com/) :: Comprehensive authentication framework
- [**React Email**](https://react.email/) :: React-based email templates
- [**PostHog**](https://posthog.com/) :: Web analytics
- [**Sentry**](https://sentry.io/) :: Error monitoring & logging
- [**Evlog**](https://evlog.dev) :: Simple logs, wide events, and structured logging

## Local Development

- Uses [**portless**](https://portless.sh/) :: apps run on clean hostnames instead of raw ports.
- Local hosts: `web.vazen.localhost` and `docs.vazen.localhost`
- Dev scripts in [`apps/web/package.json`](apps/web/package.json) and [`apps/docs/package.json`](apps/docs/package.json) are wired to portless.

**Local hosts:**
- `web.vazen.localhost`
- `docs.vazen.localhost`

The `dev` scripts inside [`apps/web/package.json`](apps/web/package.json) and [`apps/docs/package.json`](apps/docs/package.json) are wired to portless.

### License

- MIT License :: See the [LICENSE](LICENSE) file for details.
