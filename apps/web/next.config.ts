import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentry } from "@repo/telemetry/sentry/with-sentry";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  typedRoutes: true,
  cacheComponents: true,
  compress: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
    browserToTerminal: true,
  },
  transpilePackages: ["@repo/ui"],
  allowedDevOrigins: ["local.web.vazen.id", "*.local.web.vazen.id"],
};

const bundleAnalyzerPlugin = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const NextApp = () => {
  const plugins = [bundleAnalyzerPlugin, withSentry];
  return plugins.reduce((config, plugin) => plugin(config), nextConfig);
};

export default NextApp;
