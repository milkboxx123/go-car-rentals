import { z } from "zod";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { assertLocationPaymentsReady, getStripeForLocation } from "@/lib/stripe";
import { getOrCreateUserStripeCustomer } from "@/lib/stripe-customer";

const chargeSchema = z.object({
  reservationId: z.string().min(1),
  locationId: z.string().min(1),
  paymentMethodId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = chargeSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { reservationId, locationId, paymentMethodId } = parsed.data;

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

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: reservation.totalAmount,
        currency: "usd",
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        confirm: true,
        off_session: true,
        metadata: {
          reservationId: reservation.id,
          userId: user.id,
          locationId,
        },
      },
      { idempotencyKey: `charge-${reservation.id}` }
    );

    if (paymentIntent.status !== "succeeded") {
      return jsonError("Payment could not be completed", 402);
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return jsonOk({ reservation: updatedReservation });
  } catch (error) {
    console.error("Charge error:", error);
    return jsonError("Unable to process payment", 500);
  }
}
