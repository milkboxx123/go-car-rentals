import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const trips = await prisma.reservation.findMany({
      where: { userId: user.id },
      orderBy: { startDate: "desc" },
    });

    return jsonOk({ trips });
  } catch (error) {
    console.error("Get trips error:", error);
    return jsonError("Unable to load trips", 500);
  }
}
