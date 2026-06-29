import { cookies } from "next/headers";

import { jsonError, jsonOk } from "@/lib/api-utils";
import {
  authCookieOptions,
  generateToken,
  hashPassword,
  signJwt,
} from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { firstName, lastName, phone, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return jsonError("An account with this email already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const verificationToken = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        emailVerificationTokens: {
          create: {
            token: verificationToken,
            expiresAt,
          },
        },
      },
    });

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
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

    return jsonOk(
      {
        user: authUser,
        message:
          "Account created. Please check your email to verify your address.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return jsonError("Unable to create account", 500);
  }
}
