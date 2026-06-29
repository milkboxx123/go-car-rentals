"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AccountSectionCard } from "@/components/account/account-section-card";
import { BillingDetailsForm } from "@/components/account/billing-details-form";
import { PaymentEmptyState } from "@/components/account/payment-empty-state";
import { PaymentMethodCard } from "@/components/account/payment-method-card";
import { PaymentSetupNotice } from "@/components/account/payment-setup-notice";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

function AddCardForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    try {
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/account/payment`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message ?? "Unable to save card");
        return;
      }

      toast.success("Card saved");
      onSuccess();
    } catch {
      toast.error("Unable to save card");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? "Saving..." : "Save card"}
      </Button>
    </form>
  );
}

export function PaymentMethodsPanel() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadPaymentMethods = useCallback(async () => {
    setIsLoading(true);
    setSetupError(null);

    try {
      const response = await fetch("/api/stripe/payment-methods");
      const data = await response.json();

      if (!response.ok) {
        setSetupError(data.error ?? "Unable to load payment methods");
        return;
      }

      setPaymentMethods(data.paymentMethods);
    } catch {
      setSetupError("Unable to load payment methods");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startAddCard = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe/setup-intent", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to start card setup");
        return;
      }

      setClientSecret(data.clientSecret);
      setShowAddForm(true);
    } catch {
      toast.error("Unable to start card setup");
    }
  }, []);

  useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);

  async function handleRemove(paymentMethodId: string) {
    try {
      const response = await fetch(
        `/api/stripe/payment-methods/${paymentMethodId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Unable to remove card");
        return;
      }

      toast.success("Card removed");
      loadPaymentMethods();
    } catch {
      toast.error("Unable to remove card");
    }
  }

  function handleAddSuccess() {
    setShowAddForm(false);
    setClientSecret(null);
    loadPaymentMethods();
  }

  return (
    <div className="max-w-3xl space-y-6">
      {setupError ? (
        <PaymentSetupNotice onRetry={loadPaymentMethods} />
      ) : null}

      <AccountSectionCard
        title="Saved payment methods"
        description="Cards saved here can be used when you confirm a booking."
        actions={
          !showAddForm && !setupError ? (
            <Button type="button" variant="outline" onClick={startAddCard}>
              Add card
            </Button>
          ) : null
        }
      >
        {isLoading ? (
          <p className="text-body-sm text-go-muted">Loading payment methods...</p>
        ) : paymentMethods.length === 0 ? (
          <PaymentEmptyState onAddCard={setupError ? undefined : startAddCard} />
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard
                key={method.id}
                {...method}
                isDefault={index === 0}
                onRemove={handleRemove}
                onSetDefault={() => {
                  toast.message("Set as default coming soon");
                }}
              />
            ))}
          </div>
        )}
        {!isLoading && paymentMethods.length === 0 ? (
          <p className="mt-4 text-center text-body-sm text-go-muted">
            You can also add a payment method during checkout.
          </p>
        ) : null}
      </AccountSectionCard>

      {showAddForm && clientSecret ? (
        <AccountSectionCard title="Add a card">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <AddCardForm onSuccess={handleAddSuccess} />
          </Elements>
        </AccountSectionCard>
      ) : null}

      <AccountSectionCard
        title="Billing details"
        description="Optional billing information for receipts and invoices."
      >
        <BillingDetailsForm />
      </AccountSectionCard>

      <div className="flex flex-col gap-3 rounded-2xl border border-go-border bg-go-paper p-5 text-body-sm text-go-muted shadow-card sm:flex-row sm:items-center sm:gap-6 md:p-6">
        <div className="flex items-center gap-2 text-go-ink">
          <ShieldCheck className="size-5 text-go-success" aria-hidden="true" />
          <span className="font-medium">Secure payment processing</span>
        </div>
        <span>Cards encrypted by provider</span>
        <span>Final charges shown before confirmation</span>
      </div>
    </div>
  );
}
