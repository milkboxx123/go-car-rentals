import { siteConfig } from "@/lib/site-config";
import type { LocationContent } from "@/content/locations";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.supportEmail,
      telephone: siteConfig.phone,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.baseUrl}/search?location={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateLocalBusinessSchema(location: LocationContent) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: location.brandName,
    url: `${siteConfig.baseUrl}/locations/${location.slug}`,
    areaServed: {
      "@type": "City",
      name: location.city,
      containedInPlace: {
        "@type": "State",
        name: location.state,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
  };
}

export function generateFAQSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}${item.path}`,
    })),
  };
}

export function generateServiceSchema({
  name,
  description,
  areaServed,
}: {
  name: string;
  description: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.baseUrl,
    },
    ...(areaServed
      ? {
          areaServed: {
            "@type": "Place",
            name: areaServed,
          },
        }
      : {}),
    serviceType: "Car rental",
  };
}
