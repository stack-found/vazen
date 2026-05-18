import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@repo/auth/server";
import { getSessionCookie as BAGetSessionCookie } from "better-auth/cookies";

export const getServerSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("[Auth] Error getting server session", error);
    return null;
  }
});

export const getSessionCookie = (request: Parameters<typeof BAGetSessionCookie>[0]) =>
  BAGetSessionCookie(request, { cookiePrefix: "vazen" });
