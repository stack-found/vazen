## Summary

<!-- What changed and why. Link issues: Fixes #123 -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor / chore
- [ ] Docs only
- [ ] CI / tooling

## Test plan

<!-- Commands run, URLs, scenarios. -->

- [ ] `pnpm fmt`
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm build` (if build-sensitive)
- [ ] `pnpm web:e2e` (if UI / flows changed)

## Checklist

- [ ] Base branch is **`dev`** (not `main`)
- [ ] Branch is up to date with `dev`
- [ ] Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`commitlint.config.ts`)
- [ ] DB changes include migrations or documented steps (`packages/db`)
- [ ] New env vars are in `.env.example` and [CONTRIBUTING.md](../CONTRIBUTING.md#environment-variables-reference)
- [ ] No secrets or `.env.local` committed
- [ ] [Code of Conduct](../CODE_OF_CONDUCT.md)
