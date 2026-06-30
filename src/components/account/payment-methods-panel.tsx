"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AccountSectionCard } from "@/components/account/account-section-card";
import { BillingDetailsForm } from "@/components/account/billing-details-form";
import { PaymentEmptyState } from "@/components/account/payment-empty-state";
import { PaymentMethodCard } from "@/components/account/payment-method-card";
import { PaymentSetupNotice } from "@/components/account/payment-setup-notice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LocationOption {
  id: string;
  slug: string;
  marketName: string;
  locationName: string;
  stripePaymentsEnabled: boolean;
  stripePublishableKey: string | null;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

const stripePromiseCache: Record<string, Promise<Stripe | null>> = {};

function getStripePromise(publishableKey: string) {
  if (!stripePromiseCache[publishableKey]) {
    stripePromiseCache[publishableKey] = loadStripe(publishableKey);
  }
  return stripePromiseCache[publishableKey];
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
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedLocation = locations.find((l) => l.id === selectedLocationId) ?? null;

  const stripePromise = useMemo(
    () =>
      selectedLocation?.stripePublishableKey
        ? getStripePromise(selectedLocation.stripePublishableKey)
        : null,
    [selectedLocation?.stripePublishableKey]
  );

  useEffect(() => {
    fetch("/api/locations?paymentsEnabled=true")
      .then((res) => res.json())
      .then((data) => {
        const list = (data.locations ?? []) as LocationOption[];
        setLocations(list);
        if (list.length > 0) {
          setSelectedLocationId(list[0].id);
        }
      })
      .catch(() => setSetupError("Unable to load locations"));
  }, []);

  const loadPaymentMethods = useCallback(async () => {
    if (!selectedLocationId) return;

    setIsLoading(true);
    setSetupError(null);

    try {
      const response = await fetch(
        `/api/stripe/payment-methods?locationId=${encodeURIComponent(selectedLocationId)}`
      );
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
  }, [selectedLocationId]);

  const startAddCard = useCallback(async () => {
    if (!selectedLocationId) return;

    try {
      const response = await fetch("/api/stripe/setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId: selectedLocationId }),
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
  }, [selectedLocationId]);

  useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);

  async function handleRemove(paymentMethodId: string) {
    if (!selectedLocationId) return;

    try {
      const response = await fetch(
        `/api/stripe/payment-methods/${paymentMethodId}?locationId=${encodeURIComponent(selectedLocationId)}`,
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
      {locations.length > 1 ? (
        <AccountSectionCard
          title="Location"
          description="Saved cards are stored per location (each market has its own Stripe account)."
        >
          <div className="space-y-2">
            <Label htmlFor="payment-location">Market</Label>
            <select
              id="payment-location"
              className="w-full rounded-md border border-go-border bg-go-paper px-3 py-2 text-body-sm"
              value={selectedLocationId}
              onChange={(e) => {
                setSelectedLocationId(e.target.value);
                setShowAddForm(false);
                setClientSecret(null);
              }}
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.marketName} — {location.locationName}
                </option>
              ))}
            </select>
          </div>
        </AccountSectionCard>
      ) : null}

      {setupError ? <PaymentSetupNotice onRetry={loadPaymentMethods} /> : null}

      <AccountSectionCard
        title="Saved payment methods"
        description={
          selectedLocation
            ? `Cards for ${selectedLocation.marketName}. Cards saved here apply to bookings at this location only.`
            : "Cards saved here can be used when you confirm a booking."
        }
        actions={
          !showAddForm && !setupError && selectedLocationId ? (
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
      </AccountSectionCard>

      {showAddForm && clientSecret && stripePromise ? (
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
