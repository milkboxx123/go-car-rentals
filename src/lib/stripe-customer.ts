import { prisma } from "@/lib/prisma";
import { getStripeForLocation } from "@/lib/stripe";

export async function getOrCreateUserStripeCustomer(
  userId: string,
  locationId: string
): Promise<string> {
  const existing = await prisma.userStripeCustomer.findUnique({
    where: { userId_locationId: { userId, locationId } },
  });

  if (existing) {
    return existing.stripeCustomerId;
  }

  const [user, stripe] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    getStripeForLocation(locationId),
  ]);

  const customer = await stripe.customers.create({
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    phone: user.phone,
    metadata: { userId: user.id, locationId },
  });

  await prisma.userStripeCustomer.create({
    data: {
      userId,
      locationId,
      stripeCustomerId: customer.id,
    },
  });

  return customer.id;
}
