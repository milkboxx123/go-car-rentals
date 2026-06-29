import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { sendMessageSchema } from "@/lib/schemas/message";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const messages = await prisma.message.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return jsonOk({ messages });
  } catch (error) {
    console.error("Get messages error:", error);
    return jsonError("Unable to load messages", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = sendMessageSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const message = await prisma.message.create({
      data: {
        userId: user.id,
        body: parsed.data.body.trim(),
        fromAdmin: false,
      },
    });

    return jsonOk({ message }, { status: 201 });
  } catch (error) {
    console.error("Send message error:", error);
    return jsonError("Unable to send message", 500);
  }
}
