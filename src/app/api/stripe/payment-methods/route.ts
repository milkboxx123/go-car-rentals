import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripeForLocation } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const locationId = request.nextUrl.searchParams.get("locationId");
    if (!locationId) {
      return jsonError("locationId is required");
    }

    const stripeCustomer = await prisma.userStripeCustomer.findUnique({
      where: { userId_locationId: { userId: user.id, locationId } },
    });

    if (!stripeCustomer) {
      return jsonOk({ paymentMethods: [] });
    }

    const stripe = await getStripeForLocation(locationId);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomer.stripeCustomerId,
      type: "card",
    });

    return jsonOk({
      locationId,
      paymentMethods: paymentMethods.data.map((method) => ({
        id: method.id,
        brand: method.card?.brand ?? "card",
        last4: method.card?.last4 ?? "",
        expMonth: method.card?.exp_month ?? 0,
        expYear: method.card?.exp_year ?? 0,
      })),
    });
  } catch (error) {
    console.error("List payment methods error:", error);
    return jsonError("Unable to load payment methods", 500);
  }
}
