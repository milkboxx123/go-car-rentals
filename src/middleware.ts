import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_NAME, verifyJwt } from "@/lib/auth-jwt";

const protectedPagePrefixes = ["/account"];
const protectedApiPrefixes = ["/api/account", "/api/messages", "/api/stripe", "/api/reservations"];

function isStripeWebhook(pathname: string) {
  return /^\/api\/stripe\/webhook\/[^/]+$/.test(pathname);
}

function isProtectedPath(pathname: string) {
  if (isStripeWebhook(pathname)) {
    return false;
  }

  return (
    protectedPagePrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    ) ||
    protectedApiPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const user = await verifyJwt(token);
  if (!user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(AUTH_COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/api/account/:path*",
    "/api/messages/:path*",
    "/api/stripe/:path*",
    "/api/reservations/:path*",
  ],
};
