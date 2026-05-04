import { createEnv } from "@t3-oss/env-nextjs";

export const env = () =>
  createEnv({
    //TODO: add email provider env variables
    server: {},
    experimental__runtimeEnv: process.env,
  });
