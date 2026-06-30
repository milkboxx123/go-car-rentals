"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import {
  CheckoutSteps,
  PickupMethodSelector,
  PriceBreakdown,
  TripSummaryCard,
} from "@/components/booking";
import { CheckoutPaymentSection } from "@/components/booking/checkout-payment-section";
import { Button } from "@/components/ui/button";
import type { PickupMethod, Reservation } from "@/types";

const STEPS = [
  { id: "dates", label: "Dates" },
  { id: "pickup", label: "Pickup" },
  { id: "protection", label: "Protection" },
  { id: "payment", label: "Payment" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

type ProtectionPlan = "basic" | "standard" | "premium";

const PROTECTION_RATES: Record<ProtectionPlan, number> = {
  basic: 0,
  standard: 18,
  premium: 32,
};

export function CheckoutPageClient() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = React.useState<StepId>("protection");
  const [pickupMethod, setPickupMethod] = React.useState<PickupMethod>("airport");
  const [protectionPlan, setProtectionPlan] = React.useState<ProtectionPlan>("standard");
  const [locationMeta, setLocationMeta] = React.useState<{
    id: string;
    slug: string;
    marketName: string;
    locationName: string;
    city: string;
    state: string;
  } | null>(null);

  const locationSlug = searchParams.get("location") ?? "tampa";
  const vehicleId = searchParams.get("vehicleId") ?? "";
  const bookingGroupId = searchParams.get("bookingGroupId") ?? "";
  const startDate =
    searchParams.get("startDate") ?? new Date(Date.now() + 7 * 86400000).toISOString();
  const endDate =
    searchParams.get("endDate") ?? new Date(Date.now() + 11 * 86400000).toISOString();
  const dailyRate = Number(searchParams.get("dailyRate") ?? 72);

  React.useEffect(() => {
    fetch(`/api/locations/${locationSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.location) setLocationMeta(data.location);
      })
      .catch(() => undefined);
  }, [locationSlug]);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  const protectionRate = PROTECTION_RATES[protectionPlan];
  const subtotal = dailyRate * days;
  const protectionTotal = protectionRate * days;
  const taxes = (subtotal + protectionTotal) * 0.15;
  const total = subtotal + protectionTotal + taxes;

  const pickupLocation =
    locationMeta != null
      ? `${locationMeta.locationName}, ${locationMeta.city}, ${locationMeta.state} (${pickupMethod})`
      : `${locationSlug} (${pickupMethod})`;

  const tripSummary: Reservation = {
    id: "checkout-draft",
    confirmationNumber: "Pending",
    vehicleId: vehicleId || "pending",
    locationId: locationMeta?.id ?? "",
    status: "pending",
    pickupMethod,
    pickupLocation,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    startTime: "10:00",
    endTime: "10:00",
    dailyRate,
    totalDays: days,
    subtotal,
    taxes,
    total,
    guest: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    createdAt: new Date().toISOString(),
    paymentStatus: "pending",
  };

  const goNext = () => {
    const index = STEPS.findIndex((step) => step.id === currentStep);
    if (index < STEPS.length - 1) {
      setCurrentStep(STEPS[index + 1].id);
    }
  };

  const goBack = () => {
    const index = STEPS.findIndex((step) => step.id === currentStep);
    if (index > 0) {
      setCurrentStep(STEPS[index - 1].id);
    }
  };

  const canProceedToPayment =
    !!vehicleId && !!bookingGroupId && !!locationMeta?.id && !!startDate && !!endDate;

  return (
    <div className="min-h-screen bg-go-cream pb-24">
      <div className="container-marketing py-6">
        <header className="mb-8 space-y-2">
          <h1 className="text-heading-lg font-bold text-go-ink">Checkout</h1>
          <p className="text-body-md text-go-muted">
            Complete your reservation in a few quick steps.
            {locationMeta ? ` · ${locationMeta.marketName ?? locationMeta.city}` : null}
          </p>
        </header>

        <CheckoutSteps currentStep={currentStep} className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-6">
            {currentStep === "dates" && (
              <section className="rounded-xl border border-go-border bg-go-paper p-6">
                <h2 className="text-heading-sm font-bold text-go-ink">Trip dates</h2>
                <p className="mt-1 text-body-sm text-go-muted">
                  {start.toLocaleDateString()} – {end.toLocaleDateString()} · {days} days
                </p>
              </section>
            )}

            {currentStep === "pickup" && (
              <section className="rounded-xl border border-go-border bg-go-paper p-6">
                <PickupMethodSelector
                  value={pickupMethod}
                  onChange={setPickupMethod}
                  availableMethods={["airport", "delivery", "lot"]}
                />
              </section>
            )}

            {currentStep === "protection" && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-heading-sm font-bold text-go-ink">Choose protection</h2>
                  <p className="mt-1 text-body-sm text-go-muted">
                    All rentals include basic liability coverage.
                  </p>
                </div>
                <div className="grid gap-3">
                  {(
                    [
                      { id: "basic", label: "Basic", price: 0 },
                      { id: "standard", label: "Standard", price: 18 },
                      { id: "premium", label: "Premium", price: 32 },
                    ] as const
                  ).map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setProtectionPlan(plan.id)}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        protectionPlan === plan.id
                          ? "border-go-ink bg-go-paper"
                          : "border-go-border bg-go-paper hover:border-go-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-go-ink">{plan.label}</span>
                        <span className="text-body-sm text-go-muted">
                          {plan.price === 0 ? "Included" : `$${plan.price}/day`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {currentStep === "payment" && (
              <section className="space-y-4 rounded-xl border border-go-border bg-go-paper p-6">
                <h2 className="text-heading-sm font-bold text-go-ink">Payment</h2>
                {!canProceedToPayment ? (
                  <p className="text-body-sm text-destructive">
                    Missing booking details. Start from search with a vehicle and dates selected.
                  </p>
                ) : (
                  <CheckoutPaymentSection
                    locationId={locationMeta!.id}
                    locationSlug={locationSlug}
                    vehicleId={vehicleId}
                    bookingGroupId={bookingGroupId}
                    startDate={startDate}
                    endDate={endDate}
                    pickupLocation={pickupLocation}
                    protectionPlan={protectionPlan}
                    onBack={goBack}
                  />
                )}
              </section>
            )}

            {currentStep !== "payment" && (
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={currentStep === STEPS[0].id}
                >
                  Back
                </Button>
                <Button onClick={goNext} disabled={currentStep === "protection" && !locationMeta}>
                  Continue
                </Button>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <TripSummaryCard reservation={tripSummary} />
            <div className="rounded-xl border border-go-border bg-go-paper p-5 shadow-card">
              <h2 className="mb-4 text-heading-sm font-bold text-go-ink">Price breakdown</h2>
              <PriceBreakdown
                items={[
                  { label: `${days} days × $${dailyRate}`, amount: subtotal },
                  { label: "Protection", amount: protectionTotal },
                  { label: "Taxes & fees", amount: taxes },
                ]}
                total={total}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
