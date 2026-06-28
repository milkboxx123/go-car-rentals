import type { Location } from "@/types";

export const locations: Location[] = [
  {
    id: "loc-tampa",
    name: "Go Tampa",
    slug: "tampa",
    city: "Tampa",
    state: "FL",
    region: "Tampa Bay",
    timezone: "America/New_York",
    airport: {
      code: "TPA",
      name: "Tampa International Airport",
    },
    deliveryAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    coordinates: { lat: 27.9506, lng: -82.4572 },
  },
  {
    id: "loc-boston",
    name: "Go Boston",
    slug: "boston",
    city: "Boston",
    state: "MA",
    region: "Greater Boston",
    timezone: "America/New_York",
    airport: {
      code: "BOS",
      name: "Boston Logan International Airport",
    },
    deliveryAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1501596510947-1ec337c0d28b?w=1200&q=80",
    coordinates: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: "loc-miami",
    name: "Go Miami",
    slug: "miami",
    city: "Miami",
    state: "FL",
    region: "South Florida",
    timezone: "America/New_York",
    airport: {
      code: "MIA",
      name: "Miami International Airport",
    },
    deliveryAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1514214105883-aecc6bbaf7af?w=1200&q=80",
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: "loc-orlando",
    name: "Go Orlando",
    slug: "orlando",
    city: "Orlando",
    state: "FL",
    region: "Central Florida",
    timezone: "America/New_York",
    airport: {
      code: "MCO",
      name: "Orlando International Airport",
    },
    deliveryAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80",
    coordinates: { lat: 28.5383, lng: -81.3792 },
  },
  {
    id: "loc-sarasota",
    name: "Go Sarasota",
    slug: "sarasota",
    city: "Sarasota",
    state: "FL",
    region: "Suncoast",
    timezone: "America/New_York",
    airport: {
      code: "SRQ",
      name: "Sarasota Bradenton International Airport",
    },
    deliveryAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    coordinates: { lat: 27.3364, lng: -82.5307 },
  },
];

export function getLocationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id);
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
