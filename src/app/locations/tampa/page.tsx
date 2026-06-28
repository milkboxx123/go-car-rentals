import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AirportRentalSection,
  CtaSection,
  LocationLandingHero,
  ReviewSection,
  SeoInternalLinks,
  VehicleCarouselSection,
  VehicleTypeGrid,
} from "@/components/marketing";
import { Footer, MarketingHeader } from "@/components/layout";
import { getLocationBySlug, getReviewsByLocation, getVehiclesByLocation } from "@/mock";

const SLUG = "tampa";

export function generateMetadata(): Metadata {
  const location = getLocationBySlug(SLUG);
  if (!location) {
    return { title: "Location not found — Go" };
  }

  return {
    title: `Car Rentals in ${location.city}, ${location.state} — Go`,
    description: `${location.name} serves ${location.region} with airport pickup and delivery. Browse verified vehicles at ${location.airport.code}.`,
  };
}

export default function TampaLocationPage() {
  const location = getLocationBySlug(SLUG);
  if (!location) notFound();

  const locationVehicles = getVehiclesByLocation(location.id).filter(
    (v) => v.status === "available"
  );
  const locationReviews = getReviewsByLocation(location.id);

  return (
    <div className="min-h-screen bg-go-cream">
      <MarketingHeader variant="dark" />
      <main>
        <LocationLandingHero
          location={location}
          vehicleCount={locationVehicles.length}
        />
        <VehicleCarouselSection
          title={`Vehicles in ${location.city}`}
          subtitle={`Available at ${location.airport.code} and local delivery`}
          vehicles={locationVehicles}
          viewAllHref={`/search?location=${location.slug}`}
        />
        <VehicleTypeGrid />
        <AirportRentalSection title={`${location.airport.code} airport pickup`} />
        {locationReviews.length > 0 && (
          <ReviewSection title={`Reviews from ${location.city} guests`} />
        )}
        <SeoInternalLinks />
        <CtaSection
          title={`Ready to explore ${location.city}?`}
          description={`Book airport pickup at ${location.airport.name} or get your car delivered.`}
          primaryHref={`/search?location=${location.slug}`}
          primaryLabel="Browse Tampa vehicles"
        />
      </main>
      <Footer />
    </div>
  );
}
