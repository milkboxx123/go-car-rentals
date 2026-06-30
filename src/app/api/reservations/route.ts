import { NextRequest } from "next/server";
import { z } from "zod";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import {
  calculateRentalDays,
  calculateReservationTotalCents,
  generateConfirmationNumber,
} from "@/lib/reservation-pricing";
import { assertLocationPaymentsReady, getStripeForLocation } from "@/lib/stripe";
import { getOrCreateUserStripeCustomer } from "@/lib/stripe-customer";

const createSchema = z.object({
  vehicleId: z.string().min(1),
  bookingGroupId: z.string().min(1),
  locationId: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  pickupLocation: z.string().min(1),
  protectionPlan: z.enum(["basic", "standard", "premium"]).default("standard"),
});

const PROTECTION_RATES: Record<string, number> = {
  basic: 0,
  standard: 1800,
  premium: 3200,
};

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const {
      vehicleId,
      bookingGroupId,
      locationId,
      startDate,
      endDate,
      pickupLocation,
      protectionPlan,
    } = parsed.data;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      return jsonError("End date must be after start date");
    }

    const [location, vehicle, bookingGroup] = await Promise.all([
      prisma.location.findUnique({ where: { id: locationId } }),
      prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: {
          eligibleGroups: { where: { bookingGroupId } },
        },
      }),
      prisma.bookingGroup.findUnique({ where: { id: bookingGroupId } }),
    ]);

    if (!location?.isActive) {
      return jsonError("Location not found", 404);
    }

    try {
      assertLocationPaymentsReady(location);
    } catch {
      return jsonError("Payments are not enabled for this location", 503);
    }

    if (!vehicle || vehicle.eligibleGroups.length === 0) {
      return jsonError("Vehicle not available for this booking group", 404);
    }

    if (!bookingGroup?.isActive) {
      return jsonError("Booking group not found", 404);
    }

    if (bookingGroup.locationId && bookingGroup.locationId !== locationId) {
      return jsonError("Booking group is not available at this location", 400);
    }

    if (vehicle.locationId && vehicle.locationId !== locationId) {
      return jsonError("Vehicle is not available at this location", 400);
    }

    const days = calculateRentalDays(start, end);
    if (bookingGroup.minDays && days < bookingGroup.minDays) {
      return jsonError(`Minimum rental is ${bookingGroup.minDays} days`);
    }
    if (bookingGroup.maxDays && days > bookingGroup.maxDays) {
      return jsonError(`Maximum rental is ${bookingGroup.maxDays} days`);
    }

    const totalAmount = calculateReservationTotalCents({
      dailyRateCents: bookingGroup.startingDailyRateCents,
      days,
      protectionPerDayCents: PROTECTION_RATES[protectionPlan] ?? 0,
    });

    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        vehicleId,
        locationId,
        confirmationNumber: generateConfirmationNumber(),
        pickupLocation,
        startDate: start,
        endDate: end,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
    });

    return jsonOk({ reservation });
  } catch (error) {
    console.error("Create reservation error:", error);
    return jsonError("Unable to create reservation", 500);
  }
}

const paymentIntentSchema = z.object({
  reservationId: z.string().min(1),
  locationId: z.string().min(1),
});

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = paymentIntentSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { reservationId, locationId } = parsed.data;

    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId, userId: user.id, locationId },
    });

    if (!reservation) {
      return jsonError("Reservation not found", 404);
    }

    if (reservation.paymentStatus === "PAID") {
      return jsonError("This reservation has already been paid", 400);
    }

    const location = await prisma.location.findUnique({ where: { id: locationId } });
    if (!location) {
      return jsonError("Location not found", 404);
    }

    assertLocationPaymentsReady(location);

    const stripeCustomerId = await getOrCreateUserStripeCustomer(user.id, locationId);
    const stripe = await getStripeForLocation(locationId);

    const vehicleWithGroup = await prisma.vehicle.findUnique({
      where: { id: reservation.vehicleId },
      include: {
        eligibleGroups: {
          include: { bookingGroup: true },
          take: 1,
        },
      },
    });

    const depositCents = vehicleWithGroup?.eligibleGroups[0]?.bookingGroup.depositCents ?? 0;

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: reservation.totalAmount,
        currency: "usd",
        customer: stripeCustomerId,
        metadata: {
          reservationId: reservation.id,
          userId: user.id,
          locationId,
          confirmationNumber: reservation.confirmationNumber,
          ...(depositCents > 0 ? { depositCents: String(depositCents) } : {}),
        },
        automatic_payment_methods: { enabled: true },
      },
      { idempotencyKey: `pi-${reservation.id}` }
    );

    let depositPaymentIntentId: string | null = null;

    if (depositCents > 0) {
      const depositIntent = await stripe.paymentIntents.create(
        {
          amount: depositCents,
          currency: "usd",
          customer: stripeCustomerId,
          capture_method: "manual",
          metadata: {
            reservationId: reservation.id,
            userId: user.id,
            locationId,
            type: "deposit",
          },
          automatic_payment_methods: { enabled: true },
        },
        { idempotencyKey: `deposit-${reservation.id}` }
      );
      depositPaymentIntentId = depositIntent.id;
    }

    await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        stripePaymentIntentId: paymentIntent.id,
        stripeDepositPaymentIntentId: depositPaymentIntentId,
      },
    });

    if (!paymentIntent.client_secret) {
      return jsonError("Unable to initialize payment", 500);
    }

    return jsonOk({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      depositPaymentIntentId,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return jsonError("Unable to initialize payment", 500);
  }
}
