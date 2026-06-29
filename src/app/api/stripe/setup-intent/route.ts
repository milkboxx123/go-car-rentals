import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const stripe = getStripe();
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return jsonError("User not found", 404);
    }

    let customerId = dbUser.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: `${dbUser.firstName} ${dbUser.lastName}`,
        phone: dbUser.phone,
        metadata: { userId: dbUser.id },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id: dbUser.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
      metadata: { userId: dbUser.id },
    });

    if (!setupIntent.client_secret) {
      return jsonError("Unable to initialize payment setup", 500);
    }

    return jsonOk({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Setup intent error:", error);
    return jsonError("Unable to initialize payment setup", 500);
  }
}
