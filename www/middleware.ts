import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Handle trailing slash redirects for learn routes
  if (url.pathname.match(/^\/learn\/[^\/]+$/) && !url.pathname.endsWith("/")) {
    url.pathname += "/";
    return NextResponse.redirect(url);
  }

  // Set CORS headers on all responses
  const response = NextResponse.next();

  // Add CORS headers for all responses
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Additional headers for security
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Prevent caching of HTML pages to ensure navbar updates are visible immediately
  const pathname = request.nextUrl.pathname;
  const isHtmlPage = !pathname.startsWith("/_next/") &&
                      !pathname.startsWith("/api/") &&
                      !pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/);

  if (isHtmlPage) {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

// This config determines which paths the middleware runs on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
