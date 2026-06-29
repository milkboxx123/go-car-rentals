import { jsonError, jsonOk } from "@/lib/api-utils";
import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return jsonError("Verification token is required");
    }

    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return jsonError("Invalid or expired verification link", 400);
    }

    if (verificationToken.expiresAt < new Date()) {
      await prisma.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });
      return jsonError("Verification link has expired", 400);
    }

    if (verificationToken.user.emailVerified) {
      await prisma.emailVerificationToken.deleteMany({
        where: { userId: verificationToken.userId },
      });
      return jsonOk({ message: "Email already verified" });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: true },
      }),
      prisma.emailVerificationToken.deleteMany({
        where: { userId: verificationToken.userId },
      }),
    ]);

    try {
      await sendWelcomeEmail(
        verificationToken.user.email,
        verificationToken.user.firstName
      );
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return jsonOk({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    return jsonError("Unable to verify email", 500);
  }
}
