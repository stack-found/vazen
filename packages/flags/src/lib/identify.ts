import type { Identify } from "flags";
import type { StatsigUser } from "@flags-sdk/statsig";
import { getStableId } from "./stable-id";
import { dedupe } from "flags/next";

const getDeploymentEnv = () =>
  process.env.VERCEL_ENV === "production"
    ? "production"
    : process.env.VERCEL_ENV === "preview"
      ? "staging"
      : "development";

export const identify = dedupe(async () => {
  const stableId = await getStableId();

  return {
    userID: stableId.value,
    statsigEnvironment: {
      tier: getDeploymentEnv(),
    },
  };
}) satisfies Identify<StatsigUser>;
