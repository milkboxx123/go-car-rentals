import { cookies } from "next/headers";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { authCookieOptions, signJwt, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    const validPassword = await verifyPassword(password, user.passwordHash);
    if (!validPassword) {
      return jsonError("Invalid email or password", 401);
    }

    if (!user.emailVerified) {
      return jsonError(
        "Please verify your email before signing in. Check your inbox for a confirmation link.",
        403
      );
    }

    const authUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      emailVerified: user.emailVerified,
    };

    const token = await signJwt(authUser);
    const cookieStore = await cookies();
    cookieStore.set(authCookieOptions(token));

    return jsonOk({ user: authUser });
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Unable to sign in", 500);
  }
}
