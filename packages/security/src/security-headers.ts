import { defaults } from "@nosecone/next";
import type { Options as NoseconeOptions } from "@nosecone/next";
import { env } from "../env";

const isDev = process.env.NODE_ENV === "development";

export const securityHeadersOptions: NoseconeOptions = {
  ...defaults,
  contentSecurityPolicy: {
    ...defaults.contentSecurityPolicy,
    directives: {
      ...defaults.contentSecurityPolicy.directives,
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        ...(isDev ? (["'unsafe-eval'"] as const) : []),
        "https://ogohtsopo.vazen.dev",
        "https://*.posthog.com",
        "https://static.cloudflareinsights.com",
      ],
      connectSrc: [
        ...defaults.contentSecurityPolicy.directives.connectSrc,
        "https://ogohtsopo.vazen.dev",
        "https://*.posthog.com",
      ],
      workerSrc: [...defaults.contentSecurityPolicy.directives.workerSrc, "blob:", "data:"],
      imgSrc: [...defaults.contentSecurityPolicy.directives.imgSrc, "https://*.posthog.com"],
      styleSrc: [...defaults.contentSecurityPolicy.directives.styleSrc, "https://ogohtsopo.vazen.dev"],
      fontSrc: [...defaults.contentSecurityPolicy.directives.fontSrc, "https://*.posthog.com"],
      mediaSrc: [...defaults.contentSecurityPolicy.directives.mediaSrc, "https://*.posthog.com"],
      frameAncestors: ["'self'", "https://*.posthog.com"],
      upgradeInsecureRequests: !isDev,
      reportUri: [env().NEXT_PUBLIC_SENTRY_CSP_REPORT_ENDPOINT],
    },
  },
  crossOriginEmbedderPolicy: { policy: "credentialless" },
};

export { createMiddleware as securityHeadersMiddleware } from "@nosecone/next";
