import { NextRequest } from "next/server";
import type Stripe from "stripe";

import { syncAdminReservationFromCustomer } from "@/lib/admin-reservation-sync";
import { prisma } from "@/lib/prisma";
import { decryptSecret } from "@/lib/stripe-credentials";
import { getStripeForLocation } from "@/lib/stripe";

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
  locationId: string
) {
  const reservationId = paymentIntent.metadata.reservationId;
  if (!reservationId) return;

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation || reservation.locationId !== locationId) return;
  if (reservation.paymentStatus === "PAID") return;

  const updated = await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      paymentStatus: "PAID",
      status: "CONFIRMED",
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  await syncAdminReservationFromCustomer(updated, "paid");
}

async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent,
  locationId: string
) {
  const reservationId = paymentIntent.metadata.reservationId;
  if (!reservationId) return;

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });
  if (!reservation || reservation.locationId !== locationId) return;

  const updated = await prisma.reservation.update({
    where: { id: reservationId },
    data: { paymentStatus: "FAILED" },
  });

  await syncAdminReservationFromCustomer(updated, "failed");
}

async function handleChargeRefunded(charge: Stripe.Charge, locationId: string) {
  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;

  if (!paymentIntentId) return;

  const reservation = await prisma.reservation.findFirst({
    where: { stripePaymentIntentId: paymentIntentId, locationId },
  });

  if (!reservation) return;

  const isFullRefund = charge.amount_refunded >= charge.amount;
  const paymentStatus = isFullRefund ? "REFUNDED" : "PARTIALLY_REFUNDED";

  const updated = await prisma.reservation.update({
    where: { id: reservation.id },
    data: {
      paymentStatus,
      status: isFullRefund ? "CANCELLED" : reservation.status,
    },
  });

  await syncAdminReservationFromCustomer(
    updated,
    isFullRefund ? "refunded" : "partially_refunded"
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locationSlug: string }> }
) {
  const { locationSlug } = await params;

  const location = await prisma.location.findUnique({
    where: { slug: locationSlug },
  });

  if (!location?.stripeWebhookSecretEncrypted) {
    return new Response("Webhook not configured", { status: 404 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = decryptSecret(location.stripeWebhookSecretEncrypted);
    const stripe = await getStripeForLocation(location.id);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new Response("Invalid signature", { status: 400 });
  }

  const existing = await prisma.stripeWebhookEvent.findUnique({
    where: { id: event.id },
  });

  if (existing) {
    return new Response("OK", { status: 200 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent,
          location.id
        );
        break;
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent,
          location.id
        );
        break;
      case "charge.refunded":
        await handleChargeRefunded(event.data.object as Stripe.Charge, location.id);
        break;
      default:
        break;
    }

    await prisma.stripeWebhookEvent.create({
      data: {
        id: event.id,
        locationId: location.id,
        eventType: event.type,
      },
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
