import { z } from "zod";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { assertLocationPaymentsReady, getStripeForLocation } from "@/lib/stripe";
import { getOrCreateUserStripeCustomer } from "@/lib/stripe-customer";

const bodySchema = z.object({
  locationId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message ?? "Invalid input");
    }

    const { locationId } = parsed.data;

    const location = await prisma.location.findUnique({ where: { id: locationId } });
    if (!location) {
      return jsonError("Location not found", 404);
    }

    try {
      assertLocationPaymentsReady(location);
    } catch {
      return jsonError("Payments are not enabled for this location", 503);
    }

    const stripeCustomerId = await getOrCreateUserStripeCustomer(user.id, locationId);
    const stripe = await getStripeForLocation(locationId);

    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      metadata: { userId: user.id, locationId },
    });

    if (!setupIntent.client_secret) {
      return jsonError("Unable to initialize payment setup", 500);
    }

    return jsonOk({ clientSecret: setupIntent.client_secret, locationId });
  } catch (error) {
    console.error("Setup intent error:", error);
    return jsonError("Unable to initialize payment setup", 500);
  }
}
