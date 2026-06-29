import { generatePageMetadata } from "@/lib/seo";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  CtaSection,
  HeroSearchSection,
  HowItWorks,
  SeoInternalLinks,
  TrustSection,
  VehicleCarouselSection,
  VehicleTypeGrid,
} from "@/components/marketing";

export const metadata = generatePageMetadata({
  title: "Car Rentals | Find the right car for the way you move",
  description:
    "Skip the counter. Airport pickup, local delivery, and flexible rentals across Florida and beyond.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={[generateOrganizationSchema(), generateWebSiteSchema()]}
      />
      <HeroSearchSection />
      <VehicleCarouselSection />
      <HowItWorks />
      <VehicleTypeGrid />
      <TrustSection />
      <div className="bg-go-paper">
        <SeoInternalLinks />
        <CtaSection className="bg-transparent" />
      </div>
    </>
  );
}
