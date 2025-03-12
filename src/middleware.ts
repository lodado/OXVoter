import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextRequest, NextResponse } from "next/server";

import { i18nMiddleware, withAuthApiMiddleware } from "./app/middlewares/index.server";
import { rateLimitMiddleware } from "./app/middlewares/rateLimitMiddleware";

export const runtime = "nodejs";

export type MiddlewareFactory = {
  middleware: (request: NextRequest, response: NextResponse) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

  /**
   * Middleware matcher configuration
   * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   */
  config: {
    matcher: string[];
    order: number;
  };
};

/**
 * Stack nextjs middlewares for allow multiple middleware usage with invoking them with order
 */

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

  // sentry
  if (path.startsWith("/monitoring")) {
    return NextResponse.next();
  }

  const rateLimitResponse = await rateLimitMiddleware(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  if (path.startsWith("/api")) {
    return withAuthApiMiddleware(request, path, defaultLocale);
  }

  return i18nMiddleware(request, path, defaultLocale);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|js|json|bin|webmanifest|xml)$).*)",
  ],
};
