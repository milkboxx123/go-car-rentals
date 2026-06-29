import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BookingCard,
  VehicleDetailHeader,
  VehicleDetailHero,
  VehicleSpecsGrid,
} from "@/components/booking";
import { SimilarVehiclesGrid } from "@/components/booking/similar-vehicles-grid";
import { Footer } from "@/components/layout";
import { AppHeaderShell } from "@/components/layout/app-header-shell";
import { getVehicleById, vehicles } from "@/mock";
import { formatVehicleName } from "@/lib/formatters";

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return { title: "Vehicle not found — Go" };
  }

  return {
    title: `${formatVehicleName(vehicle)} — Go Car Rentals`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) notFound();

  const similarVehicles = vehicles
    .filter(
      (item) =>
        item.id !== vehicle.id &&
        item.status === "available" &&
        (item.type === vehicle.type || item.locationId === vehicle.locationId)
    )
    .slice(0, 3);

  const tripDays = 4;

  return (
    <div className="min-h-screen bg-go-cream">
      <AppHeaderShell />

      <div className="container-marketing py-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-8">
            <VehicleDetailHero vehicleId={vehicle.id} images={vehicle.images} />
            <VehicleDetailHeader vehicle={vehicle} />

            {vehicle.description && (
              <section>
                <h2 className="text-heading-sm font-bold text-go-ink">About this vehicle</h2>
                <p className="mt-3 text-body-md text-go-muted">{vehicle.description}</p>
              </section>
            )}

            <section>
              <h2 className="mb-4 text-heading-sm font-bold text-go-ink">Specifications</h2>
              <VehicleSpecsGrid vehicle={vehicle} />
            </section>

            {vehicle.features.length > 0 && (
              <section>
                <h2 className="mb-4 text-heading-sm font-bold text-go-ink">Features</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="text-body-sm text-go-muted">
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {similarVehicles.length > 0 && (
              <section>
                <h2 className="mb-4 text-heading-sm font-bold text-go-ink">Similar vehicles</h2>
                <SimilarVehiclesGrid vehicles={similarVehicles} />
              </section>
            )}
          </div>

          <div className="hidden lg:block">
            <BookingCard
              dailyRate={vehicle.dailyRate}
              tripTotal={vehicle.tripTotal ?? vehicle.dailyRate * tripDays}
              days={tripDays}
              ctaLabel="Continue to checkout"
            />
          </div>
        </div>
      </div>

      <BookingCard
        layout="mobile"
        dailyRate={vehicle.dailyRate}
        tripTotal={vehicle.tripTotal ?? vehicle.dailyRate * tripDays}
        days={tripDays}
        ctaLabel="Reserve"
      />

      <Footer />
    </div>
  );
}
