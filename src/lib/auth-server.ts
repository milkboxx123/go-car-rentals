import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, verifyJwt, type AuthUser } from "@/lib/auth-jwt";

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyJwt(token);
}
