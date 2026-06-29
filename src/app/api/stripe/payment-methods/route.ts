import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId) {
      return jsonOk({ paymentMethods: [] });
    }

    const stripe = getStripe();
    const paymentMethods = await stripe.paymentMethods.list({
      customer: dbUser.stripeCustomerId,
      type: "card",
    });

    return jsonOk({
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
