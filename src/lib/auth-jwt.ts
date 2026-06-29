import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE_NAME = "go_token";
const JWT_EXPIRY = "7d";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  emailVerified: boolean;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function signJwt(user: AuthUser) {
  return new SignJWT({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    emailVerified: user.emailVerified,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyJwt(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.firstName !== "string" ||
      typeof payload.lastName !== "string" ||
      typeof payload.phone !== "string" ||
      typeof payload.emailVerified !== "boolean"
    ) {
      return null;
    }
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      emailVerified: payload.emailVerified,
    };
  } catch {
    return null;
  }
}

export function getUserInitials(user: Pick<AuthUser, "firstName" | "lastName">) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

export function getUserDisplayName(user: Pick<AuthUser, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`;
}

export async function getCurrentUserFromRequest(
  request: NextRequest
): Promise<AuthUser | null> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJwt(token);
}

export function authCookieOptions(token: string) {
  return {
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function clearAuthCookieOptions() {
  return {
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function generateToken() {
  return crypto.randomUUID();
}
