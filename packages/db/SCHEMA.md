# Schema change playbook

schema changes are one of the highest sources of production incidents. this document defines the standard process we follow to keep changes safe and predictable.

use this playbook for any database modification, especially changes that affect existing data or running code.

## Risk overview

| operation                    | risk level     | recommended approach                            |
| ---------------------------- | -------------- | ----------------------------------------------- |
| add table                    | low            | migrate first, then deploy code                 |
| add nullable column          | low            | migrate first, then deploy code                 |
| add column with safe default | low to medium  | migrate first                                   |
| make column not null         | medium to high | write values, backfill, then enforce            |
| change column type           | medium to high | add new column and migrate in phases            |
| rename column                | high           | add new, backfill, switch reads, drop old later |
| rename table                 | high           | phased replacement with dual write if needed    |
| remove column                | high           | stop all reads and writes first, drop later     |
| remove table                 | high           | stop all usage first, drop later                |
| add foreign key              | medium to high | clean data then add constraint                  |
| change foreign key action    | high           | review delete and update behavior first         |
| add index                    | low            | add only for known query patterns               |
| drop index                   | low to medium  | confirm no longer used by critical queries      |
| add or tighten constraint    | medium to high | validate and backfill data first                |
| change or remove enum value  | high           | additive only, phase out old values             |

## Deployment rules

- additive changes: run database migration first
- destructive changes: update application code first
- compatibility changes: migration first, then code, then cleanup migration

always prefer multiple safe steps over a single risky change.

## Standard workflow

1. classify the change as additive or destructive
2. map all affected read paths, write paths, jobs, scripts and admin tools
3. identify any required data backfill or cleanup
4. update the database schema
5. run `pnpm db:generate`
6. review the generated sql migration in full
7. apply migration using `pnpm db:migrate`
8. deploy application code using the safe order for that change type
9. remove old columns, tables or compatibility logic only after verification

use `pnpm db:generate` + `pnpm db:migrate` for all production and shared environment changes. reserve `pnpm db:push` for local development only.

## Before starting any change

- list every code path that touches the affected schema
- check whether older deployments or workers will break
- verify existing data compliance with new rules
- assess impact on joins, filters, reports, urls and background jobs
- decide between single deploy versus phased rollout

## Core rules

- always make data valid before adding constraints
- stop using a column or table in code before dropping it
- prefer additive patterns over direct renames or drops
- review every generated migration sql before applying it
- never combine data migration with destructive schema changes in one step

## High risk situations

apply extra caution and peer review when changing:

- primary keys
- foreign keys
- unique constraints
- non-null constraints
- enum values
- columns used in routing, permissions or urls
- large or high-traffic tables

## Quick reference patterns

add new column:
add as nullable or with safe default → migrate → update writes → backfill if needed

make column required:
deploy code that always writes the value → backfill old rows → verify no nulls → enforce not null

rename column:
add new column → write to both → backfill → switch all reads → drop old column in later migration

remove column:
stop all reads and writes in code → deploy → confirm zero usage → drop in later migration

add foreign key:
clean inconsistent data → add constraint

## Final rule

follow this playbook consistently. when a change feels risky, break it into smaller safe steps instead of rushing it.
