"use client";

import * as React from "react";

import {
  CheckoutSteps,
  PickupMethodSelector,
  PriceBreakdown,
  ProtectionPlanList,
  TripSummaryCard,
} from "@/components/booking";
import { TextInput } from "@/components/go/forms";
import { AppHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getVehicleById, reservations } from "@/mock";
import type { PickupMethod } from "@/types";

const STEPS = [
  { id: "dates", label: "Dates" },
  { id: "pickup", label: "Pickup" },
  { id: "protection", label: "Protection" },
  { id: "payment", label: "Payment" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const DEFAULT_VEHICLE_ID = "veh-rav4-2024";

export function CheckoutPageClient() {
  const [currentStep, setCurrentStep] = React.useState<StepId>("protection");
  const [pickupMethod, setPickupMethod] = React.useState<PickupMethod>("airport");
  const [protectionPlan, setProtectionPlan] = React.useState("standard");

  const vehicle = getVehicleById(DEFAULT_VEHICLE_ID);
  const reservation = reservations[0];
  const days = reservation?.totalDays ?? 4;
  const dailyRate = vehicle?.dailyRate ?? 72;
  const subtotal = dailyRate * days;
  const protectionRate = protectionPlan === "premium" ? 32 : protectionPlan === "standard" ? 18 : 0;
  const protectionTotal = protectionRate * days;
  const taxes = (subtotal + protectionTotal) * 0.15;
  const total = subtotal + protectionTotal + taxes;

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

  return (
    <div className="min-h-screen bg-go-cream pb-24">
      <AppHeader userName="Sarah Mitchell" userInitials="SM" />

      <div className="container-marketing py-6">
        <header className="mb-8 space-y-2">
          <h1 className="text-heading-lg font-bold text-go-ink">Checkout</h1>
          <p className="text-body-md text-go-muted">
            Complete your reservation in a few quick steps.
          </p>
        </header>

        <CheckoutSteps currentStep={currentStep} className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-6">
            {currentStep === "dates" && (
              <section className="rounded-xl border border-go-border bg-go-paper p-6">
                <h2 className="text-heading-sm font-bold text-go-ink">Trip dates</h2>
                <p className="mt-1 text-body-sm text-go-muted">
                  Jul 10 – Jul 14, 2026 · 4 days
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
                  <h2 className="text-heading-sm font-bold text-go-ink">
                    Choose protection
                  </h2>
                  <p className="mt-1 text-body-sm text-go-muted">
                    All rentals include basic liability coverage.
                  </p>
                </div>
                <ProtectionPlanList
                  selectedId={protectionPlan}
                  onSelect={setProtectionPlan}
                />
              </section>
            )}

            {currentStep === "payment" && (
              <section className="space-y-4 rounded-xl border border-go-border bg-go-paper p-6">
                <h2 className="text-heading-sm font-bold text-go-ink">Driver details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput label="First name" defaultValue="Sarah" />
                  <TextInput label="Last name" defaultValue="Mitchell" />
                  <TextInput
                    label="Email"
                    type="email"
                    defaultValue="sarah.mitchell@email.com"
                    containerClassName="sm:col-span-2"
                  />
                  <TextInput
                    label="Phone"
                    type="tel"
                    defaultValue="+1 (813) 555-0142"
                    containerClassName="sm:col-span-2"
                  />
                </div>
                <Separator />
                <h3 className="text-label text-go-ink">Payment</h3>
                <TextInput label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput label="Expiration" placeholder="MM / YY" />
                  <TextInput label="CVC" placeholder="123" />
                </div>
              </section>
            )}

            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentStep === STEPS[0].id}
              >
                Back
              </Button>
              <Button onClick={goNext}>
                {currentStep === "payment" ? "Confirm reservation" : "Continue"}
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            {reservation && <TripSummaryCard reservation={reservation} />}
            <div className="rounded-xl border border-go-border bg-go-paper p-5 shadow-card">
              <h2 className="mb-4 text-heading-sm font-bold text-go-ink">Price breakdown</h2>
              <PriceBreakdown
                items={[
                  {
                    label: `${days} days × ${vehicle ? `$${dailyRate}` : "rate"}`,
                    amount: subtotal,
                  },
                  {
                    label: "Protection",
                    amount: protectionTotal,
                  },
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
