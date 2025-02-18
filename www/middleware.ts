import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_URL } from "./lib/metadata";

// Regex to match URLs that need to be redirected
const REDIRECT_REGEX = /^(?:https?:\/\/)?(?:www\.)?lingu\.africa/i;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // If the URL matches our regex and isn't already the canonical form
  if (
    REDIRECT_REGEX.test(hostname) &&
    hostname !== new URL(CANONICAL_URL).host
  ) {
    // Create the new URL with the canonical hostname
    const newUrl = new URL(url.pathname + url.search, CANONICAL_URL);

    // 308 Permanent Redirect, cache this forever
    return NextResponse.redirect(newUrl.toString(), {
      status: 308,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
