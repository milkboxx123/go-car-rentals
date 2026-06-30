import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/booking-groups?startDate=&endDate=
 *
 * Returns active booking groups with availableCount for the requested date window.
 * Powers real-time availability on the public marketing site.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");
    const locationId = searchParams.get("locationId");

    const startAt = startDateStr ? new Date(startDateStr) : null;
    const endAt = endDateStr ? new Date(endDateStr) : null;

    const groups = await prisma.bookingGroup.findMany({
      where: {
        isActive: true,
        ...(locationId ? { locationId } : {}),
      },
      include: {
        vehicleEligibilities: {
          include: { vehicle: true },
        },
        media: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          take: 3,
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    const EXCLUDED_STATUSES = [
      "maintenance",
      "cleaning",
      "blocked",
      "inactive",
      "sold",
    ];

    const result = await Promise.all(
      groups.map(async (group) => {
        let availableCount: number | null = null;

        if (startAt && endAt && !isNaN(startAt.getTime()) && !isNaN(endAt.getTime())) {
          const eligibleVehicles = group.vehicleEligibilities
            .map((e) => e.vehicle)
            .filter((v) => !EXCLUDED_STATUSES.includes(v.status) && !v.archivedAt);

          if (eligibleVehicles.length > 0) {
            const eligibleIds = eligibleVehicles.map((v) => v.id);

            // Get vehicles with active assignments that overlap the window
            const assignedIds = await prisma.reservationVehicleAssignment
              .findMany({
                where: {
                  vehicleId: { in: eligibleIds },
                  assignmentStatus: "active",
                  assignedAt: { lt: endAt },
                  OR: [
                    { unassignedAt: null },
                    { unassignedAt: { gt: startAt } },
                  ],
                },
                select: { vehicleId: true },
              })
              .then((rows) => rows.map((r) => r.vehicleId));

            // Get vehicles with availability blocks that overlap the window
            const blockedIds = await prisma.availabilityBlock
              .findMany({
                where: {
                  vehicleId: { in: eligibleIds },
                  startAt: { lt: endAt },
                  endAt: { gt: startAt },
                },
                select: { vehicleId: true },
              })
              .then((rows) => rows.map((r) => r.vehicleId));

            const unavailable = new Set([...assignedIds, ...blockedIds]);
            availableCount = eligibleVehicles.filter(
              (v) => !unavailable.has(v.id)
            ).length;
          } else {
            availableCount = 0;
          }
        }

        return {
          id: group.id,
          name: group.name,
          slug: group.slug,
          publicHeadline: group.publicHeadline,
          publicDescription: group.publicDescription,
          heroImageBlobUrl: group.heroImageBlobUrl,
          cardImageBlobUrl: group.cardImageBlobUrl,
          imageAltText: group.imageAltText,
          startingDailyRateCents: group.startingDailyRateCents,
          minDays: group.minDays,
          maxDays: group.maxDays,
          minSeats: group.minSeats,
          maxSeats: group.maxSeats,
          minBags: group.minBags,
          maxBags: group.maxBags,
          isFeatured: group.isFeatured,
          sortOrder: group.sortOrder,
          media: group.media.map((m) => ({
            id: m.id,
            blobUrl: m.blobUrl,
            mediaType: m.mediaType,
            altText: m.altText,
          })),
          availableCount,
          vehicleCount: group.vehicleEligibilities.length,
        };
      })
    );

    return NextResponse.json(
      { bookingGroups: result },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Booking groups API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
