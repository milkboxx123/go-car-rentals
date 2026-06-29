import { z } from "zod";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const chargeSchema = z.object({
  reservationId: z.string().min(1),
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

    const { reservationId, paymentMethodId } = parsed.data;

    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId, userId: user.id },
    });

    if (!reservation) {
      return jsonError("Reservation not found", 404);
    }

    if (reservation.status !== "PENDING") {
      return jsonError("This reservation has already been processed", 400);
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId) {
      return jsonError("No payment method on file", 400);
    }

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reservation.totalAmount,
      currency: "usd",
      customer: dbUser.stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
      metadata: {
        reservationId: reservation.id,
        userId: user.id,
      },
    });

    if (paymentIntent.status !== "succeeded") {
      return jsonError("Payment could not be completed", 402);
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        status: "CONFIRMED",
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return jsonOk({ reservation: updatedReservation });
  } catch (error) {
    console.error("Charge error:", error);
    return jsonError("Unable to process payment", 500);
  }
}
