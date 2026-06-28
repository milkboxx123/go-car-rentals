"use client";

import * as React from "react";

import {
  BookingCard,
  CheckoutSteps,
  EmptyState,
  ExtrasSelector,
  FiltersEmpty,
  NoReservations,
  NoSearchResults,
  NoVehiclesFound,
  PickupMethodSelector,
  PriceBreakdown,
  ProtectionPlanCard,
  ProtectionPlanList,
  ReservationStatusBadge,
  TripSummaryCard,
  VehicleCard,
  VehicleCardSkeleton,
  VehicleDetailHeader,
  VehicleImageGallery,
  VehicleSpecsGrid,
} from "@/components/booking";
import { DsPreview, DsSection, DsSubsection } from "@/components/design-system";
import { reservations, vehicles } from "@/mock";
import type { ReservationStatus } from "@/types";

const vehicle = vehicles[0];
const reservation = reservations[0];

const priceItems = [
  {
    label: `${reservation.totalDays} days × $${reservation.dailyRate}`,
    amount: reservation.subtotal,
  },
  ...(reservation.deliveryFee
    ? [{ label: "Delivery fee", amount: reservation.deliveryFee }]
    : []),
  { label: "Taxes & fees", amount: reservation.taxes },
];

const allStatuses = Array.from(
  new Set(reservations.map((r) => r.status))
) as ReservationStatus[];

export function BookingSection() {
  const [pickupMethod, setPickupMethod] = React.useState<
    "airport" | "delivery" | "lot" | "hotel" | "custom-address"
  >("airport");
  const [selectedPlan, setSelectedPlan] = React.useState("standard");

  return (
    <>
      <DsSection
        id="vehicle-card"
        title="VehicleCard"
        description="Vehicle listing card in grid, compact, carousel, and skeleton variants."
        importPath='import { VehicleCard, VehicleCardSkeleton } from "@/components/booking"'
      >
        <DsSubsection title="Grid">
          <DsPreview>
            <div className="max-w-sm">
              <VehicleCard
                vehicle={vehicle}
                href={`/vehicles/${vehicle.id}`}
                variant="grid"
              />
            </div>
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Compact">
          <DsPreview>
            <VehicleCard
              vehicle={vehicle}
              href={`/vehicles/${vehicle.id}`}
              variant="compact"
            />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Carousel">
          <DsPreview>
            <VehicleCard
              vehicle={vehicle}
              href={`/vehicles/${vehicle.id}`}
              variant="carousel"
            />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Skeleton">
          <DsPreview>
            <div className="grid max-w-sm gap-4 sm:grid-cols-2">
              <VehicleCardSkeleton variant="grid" />
              <VehicleCardSkeleton variant="compact" />
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="vehicle-image-gallery"
        title="VehicleImageGallery"
        description="Primary image with thumbnail navigation."
        importPath='import { VehicleImageGallery } from "@/components/booking"'
      >
        <DsPreview>
          <VehicleImageGallery images={vehicle.images} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="vehicle-detail-header"
        title="VehicleDetailHeader"
        description="Vehicle title, badges, rating, and location."
        importPath='import { VehicleDetailHeader } from "@/components/booking"'
      >
        <DsPreview>
          <VehicleDetailHeader vehicle={vehicle} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="vehicle-specs-grid"
        title="VehicleSpecsGrid"
        description="Key vehicle specifications in a responsive grid."
        importPath='import { VehicleSpecsGrid } from "@/components/booking"'
      >
        <DsPreview>
          <VehicleSpecsGrid vehicle={vehicle} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="booking-card"
        title="BookingCard"
        description="Sticky sidebar and mobile bottom bar booking CTAs."
        importPath='import { BookingCard } from "@/components/booking"'
      >
        <DsSubsection title="Sticky">
          <DsPreview>
            <div className="max-w-xs">
              <BookingCard
                dailyRate={vehicle.dailyRate}
                tripTotal={vehicle.tripTotal}
                days={4}
              />
            </div>
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Mobile">
          <DsPreview className="relative min-h-[5rem]">
            <BookingCard
              layout="mobile"
              dailyRate={vehicle.dailyRate}
              tripTotal={vehicle.tripTotal}
              days={4}
            />
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="price-breakdown"
        title="PriceBreakdown"
        description="Line-item price summary with total."
        importPath='import { PriceBreakdown } from "@/components/booking"'
      >
        <DsPreview>
          <div className="max-w-sm">
            <PriceBreakdown items={priceItems} total={reservation.total} />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="pickup-method-selector"
        title="PickupMethodSelector"
        description="Radio group for lot, airport, delivery, and hotel pickup."
        importPath='import { PickupMethodSelector } from "@/components/booking"'
      >
        <DsPreview>
          <PickupMethodSelector
            value={pickupMethod}
            onChange={setPickupMethod}
            availableMethods={["lot", "airport", "delivery", "hotel"]}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="protection-plan-card"
        title="ProtectionPlanCard"
        description="Individual protection plan card and selectable plan list."
        importPath='import { ProtectionPlanCard, ProtectionPlanList } from "@/components/booking"'
      >
        <DsSubsection title="Single card">
          <DsPreview>
            <div className="max-w-md">
              <ProtectionPlanCard
                plan={{
                  id: "standard",
                  name: "Standard protection",
                  description: "Collision and comprehensive with reduced deductible.",
                  dailyRate: 18,
                  recommended: true,
                  features: [
                    "Collision damage waiver",
                    "$500 deductible",
                    "Roadside assistance",
                  ],
                }}
                selected
              />
            </div>
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Plan list">
          <DsPreview>
            <div className="max-w-lg">
              <ProtectionPlanList
                selectedId={selectedPlan}
                onSelect={setSelectedPlan}
              />
            </div>
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="extras-selector"
        title="ExtrasSelector"
        description="Optional add-ons with quantity steppers."
        importPath='import { ExtrasSelector } from "@/components/booking"'
      >
        <DsPreview>
          <div className="max-w-lg">
            <ExtrasSelector />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="checkout-steps"
        title="CheckoutSteps"
        description="Multi-step checkout progress indicator."
        importPath='import { CheckoutSteps } from "@/components/booking"'
      >
        <DsPreview>
          <CheckoutSteps currentStep="pickup" />
        </DsPreview>
      </DsSection>

      <DsSection
        id="reservation-status-badge"
        title="ReservationStatusBadge"
        description="Status badge for reservation lifecycle states."
        importPath='import { ReservationStatusBadge } from "@/components/booking"'
      >
        <DsPreview>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <ReservationStatusBadge key={status} status={status} />
            ))}
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="trip-summary-card"
        title="TripSummaryCard"
        description="Compact reservation summary with vehicle, dates, and total."
        importPath='import { TripSummaryCard } from "@/components/booking"'
      >
        <DsPreview>
          <TripSummaryCard reservation={reservation} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="empty-states"
        title="EmptyStates"
        description="Empty and zero-result states for search, filters, and reservations."
        importPath='import { EmptyState, NoVehiclesFound, ... } from "@/components/booking"'
      >
        <DsSubsection title="EmptyState">
          <DsPreview>
            <EmptyState
              title="Nothing here yet"
              description="Custom empty state with optional action."
              actionLabel="Get started"
              actionHref="/search"
            />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="NoVehiclesFound">
          <DsPreview>
            <NoVehiclesFound />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="NoSearchResults">
          <DsPreview>
            <NoSearchResults />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="NoReservations">
          <DsPreview>
            <NoReservations />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="FiltersEmpty">
          <DsPreview>
            <FiltersEmpty />
          </DsPreview>
        </DsSubsection>
      </DsSection>
    </>
  );
}
