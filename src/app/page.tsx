import type { Metadata } from "next";

import {
  CtaSection,
  HeroSearchSection,
  HowItWorks,
  SeoInternalLinks,
  TrustSection,
  VehicleCarouselSection,
  VehicleTypeGrid,
} from "@/components/marketing";
import { Footer, MarketingHeader } from "@/components/layout";

export const metadata: Metadata = {
  title: "Go — Car Rentals | Find the right car for the way you move",
  description:
    "Skip the counter. Airport pickup, local delivery, and flexible rentals across Florida and beyond.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-go-cream">
      <MarketingHeader variant="dark" />
      <main>
        <HeroSearchSection />
        <VehicleCarouselSection />
        <HowItWorks />
        <VehicleTypeGrid />
        <TrustSection />
        <SeoInternalLinks />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
