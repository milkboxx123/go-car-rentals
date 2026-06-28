import {
  AirportRentalSection,
  CtaSection,
  FaqAccordion,
  HeroSearchSection,
  HowItWorks,
  LocationLandingHero,
  MonthlyRentalSection,
  ReviewSection,
  SearchPanel,
  SeoInternalLinks,
  TrustSection,
  VehicleCarouselSection,
  VehicleTypeGrid,
} from "@/components/marketing";
import { DsPreview, DsSection, DsSubsection } from "@/components/design-system";
import { getLocationBySlug, vehicles } from "@/mock";

const tampa = getLocationBySlug("tampa")!;
const tampaVehicles = vehicles.filter(
  (v) => v.locationId === tampa.id && v.status === "available"
);

export function MarketingSection() {
  return (
    <>
      <DsSection
        id="hero-search-section"
        title="HeroSearchSection"
        description="Full-width hero with background image, headline, and embedded search panel."
        importPath='import { HeroSearchSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <HeroSearchSection />
        </DsPreview>
      </DsSection>

      <DsSection
        id="search-panel"
        title="SearchPanel"
        description="Location, date, and sort controls for hero, compact, and results layouts."
        importPath='import { SearchPanel } from "@/components/marketing"'
      >
        <DsSubsection title="Hero">
          <DsPreview>
            <SearchPanel variant="hero" />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Compact">
          <DsPreview>
            <SearchPanel variant="compact" />
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="location-landing-hero"
        title="LocationLandingHero"
        description="Location-specific landing hero with airport badge and search."
        importPath='import { LocationLandingHero } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <LocationLandingHero location={tampa} vehicleCount={tampaVehicles.length} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="vehicle-carousel-section"
        title="VehicleCarouselSection"
        description="Horizontal scrollable carousel of vehicle cards with navigation."
        importPath='import { VehicleCarouselSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <VehicleCarouselSection vehicles={tampaVehicles.slice(0, 6)} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="vehicle-type-grid"
        title="VehicleTypeGrid"
        description="Grid of vehicle type categories with icons and counts."
        importPath='import { VehicleTypeGrid } from "@/components/marketing"'
      >
        <DsPreview>
          <VehicleTypeGrid />
        </DsPreview>
      </DsSection>

      <DsSection
        id="how-it-works"
        title="HowItWorks"
        description="Three-step process explaining the rental flow."
        importPath='import { HowItWorks } from "@/components/marketing"'
      >
        <DsPreview>
          <HowItWorks />
        </DsPreview>
      </DsSection>

      <DsSection
        id="trust-section"
        title="TrustSection"
        description="Trust signals — verified fleet, pricing, support, and ratings."
        importPath='import { TrustSection } from "@/components/marketing"'
      >
        <DsPreview>
          <TrustSection />
        </DsPreview>
      </DsSection>

      <DsSection
        id="airport-rental-section"
        title="AirportRentalSection"
        description="Airport pickup feature section with location links."
        importPath='import { AirportRentalSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <AirportRentalSection />
        </DsPreview>
      </DsSection>

      <DsSection
        id="monthly-rental-section"
        title="MonthlyRentalSection"
        description="Monthly rental promotion with starting rate and vehicle highlights."
        importPath='import { MonthlyRentalSection } from "@/components/marketing"'
      >
        <DsPreview>
          <MonthlyRentalSection />
        </DsPreview>
      </DsSection>

      <DsSection
        id="cta-section"
        title="CtaSection"
        description="Call-to-action banner with primary and secondary links."
        importPath='import { CtaSection } from "@/components/marketing"'
      >
        <DsSubsection title="Default">
          <DsPreview>
            <CtaSection />
          </DsPreview>
        </DsSubsection>
        <DsSubsection title="Dark">
          <DsPreview fullBleed>
            <CtaSection variant="dark" />
          </DsPreview>
        </DsSubsection>
      </DsSection>

      <DsSection
        id="faq-accordion"
        title="FaqAccordion"
        description="Expandable FAQ list for common rental questions."
        importPath='import { FaqAccordion } from "@/components/marketing"'
      >
        <DsPreview>
          <FaqAccordion />
        </DsPreview>
      </DsSection>

      <DsSection
        id="review-section"
        title="ReviewSection"
        description="Guest reviews grid with aggregate rating summary."
        importPath='import { ReviewSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <ReviewSection limit={3} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="seo-internal-links"
        title="SeoInternalLinks"
        description="Footer-style internal links for locations, vehicle types, and topics."
        importPath='import { SeoInternalLinks } from "@/components/marketing"'
      >
        <DsPreview>
          <SeoInternalLinks />
        </DsPreview>
      </DsSection>
    </>
  );
}
