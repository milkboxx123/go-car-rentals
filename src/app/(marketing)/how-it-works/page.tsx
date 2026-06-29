import {
  Car,
  CreditCard,
  FileCheck,
  MapPin,
  Shield,
  UserCheck,
} from "lucide-react";

import { StructuredData } from "@/components/seo/StructuredData";
import {
  CtaSection,
  FAQSection,
  FeatureCard,
  MarketingSection,
  PageHero,
  StepCard,
} from "@/components/marketing";
import { howItWorksFaqs } from "@/content/faqs";
import { howItWorksContent } from "@/content/marketing-pages";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/structured-data";

export const metadata = generatePageMetadata({
  title: "How Go Car Rentals Work",
  description:
    "Learn how Go car rentals work, from searching by location and dates to choosing your car, pickup, delivery, pricing, and support.",
  path: "/how-it-works",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "How it works", path: "/how-it-works" },
];

const requirementIcons = [FileCheck, CreditCard, UserCheck, Shield, UserCheck];

export default function HowItWorksPage() {
  const { hero, steps, requirements, pickupOptions, pricingItems, supportPhases } =
    howItWorksContent;

  return (
    <>
      <StructuredData
        data={[
          generateBreadcrumbSchema(breadcrumbs),
          generateFAQSchema(howItWorksFaqs),
        ]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        primaryCta={hero.primaryCta}
        secondaryCta={{ href: "/search", label: "Find a car" }}
        backgroundImage={hero.backgroundImage}
      />

      <MarketingSection background="white">
        <h2 className="mb-8 text-center text-heading-lg font-bold">
          The Go rental process
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection background="muted">
        <h2 className="mb-6 text-heading-lg font-bold">Booking details</h2>
        <div className="prose-go max-w-3xl space-y-4 text-body-lg text-go-muted">
          <p>
            <strong className="text-go-ink">Exact vehicle selection.</strong> Every
            listing shows the specific car — make, model, photos, and features.
          </p>
          <p>
            <strong className="text-go-ink">Availability by date.</strong> Search
            with your pickup and return dates to see what is open.
          </p>
          <p>
            <strong className="text-go-ink">Pickup windows and delivery.</strong>{" "}
            Options vary by city and vehicle. Airport pickup, local lots, and
            delivery may be available.
          </p>
          <p>
            <strong className="text-go-ink">Longer trips.</strong> Select a
            30+ day trip length when searching to see extended-stay options where
            available.
          </p>
        </div>
      </MarketingSection>

      <MarketingSection>
        <h2 className="mb-8 text-heading-lg font-bold">What you need to rent</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requirements.map((item, i) => (
            <FeatureCard
              key={item.title}
              icon={requirementIcons[i % requirementIcons.length]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection background="white">
        <h2 className="mb-8 text-heading-lg font-bold">Pickup and delivery options</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pickupOptions.map((item) => (
            <FeatureCard
              key={item.title}
              icon={MapPin}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection background="muted">
        <h2 className="mb-6 text-heading-lg font-bold">Pricing transparency</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {pricingItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-go-border bg-go-paper px-4 py-3 text-body-sm"
            >
              <Car className="size-4 shrink-0 text-go-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection>
        <h2 className="mb-8 text-heading-lg font-bold">Support when you need it</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {supportPhases.map((phase) => (
            <FeatureCard
              key={phase.title}
              title={phase.title}
              description={phase.description}
            />
          ))}
        </div>
      </MarketingSection>

      <FAQSection items={howItWorksFaqs} />

      <CtaSection
        title="Ready to Go?"
        description="Search by location and dates to find your car."
        primaryHref="/search"
        primaryLabel="Find a car"
      />
    </>
  );
}
