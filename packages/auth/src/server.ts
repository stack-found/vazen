import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, magicLink } from "better-auth/plugins";
import { db } from "@repo/db";
import "server-only";
import { env } from "../env";
import { secondaryStorage } from "./secondary-storage";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export const auth = betterAuth({
  appName: "vazen",
  baseURL: {
    allowedHosts: [
      "localhost:3000", // Local Host
      "web.vazen.localhost", // Local development (using portless)
      "*.vercel.app", // Preview (Vercel)
      "web.vazen.dev", // Production
    ],
  },

  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  secondaryStorage: secondaryStorage(),

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "jwe",
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  plugins: [
    dash(),
    admin(),
    magicLink({
      rateLimit: {
        window: 900,
        max: 3,
      },
      storeToken: "hashed",
      sendMagicLink: async () => {
        //TODO :: Send Email
      },
    }),
  ],

  advanced: {
    cookiePrefix: "vazen",
    useSecureCookies: isProduction(),
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
  },
  onAPIError: {
    throw: false,
    onError: (error) => {
      console.error(error);
    },
    errorURL: "/auth/error",
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
