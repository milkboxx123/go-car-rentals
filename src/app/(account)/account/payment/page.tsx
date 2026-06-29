import type { Metadata } from "next";

import { AccountPageHeader } from "@/components/account/account-page-header";
import { PaymentMethodsPanel } from "@/components/account/payment-methods-panel";

export const metadata: Metadata = {
  title: "Payment",
  description: "Manage saved payment methods for Go Car Rentals.",
};

export default function AccountPaymentPage() {
  return (
    <div>
      <AccountPageHeader
        title="Payment"
        description="Manage saved cards and payment methods for faster checkout."
      />
      <PaymentMethodsPanel />
    </div>
  );
}
