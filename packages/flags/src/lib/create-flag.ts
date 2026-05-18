import { statsigAdapter } from "@flags-sdk/statsig";
import { flag } from "flags/next";
import type { StatsigUser } from "@flags-sdk/statsig";
import { identify } from "./identify";

type FlagConfig = {
  /** unique statsig feature gate key */
  key: string;
  /** human-readable explanation of the flag */
  description?: string;
  /** fallback value when evaluation fails */
  defaultValue?: boolean;
};

/**
 * creates a server-side feature flag backed by statsig.
 *
 * required by statsigAdapter:
 * - `STATSIG_SERVER_API_KEY` environment variable
 *
 * @example
 * export const newDashboardFlag = createFlag({
 *   key: "new_dashboard",
 *   description: "Enables the new dashboard experience",
 *   defaultValue: false,
 * });
 */
export const createFlag = (config: FlagConfig) => {
  return flag<boolean, StatsigUser>({
    key: config.key,
    description: config.description,
    defaultValue: config.defaultValue,
    identify,
    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true,
    }),
  });
};
