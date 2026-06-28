import type { Metadata } from "next";

import { CheckoutPageClient } from "./checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout — Go Car Rentals",
  description: "Complete your car rental reservation with protection and payment details.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
