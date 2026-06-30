import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentsOnly = searchParams.get("paymentsEnabled") === "true";

    const locations = await prisma.location.findMany({
      where: {
        isActive: true,
        ...(paymentsOnly ? { stripePaymentsEnabled: true } : {}),
      },
      select: {
        id: true,
        slug: true,
        marketName: true,
        locationName: true,
        city: true,
        state: true,
        stripePaymentsEnabled: true,
        stripePublishableKey: true,
      },
      orderBy: { marketName: "asc" },
    });

    return NextResponse.json({ locations });
  } catch (error) {
    console.error("Locations API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
