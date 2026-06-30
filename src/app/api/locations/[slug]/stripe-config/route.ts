import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";
import { assertLocationPaymentsReady } from "@/lib/stripe";

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
        stripePublishableKey: true,
        stripeSecretKeyEncrypted: true,
        stripeWebhookSecretEncrypted: true,
        stripeAccountId: true,
        stripePaymentsEnabled: true,
      },
    });

    if (!location) {
      return jsonError("Location not found", 404);
    }

    try {
      assertLocationPaymentsReady(location);
    } catch {
      return jsonError("Payments are not enabled for this location", 503);
    }

    return jsonOk({
      locationId: location.id,
      slug: location.slug,
      publishableKey: location.stripePublishableKey,
      paymentsEnabled: location.stripePaymentsEnabled,
    });
  } catch (error) {
    console.error("Stripe config error:", error);
    return jsonError("Unable to load payment configuration", 500);
  }
}
