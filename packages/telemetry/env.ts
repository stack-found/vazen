import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = () =>
  createEnv({
    client: {
      NEXT_PUBLIC_SENTRY_DSN: z.url(),
    },
    server: {
      SENTRY_ORG: z.string(),
      SENTRY_PROJECT: z.string(),
    },
    experimental__runtimeEnv: {
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
  });
