import { NextRequest, NextResponse } from "next/server";
import { createNEMO } from "@rescale/nemo";
import { securityHeadersMiddleware, securityHeadersOptions } from "@repo/security/security-headers";
import type { MiddlewareConfig } from "@rescale/nemo";
import { getSessionCookie } from "@/lib/auth/session";
const securityHeaders = securityHeadersMiddleware(securityHeadersOptions);

const middlewares = {
  "/:path*": [
    // Security headers
    async () => {
      const securityResponse = await securityHeaders();
      const response = NextResponse.next();

      securityResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });

      return response;
    },
  ],
  "/admin/:path*": [
    async (request: NextRequest) => {
      const sessionCookie = getSessionCookie(request);
      if (!sessionCookie) {
        const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/auth/login?next=${callbackUrl}`, request.url));
      }

      return NextResponse.next();
    },
  ],
} satisfies MiddlewareConfig;

export const proxy = createNEMO(middlewares);

export const config = {
  matcher: ["/((?!_next/|_static|[\\w-]+\\.\\w+).*)"],
};
