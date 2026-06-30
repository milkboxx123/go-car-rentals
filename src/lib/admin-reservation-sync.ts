import { prisma } from "@/lib/prisma";

type CustomerReservation = {
  id: string;
  confirmationNumber: string;
  totalAmount: number;
  stripePaymentIntentId: string | null;
  pickupLocation: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
  vehicleId: string;
  userId: string;
};

type AdminPaymentStatus = "paid" | "failed" | "refunded" | "partially_refunded";

export async function syncAdminReservationFromCustomer(
  customerReservation: CustomerReservation,
  paymentStatus: AdminPaymentStatus
) {
  const user = await prisma.user.findUnique({ where: { id: customerReservation.userId } });
  if (!user) return;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: customerReservation.vehicleId },
    include: {
      eligibleGroups: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });

  const bookingGroupId = vehicle?.eligibleGroups[0]?.bookingGroupId;
  if (!bookingGroupId) return;

  const adminStatus = paymentStatus === "paid" ? "confirmed" : "pending";
  const paidAmount = paymentStatus === "paid" ? customerReservation.totalAmount : null;

  const existing = await prisma.$queryRaw<{ id: string }[]>`
    SELECT "id" FROM "Reservation"
    WHERE "customerReservationId" = ${customerReservation.id}
    LIMIT 1
  `;

  if (existing.length > 0) {
    await prisma.$executeRaw`
      UPDATE "Reservation"
      SET
        "paymentStatus" = ${paymentStatus}::"CustomerPaymentStatus",
        "stripePaymentIntentId" = ${customerReservation.stripePaymentIntentId},
        "paidAmountCents" = ${paidAmount},
        "status" = ${adminStatus}::"ReservationStatus",
        "updatedAt" = NOW()
      WHERE "id" = ${existing[0].id}
    `;
    return;
  }

  const adminId = `cr-${customerReservation.id}`;

  await prisma.$executeRaw`
    INSERT INTO "Reservation" (
      "id",
      "bookingGroupId",
      "locationId",
      "customerName",
      "customerEmail",
      "customerPhone",
      "pickupAt",
      "returnAt",
      "pickupLocationText",
      "status",
      "quotedTotalCents",
      "customerReservationId",
      "paymentStatus",
      "stripePaymentIntentId",
      "paidAmountCents",
      "source",
      "createdAt",
      "updatedAt"
    ) VALUES (
      ${adminId},
      ${bookingGroupId},
      ${customerReservation.locationId},
      ${`${user.firstName} ${user.lastName}`},
      ${user.email},
      ${user.phone},
      ${customerReservation.startDate},
      ${customerReservation.endDate},
      ${customerReservation.pickupLocation},
      ${adminStatus}::"ReservationStatus",
      ${customerReservation.totalAmount},
      ${customerReservation.id},
      ${paymentStatus}::"CustomerPaymentStatus",
      ${customerReservation.stripePaymentIntentId},
      ${paidAmount},
      ${"direct_website"}::"ReservationSource",
      NOW(),
      NOW()
    )
    ON CONFLICT ("customerReservationId") DO UPDATE SET
      "paymentStatus" = EXCLUDED."paymentStatus",
      "stripePaymentIntentId" = EXCLUDED."stripePaymentIntentId",
      "paidAmountCents" = EXCLUDED."paidAmountCents",
      "status" = EXCLUDED."status",
      "updatedAt" = NOW()
  `;
}
