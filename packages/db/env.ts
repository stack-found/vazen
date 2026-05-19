import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { env as redis } from "@repo/redis/env";

export const env = () =>
  createEnv({
    extends: [redis()],
    server: {
      DATABASE_URL: z.url(),
    },
    experimental__runtimeEnv: process.env,
  });
