export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export const footerBrand = {
  tagline: "Easy car rentals by location, airport, and trip type.",
  cta: { href: "/search", label: "Find a car" },
} as const;

export const footerPopularRentalLinks: FooterLink[] = [
  { href: "/search?category=airports", label: "Airport car rentals" },
  { href: "/search?type=suv", label: "SUV rentals" },
  { href: "/search?type=luxury", label: "Luxury rentals" },
  { href: "/search?type=minivan", label: "Family rentals" },
  { href: "/search?type=electric", label: "Electric rentals" },
];

export const footerCompanyLinks: FooterLink[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About Go" },
  { href: "/support/contact", label: "Contact" },
  { href: "/support", label: "Help center" },
];

export const footerLegalLinks: FooterLink[] = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/support/cancellation", label: "Rental policies" },
  { href: "/support/insurance", label: "Insurance/protection" },
  { href: "/support/cancellation", label: "Cancellation policy" },
];
