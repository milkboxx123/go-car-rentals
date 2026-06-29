export interface VehicleTypeContent {
  slug: string;
  label: string;
  description: string;
  searchHref: string;
  icon?: string;
}

export const vehicleTypes: VehicleTypeContent[] = [
  {
    slug: "suv",
    label: "SUV rentals",
    description: "Room for luggage, families, and road trips.",
    searchHref: "/search?type=suv",
  },
  {
    slug: "luxury",
    label: "Luxury rentals",
    description: "Premium vehicles for business and special occasions.",
    searchHref: "/search?type=luxury",
  },
  {
    slug: "electric",
    label: "Electric rentals",
    description: "Quiet, efficient EVs for city and commuter travel.",
    searchHref: "/search?type=electric",
  },
  {
    slug: "minivan",
    label: "Family rentals",
    description: "Minivans and spacious vehicles for group travel.",
    searchHref: "/search?type=minivan",
  },
  {
    slug: "convertible",
    label: "Convertible rentals",
    description: "Open-air driving for coastal and weekend trips.",
    searchHref: "/search?type=convertible",
  },
  {
    slug: "truck",
    label: "Truck rentals",
    description: "Pickup trucks for moves, projects, and outdoor gear.",
    searchHref: "/search?type=truck",
  },
  {
    slug: "car",
    label: "Economy rentals",
    description: "Efficient sedans and compacts for everyday driving.",
    searchHref: "/search?type=car",
  },
];

export function getVehicleTypeBySlug(slug: string) {
  return vehicleTypes.find((type) => type.slug === slug);
}
