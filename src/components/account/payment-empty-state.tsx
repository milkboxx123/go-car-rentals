"use client";

import { CreditCard } from "lucide-react";

import { AccountEmptyState } from "@/components/account/account-empty-state";
import { Button } from "@/components/ui/button";

export interface PaymentEmptyStateProps {
  onAddCard?: () => void;
}

export function PaymentEmptyState({ onAddCard }: PaymentEmptyStateProps) {
  return (
    <AccountEmptyState
      icon={<CreditCard className="size-6" aria-hidden="true" />}
      title="No saved payment methods"
      description="Add a card to make future bookings faster. Your payment details are securely handled by the payment provider."
      primaryAction={
        onAddCard
          ? { label: "Add card", onClick: onAddCard }
          : undefined
      }
    />
  );
}
