import { Clock, Mail, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import {
  CtaSection,
  FAQSection,
  FeatureCard,
  MarketingSection,
  PageHero,
} from "@/components/marketing";
import { StructuredData } from "@/components/seo/StructuredData";
import { Link } from "@/components/ui/link";
import { contactFaqs } from "@/content/faqs";
import { contactContent } from "@/content/marketing-pages";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/structured-data";

export const metadata = generatePageMetadata({
  title: "Contact Go Car Rentals",
  description:
    "Get help with bookings, pickup, payments, and trip support. Contact Go by email, phone, or our support form.",
  path: "/support/contact",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/support/contact" },
];

export default function ContactPage() {
  const { hero, hours, formIntro, accountNote } = contactContent;

  return (
    <>
      <StructuredData
        data={[
          generateBreadcrumbSchema(breadcrumbs),
          generateFAQSchema(contactFaqs),
        ]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={breadcrumbs}
      />

      <MarketingSection background="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-heading-lg font-bold">Get in touch</h2>
            <p className="mt-3 text-body-lg text-go-muted">
              Choose the option that works best for you. Our team is here to help
              before, during, and after your rental.
            </p>
            <div className="mt-8 grid gap-4">
              <FeatureCard
                icon={Mail}
                title="Email"
                description={siteConfig.supportEmail}
                href={`mailto:${siteConfig.supportEmail}`}
              />
              <FeatureCard
                icon={Phone}
                title="Phone"
                description={siteConfig.phone}
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
              />
              <FeatureCard
                icon={Clock}
                title={hours.title}
                description={hours.description}
              />
            </div>
            <p className="mt-8 text-body-sm text-go-muted">
              {accountNote.text}{" "}
              <Link href={accountNote.href} variant="underline">
                {accountNote.label}
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-heading-lg font-bold">{formIntro.title}</h2>
            <p className="mt-3 text-body-md text-go-muted">{formIntro.description}</p>
            <ContactForm className="mt-8" />
          </div>
        </div>
      </MarketingSection>

      <FAQSection items={contactFaqs} />

      <CtaSection
        title="Ready to Go?"
        description="Search by location and dates to find your car."
        primaryHref="/search"
        primaryLabel="Find a car"
        secondaryHref="/how-it-works"
        secondaryLabel="How it works"
      />
    </>
  );
}
