import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = () =>
  createEnv({
    server: {
      R2_ACCOUNT_ID: z.string(),
      R2_ACCESS_KEY_ID: z.string(),
      R2_SECRET_ACCESS_KEY: z.string(),
    },
    experimental__runtimeEnv: process.env,
  });
