import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";
import { env } from "../env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

const client = globalForDb.client ?? postgres(env().DATABASE_URL, { prepare: false });

if (process.env.VERCEL_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, {
  schema,
  cache: upstashCache({
    url: env().UPSTASH_REDIS_REST_URL,
    token: env().UPSTASH_REDIS_REST_TOKEN,
  }),
  casing: "snake_case",
});

export type DB = typeof db;
