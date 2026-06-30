import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripeForLocation } from "@/lib/stripe";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const locationId = request.nextUrl.searchParams.get("locationId");
    if (!locationId) {
      return jsonError("locationId is required");
    }

    const { id } = await context.params;

    const stripeCustomer = await prisma.userStripeCustomer.findUnique({
      where: { userId_locationId: { userId: user.id, locationId } },
    });

    if (!stripeCustomer) {
      return jsonError("Payment method not found", 404);
    }

    const stripe = await getStripeForLocation(locationId);
    const paymentMethod = await stripe.paymentMethods.retrieve(id);

    if (paymentMethod.customer !== stripeCustomer.stripeCustomerId) {
      return jsonError("Payment method not found", 404);
    }

    await stripe.paymentMethods.detach(id);

    return jsonOk({ success: true });
  } catch (error) {
    console.error("Delete payment method error:", error);
    return jsonError("Unable to remove payment method", 500);
  }
}
