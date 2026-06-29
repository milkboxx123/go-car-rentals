export const siteConfig = {
  brandName: "Go",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorentals.com",
  defaultTitle: "Go — Car Rentals",
  defaultDescription:
    "Find the right car for the way you move. Airport pickup, local delivery, and flexible rentals by location.",
  defaultOgImage: "/og-default.jpg",
  supportEmail: "support@gorentals.com",
  phone: "1-800-GO-RENT",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
} as const;
