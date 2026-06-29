import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { favoriteVehicleSchema } from "@/lib/schemas/favorite";
import { getVehicleById } from "@/mock";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return jsonOk({ favorites });
  } catch (error) {
    console.error("Get favorites error:", error);
    return jsonError("Unable to load favorites", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = favoriteVehicleSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { vehicleId } = parsed.data;

    if (!getVehicleById(vehicleId)) {
      return jsonError("Vehicle not found", 404);
    }

    const favorite = await prisma.favorite.upsert({
      where: {
        userId_vehicleId: {
          userId: user.id,
          vehicleId,
        },
      },
      create: {
        userId: user.id,
        vehicleId,
      },
      update: {},
    });

    return jsonOk({ favorite }, { status: 201 });
  } catch (error) {
    console.error("Add favorite error:", error);
    return jsonError("Unable to add favorite", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = favoriteVehicleSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { vehicleId } = parsed.data;

    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        vehicleId,
      },
    });

    return jsonOk({ success: true });
  } catch (error) {
    console.error("Remove favorite error:", error);
    return jsonError("Unable to remove favorite", 500);
  }
}
