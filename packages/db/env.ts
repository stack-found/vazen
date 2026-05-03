import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { env as redis } from "@repo/redis/env";

export const env = () =>
  createEnv({
    extends: [redis()],
    server: {
      DATABASE_URL: z.url(),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
