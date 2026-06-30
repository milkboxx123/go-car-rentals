import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { decryptSecret } from "@/lib/stripe-credentials";

const stripeClients = new Map<string, Stripe>();

export type LocationStripeConfig = {
  id: string;
  slug: string;
  stripePublishableKey: string | null;
  stripeSecretKeyEncrypted: string | null;
  stripeWebhookSecretEncrypted: string | null;
  stripeAccountId: string | null;
  stripePaymentsEnabled: boolean;
};

export async function getLocationStripeConfig(
  locationId: string
): Promise<LocationStripeConfig | null> {
  return prisma.location.findUnique({
    where: { id: locationId },
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
}

export async function getLocationStripeConfigBySlug(
  slug: string
): Promise<LocationStripeConfig | null> {
  return prisma.location.findUnique({
    where: { slug },
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
}

export function assertLocationPaymentsReady(location: LocationStripeConfig): void {
  if (
    !location.stripePaymentsEnabled ||
    !location.stripePublishableKey ||
    !location.stripeSecretKeyEncrypted
  ) {
    throw new Error("Payments are not enabled for this location");
  }
}

export async function getStripeForLocation(locationId: string): Promise<Stripe> {
  const cached = stripeClients.get(locationId);
  if (cached) return cached;

  const location = await getLocationStripeConfig(locationId);
  if (!location?.stripeSecretKeyEncrypted) {
    throw new Error("Stripe is not configured for this location");
  }

  const secretKey = decryptSecret(location.stripeSecretKeyEncrypted);
  const client = new Stripe(secretKey);
  stripeClients.set(locationId, client);
  return client;
}

export async function getLocationStripePublishableKey(
  locationId: string
): Promise<string> {
  const location = await getLocationStripeConfig(locationId);
  assertLocationPaymentsReady(location!);
  return location!.stripePublishableKey!;
}

export function clearStripeClientCache(locationId?: string): void {
  if (locationId) {
    stripeClients.delete(locationId);
    return;
  }
  stripeClients.clear();
}

// Legacy singleton — avoid in new code; kept for gradual migration.
export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(secretKey);
}
