import type { NextConfig } from "next";
import { withSentry } from "@repo/telemetry/sentry/with-sentry";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  transpilePackages: ["@repo/ui"],
  allowedDevOrigins: ["web.vazen.localhost", "*.web.vazen.localhost"],
};
const NextApp = () => {
  const plugins = [withSentry];
  return plugins.reduce((config, plugin) => plugin(config), nextConfig);
};

export default NextApp;
