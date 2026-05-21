import { NextRequest, NextResponse } from "next/server";
import { createNEMO } from "@rescale/nemo";
import { securityHeadersMiddleware, securityHeadersOptions } from "@repo/security/security-headers";
import type { MiddlewareConfig } from "@rescale/nemo";
import { getSessionCookie } from "@/lib/auth/session";
import { getStableId } from "@repo/flags/lib/stable-id";
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
    // Stable ID for feature flags
    async () => {
      const stableId = await getStableId();
      const response = NextResponse.next();

      if (stableId.isFresh) {
        response.cookies.set("stable-id", stableId.value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
        response.headers.set("x-generated-stable-id", stableId.value);
      }

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
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
