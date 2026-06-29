import { jsonError, jsonOk } from "@/lib/api-utils";
import { signJwt, authCookieOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/schemas/profile";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!dbUser) {
      return jsonError("User not found", 404);
    }

    return jsonOk({ user: dbUser });
  } catch (error) {
    console.error("Get profile error:", error);
    return jsonError("Unable to load profile", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: parsed.data.firstName.trim(),
        lastName: parsed.data.lastName.trim(),
        phone: parsed.data.phone.trim(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        emailVerified: true,
      },
    });

    const authUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      emailVerified: updatedUser.emailVerified,
    };

    const token = await signJwt(authUser);
    const cookieStore = await cookies();
    cookieStore.set(authCookieOptions(token));

    return jsonOk({ user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    return jsonError("Unable to update profile", 500);
  }
}
