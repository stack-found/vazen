import { initLogger } from "@repo/telemetry/evlog";

export function configApiLogger() {
  initLogger({
    env: { service: "vazen-web" },
    pretty: process.env.NODE_ENV !== "production",
    // drain: <add-log-drains>
    sampling: {
      rates: { info: 20, warn: 50, debug: 5 },
      keep: [{ status: 400 }, { duration: 1500 }],
    },
  });
}
