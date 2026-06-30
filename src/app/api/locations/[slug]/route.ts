import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const location = await prisma.location.findUnique({
      where: { slug, isActive: true },
      select: {
        id: true,
        slug: true,
        marketName: true,
        locationName: true,
        city: true,
        state: true,
        airportPickupEnabled: true,
        deliveryEnabled: true,
        stripePaymentsEnabled: true,
      },
    });

    if (!location) {
      return jsonError("Location not found", 404);
    }

    return jsonOk({ location });
  } catch (error) {
    console.error("Location lookup error:", error);
    return jsonError("Unable to load location", 500);
  }
}
