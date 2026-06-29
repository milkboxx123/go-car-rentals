import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const { id } = await context.params;
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId) {
      return jsonError("Payment method not found", 404);
    }

    const stripe = getStripe();
    const paymentMethod = await stripe.paymentMethods.retrieve(id);

    if (paymentMethod.customer !== dbUser.stripeCustomerId) {
      return jsonError("Payment method not found", 404);
    }

    await stripe.paymentMethods.detach(id);

    return jsonOk({ success: true });
  } catch (error) {
    console.error("Delete payment method error:", error);
    return jsonError("Unable to remove payment method", 500);
  }
}
