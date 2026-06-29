import {
  AirportRentalSection,
  ComparisonTable,
  CtaSection,
  FaqAccordion,
  FAQSection,
  FeatureCard,
  HeroSearchSection,
  HowItWorks,
  InternalLinksSection,
  LocationCard,
  LocationGrid,
  LocationLandingHero,
  MarketingSection as MarketingSectionLayout,
  MonthlyRentalSection,
  PageHero,
  ReviewSection,
  SearchPanel,
  SeoInternalLinks,
  StepCard,
  TrustSection,
  VehicleCarouselSection,
  VehicleTypeGrid,
} from "@/components/marketing";
import { locationsIndexFaqs } from "@/content/faqs";
import { locations as locationContent } from "@/content/locations";
import { monthlyRentalsContent } from "@/content/marketing-pages";
import { Car } from "lucide-react";
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
        description="Footer-style internal links for vehicle types and popular searches."
        importPath='import { SeoInternalLinks } from "@/components/marketing"'
      >
        <DsPreview>
          <SeoInternalLinks />
        </DsPreview>
      </DsSection>

      <DsSection
        id="page-hero"
        title="PageHero"
        description="Generic marketing page hero with eyebrow, title, subtitle, CTAs, and optional background image."
        importPath='import { PageHero } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <PageHero
            eyebrow="Search"
            title="Find the right car for the way you move"
            subtitle="Browse available vehicles by city, airport, and trip type."
            primaryCta={{ href: "/search", label: "Browse cars" }}
            backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="marketing-section"
        title="MarketingSection"
        description="Layout wrapper with background and spacing variants."
        importPath='import { MarketingSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <MarketingSectionLayout background="muted">
            <p className="text-body-lg text-go-muted">Section content goes here.</p>
          </MarketingSectionLayout>
        </DsPreview>
      </DsSection>

      <DsSection
        id="feature-card"
        title="FeatureCard"
        description="Icon card for value props and feature highlights."
        importPath='import { FeatureCard } from "@/components/marketing"'
      >
        <DsPreview>
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard icon={Car} title="Exact vehicle selection" description="Book the specific car you see." />
            <FeatureCard title="Flexible lengths" description="Daily, weekly, and monthly options." href="/search" />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="step-card"
        title="StepCard"
        description="Numbered step card for process flows."
        importPath='import { StepCard } from "@/components/marketing"'
      >
        <DsPreview>
          <div className="grid gap-4 sm:grid-cols-3">
            <StepCard step={1} title="Search" description="Enter city and dates." />
            <StepCard step={2} title="Choose" description="Pick your vehicle." />
            <StepCard step={3} title="Drive" description="Pick up and go." />
          </div>
        </DsPreview>
      </DsSection>

      <DsSection
        id="location-card"
        title="LocationCard"
        description="City location card with airport and rental badges."
        importPath='import { LocationCard } from "@/components/marketing"'
      >
        <DsPreview>
          <LocationCard
            city={locationContent[0].city}
            state={locationContent[0].stateAbbreviation}
            brandName={locationContent[0].brandName}
            airportName={locationContent[0].airportName}
            airportCode={locationContent[0].airportCode}
            href={`/search?location=${locationContent[0].slug}`}
            imageUrl={locationContent[0].imageUrl}
            badges={["Airport pickup", "Monthly"]}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="location-grid"
        title="LocationGrid"
        description="Responsive grid of location cards."
        importPath='import { LocationGrid } from "@/components/marketing"'
      >
        <DsPreview>
          <LocationGrid
            locations={locationContent.slice(0, 3).map((loc) => ({
              city: loc.city,
              state: loc.stateAbbreviation,
              brandName: loc.brandName,
              airportName: loc.airportName,
              airportCode: loc.airportCode,
              href: `/search?location=${loc.slug}`,
              imageUrl: loc.imageUrl,
            }))}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="faq-section"
        title="FAQSection"
        description="FAQ section with accordion and optional schema data."
        importPath='import { FAQSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <FAQSection items={locationsIndexFaqs.slice(0, 3)} />
        </DsPreview>
      </DsSection>

      <DsSection
        id="internal-links-section"
        title="InternalLinksSection"
        description="Grouped internal links for SEO and navigation."
        importPath='import { InternalLinksSection } from "@/components/marketing"'
      >
        <DsPreview fullBleed>
          <InternalLinksSection
            groups={[
              {
                title: "Popular pages",
                links: [
                  { href: "/search", label: "Browse cars" },
                  { href: "/how-it-works", label: "How it works" },
                ],
              },
            ]}
          />
        </DsPreview>
      </DsSection>

      <DsSection
        id="comparison-table"
        title="ComparisonTable"
        description="Responsive comparison table for feature matrices."
        importPath='import { ComparisonTable } from "@/components/marketing"'
      >
        <DsPreview>
          <ComparisonTable
            headers={monthlyRentalsContent.comparison.headers}
            rows={[...monthlyRentalsContent.comparison.rows.slice(0, 3)]}
          />
        </DsPreview>
      </DsSection>
    </>
  );
}
