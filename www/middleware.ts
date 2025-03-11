import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Handle Mixpanel proxy requests
  if (request.nextUrl.pathname.startsWith("/mp/")) {
    const mixpanelUrl = new URL(
      request.nextUrl.pathname.replace("/mp/", ""),
      "https://api.mixpanel.com"
    );

    // Forward query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      mixpanelUrl.searchParams.append(key, value);
    });

    return NextResponse.rewrite(mixpanelUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/mp/:path*",
};
