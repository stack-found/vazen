import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = () =>
  createEnv({
    server: {
      FLAGS_SECRET: z.string().optional(),
      STATSIG_SERVER_API_KEY: z.string().min(1),
    },
    experimental__runtimeEnv: process.env,
  });
