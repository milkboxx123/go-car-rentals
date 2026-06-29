import type { Metadata } from "next";

import { Footer } from "@/components/layout";
import { AppHeaderShell } from "@/components/layout/app-header-shell";
import { CheckoutPageClient } from "./checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout — Go Car Rentals",
  description: "Complete your car rental reservation with protection and payment details.",
};

export default function CheckoutPage() {
  return (
    <>
      <AppHeaderShell />
      <CheckoutPageClient />
      <Footer />
    </>
  );
}
