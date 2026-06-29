export interface LocationFaq {
  question: string;
  answer: string;
}

export interface InternalLink {
  href: string;
  label: string;
}

export interface LocationContent {
  slug: string;
  city: string;
  state: string;
  stateAbbreviation: string;
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  airportName: string;
  airportCode: string;
  airportSlug: string;
  popularVehicleTypes: string[];
  neighborhoods: string[];
  localAttractions: string[];
  travelUseCases: { title: string; description: string }[];
  pickupOptions: string[];
  deliveryAvailable: boolean;
  monthlyRentalAvailable: boolean;
  latitude: number;
  longitude: number;
  imageUrl: string;
  faqs: LocationFaq[];
  internalLinks: InternalLink[];
}

export const locations: LocationContent[] = [
  {
    slug: "tampa",
    city: "Tampa",
    state: "Florida",
    stateAbbreviation: "FL",
    brandName: "Go Tampa",
    heroTitle: "Go Tampa car rentals",
    heroSubtitle:
      "Book the right car for airport pickups, beach weekends, business trips, and monthly rentals in Tampa.",
    metaTitle: "Car Rental in Tampa, FL | Go Tampa",
    metaDescription:
      "Book car rentals in Tampa with Go Tampa. Find airport pickup, delivery options, SUVs, luxury cars, family vehicles, and monthly rentals.",
    airportName: "Tampa International Airport",
    airportCode: "TPA",
    airportSlug: "tpa",
    popularVehicleTypes: ["suv", "luxury", "convertible", "minivan", "electric"],
    neighborhoods: [
      "Downtown Tampa",
      "Westshore",
      "Ybor City",
      "St. Petersburg",
      "Clearwater",
      "Brandon",
      "Wesley Chapel",
    ],
    localAttractions: [
      "Tampa Riverwalk",
      "Busch Gardens",
      "Clearwater Beach",
      "St. Pete Pier",
      "Amalie Arena",
    ],
    travelUseCases: [
      {
        title: "Airport arrivals",
        description:
          "Land at TPA and head straight to your vehicle. Curbside pickup options vary by vehicle — details are shown before you confirm.",
      },
      {
        title: "Beach trips",
        description:
          "SUVs and convertibles are popular for Clearwater, St. Pete, and Anna Maria Island weekends.",
      },
      {
        title: "Business travel",
        description:
          "Sedans and luxury vehicles for Westshore meetings, downtown conferences, and client visits.",
      },
      {
        title: "Downtown Tampa",
        description:
          "Compact cars and EVs work well for urban parking and short business stays.",
      },
      {
        title: "St. Petersburg / Clearwater trips",
        description:
          "Cross the bay with room for beach gear, golf bags, and family luggage.",
      },
      {
        title: "Family vacations",
        description:
          "Minivans and three-row SUVs for theme park runs, beach days, and multi-stop itineraries.",
      },
    ],
    pickupOptions: ["TPA curbside pickup", "Local lot pickup", "Hotel delivery", "Address delivery"],
    deliveryAvailable: true,
    monthlyRentalAvailable: true,
    latitude: 27.9506,
    longitude: -82.4572,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    faqs: [
      {
        question: "Can I rent a car near Tampa International Airport?",
        answer:
          "Yes. Many Go Tampa vehicles support TPA pickup. Availability and pickup instructions vary by vehicle and are shown before you confirm your booking.",
      },
      {
        question: "Does Go Tampa offer SUV rentals?",
        answer:
          "Yes. SUVs are among the most popular categories in Tampa for beach trips, families, and airport arrivals. Browse available SUVs by date and location.",
      },
      {
        question: "Can I rent a car for a month in Tampa?",
        answer:
          "Monthly rentals are available for select vehicles in Tampa. Visit our monthly rentals page or filter by trip length when searching.",
      },
      {
        question: "Is delivery available in Tampa?",
        answer:
          "Delivery options may vary by city and vehicle. Hotels, vacation rentals, and local addresses may be eligible — fees and availability are shown at checkout.",
      },
      {
        question: "Can I choose the exact vehicle I book?",
        answer:
          "Go shows the specific vehicle you are booking, including photos and details, so you know what you are getting before you confirm.",
      },
    ],
    internalLinks: [
      { href: "/monthly-rentals", label: "Monthly rentals in Tampa" },
      { href: "/how-it-works", label: "How Go works" },
      { href: "/locations/orlando", label: "Go Orlando" },
      { href: "/search?type=suv&location=tampa", label: "SUV rentals in Tampa" },
    ],
  },
  {
    slug: "boston",
    city: "Boston",
    state: "Massachusetts",
    stateAbbreviation: "MA",
    brandName: "Go Boston",
    heroTitle: "Go Boston car rentals",
    heroSubtitle:
      "Reliable wheels for Logan arrivals, college visits, Cape weekends, and long-term stays across Greater Boston.",
    metaTitle: "Car Rental in Boston, MA | Go Boston",
    metaDescription:
      "Book car rentals in Boston with Go Boston. Find airport pickup, delivery options, SUVs, luxury cars, family vehicles, and monthly rentals.",
    airportName: "Boston Logan International Airport",
    airportCode: "BOS",
    airportSlug: "bos",
    popularVehicleTypes: ["car", "suv", "luxury", "minivan", "electric"],
    neighborhoods: [
      "Back Bay",
      "Cambridge",
      "Somerville",
      "Brookline",
      "Seaport",
      "North End",
      "South Shore",
    ],
    localAttractions: [
      "Freedom Trail",
      "Fenway Park",
      "Harvard Square",
      "Cape Cod",
      "Newbury Street",
    ],
    travelUseCases: [
      {
        title: "Logan Airport",
        description:
          "Skip the rental counter queue. Pick up near BOS for business trips and New England arrivals.",
      },
      {
        title: "Business travel",
        description:
          "Sedans and luxury vehicles for Seaport meetings, Kendall Square visits, and downtown conferences.",
      },
      {
        title: "College visits",
        description:
          "Family-friendly SUVs and minivans for campus tours across Cambridge, Boston, and nearby schools.",
      },
      {
        title: "Cape Cod trips",
        description:
          "Comfortable highway cruisers and SUVs for weekend escapes down Route 6.",
      },
      {
        title: "North Shore trips",
        description:
          "Day trips to Salem, Gloucester, and coastal towns with room for gear and passengers.",
      },
      {
        title: "Monthly rentals",
        description:
          "Extended stays for relocations, contract work, and temporary housing without buying a car.",
      },
    ],
    pickupOptions: ["BOS airport pickup", "Local pickup", "Hotel delivery", "Address delivery"],
    deliveryAvailable: true,
    monthlyRentalAvailable: true,
    latitude: 42.3601,
    longitude: -71.0589,
    imageUrl:
      "https://images.unsplash.com/photo-1501596510947-1ec337c0d28b?w=1200&q=80",
    faqs: [
      {
        question: "Can I pick up a rental car at Boston Logan?",
        answer:
          "Select Go Boston vehicles offer Logan pickup. Instructions and availability are confirmed before checkout.",
      },
      {
        question: "Are monthly rentals available in Boston?",
        answer:
          "Yes, monthly rentals are available for qualifying vehicles. Rates and mileage allowances are shown before you book.",
      },
      {
        question: "What vehicles work best for winter in Boston?",
        answer:
          "AWD SUVs and crossovers are popular in colder months. Filter by vehicle type and features when searching.",
      },
      {
        question: "Can I get a car delivered in Cambridge or Somerville?",
        answer:
          "Delivery availability varies by address and vehicle. Eligible options and fees appear during booking.",
      },
      {
        question: "Do I book the exact car I see?",
        answer:
          "Yes. Go lets you choose the specific vehicle with photos and details before confirming.",
      },
    ],
    internalLinks: [
      { href: "/monthly-rentals", label: "Monthly rentals in Boston" },
      { href: "/how-it-works", label: "How Go works" },
      { href: "/locations/tampa", label: "Go Tampa" },
      { href: "/search?type=suv&location=boston", label: "SUV rentals in Boston" },
    ],
  },
  {
    slug: "miami",
    city: "Miami",
    state: "Florida",
    stateAbbreviation: "FL",
    brandName: "Go Miami",
    heroTitle: "Go Miami car rentals",
    heroSubtitle:
      "From MIA arrivals to South Beach weekends — book convertibles, luxury cars, SUVs, and monthly rentals in Miami.",
    metaTitle: "Car Rental in Miami, FL | Go Miami",
    metaDescription:
      "Book car rentals in Miami with Go Miami. Find airport pickup, delivery options, SUVs, luxury cars, family vehicles, and monthly rentals.",
    airportName: "Miami International Airport",
    airportCode: "MIA",
    airportSlug: "mia",
    popularVehicleTypes: ["luxury", "convertible", "suv", "electric", "minivan"],
    neighborhoods: [
      "South Beach",
      "Brickell",
      "Wynwood",
      "Coral Gables",
      "Coconut Grove",
      "Miami Beach",
      "Doral",
    ],
    localAttractions: [
      "South Beach",
      "Art Deco District",
      "Vizcaya Museum",
      "Bayside Marketplace",
      "Port of Miami",
    ],
    travelUseCases: [
      {
        title: "Airport arrivals",
        description:
          "Connect at MIA and get on the road quickly with vehicles suited for South Florida driving.",
      },
      {
        title: "Beach trips",
        description:
          "Convertibles and SUVs for Miami Beach, Key Biscayne, and coastal day trips.",
      },
      {
        title: "Luxury rentals",
        description:
          "Premium vehicles for events, business entertainment, and special occasions in Brickell and the Design District.",
      },
      {
        title: "Weekend trips",
        description:
          "Comfortable cruisers for Keys getaways, Everglades visits, and Fort Lauderdale runs.",
      },
      {
        title: "Cruise port travel",
        description:
          "Luggage-friendly SUVs and minivans for pre- and post-cruise stays near the Port of Miami.",
      },
    ],
    pickupOptions: ["MIA airport pickup", "Local pickup", "Hotel delivery", "Address delivery"],
    deliveryAvailable: true,
    monthlyRentalAvailable: true,
    latitude: 25.7617,
    longitude: -80.1918,
    imageUrl:
      "https://images.unsplash.com/photo-1514214105883-aecc6bbaf7af?w=1200&q=80",
    faqs: [
      {
        question: "Can I rent a convertible in Miami?",
        answer:
          "Yes. Convertibles are a popular category in Miami. Availability depends on dates and vehicle — search to see what is open.",
      },
      {
        question: "Is MIA airport pickup available?",
        answer:
          "Many vehicles support Miami International Airport pickup. Details are shown for each vehicle before booking.",
      },
      {
        question: "Are luxury cars available in Miami?",
        answer:
          "Go Miami lists luxury and premium vehicles when available. Filter by vehicle type to browse current inventory.",
      },
      {
        question: "Can I rent monthly in Miami?",
        answer:
          "Monthly rentals are offered on select vehicles for extended stays, seasonal living, and long business trips.",
      },
      {
        question: "Is delivery available to South Beach hotels?",
        answer:
          "Hotel delivery may be available depending on the vehicle and property. Fees and eligibility are shown at checkout.",
      },
    ],
    internalLinks: [
      { href: "/monthly-rentals", label: "Monthly rentals in Miami" },
      { href: "/how-it-works", label: "How Go works" },
      { href: "/locations/tampa", label: "Go Tampa" },
      { href: "/search?type=luxury&location=miami", label: "Luxury rentals in Miami" },
    ],
  },
  {
    slug: "orlando",
    city: "Orlando",
    state: "Florida",
    stateAbbreviation: "FL",
    brandName: "Go Orlando",
    heroTitle: "Go Orlando car rentals",
    heroSubtitle:
      "Family SUVs, airport pickups at MCO, and flexible rentals for theme parks, conventions, and extended stays.",
    metaTitle: "Car Rental in Orlando, FL | Go Orlando",
    metaDescription:
      "Book car rentals in Orlando with Go Orlando. Find airport pickup, delivery options, SUVs, luxury cars, family vehicles, and monthly rentals.",
    airportName: "Orlando International Airport",
    airportCode: "MCO",
    airportSlug: "mco",
    popularVehicleTypes: ["minivan", "suv", "car", "electric", "luxury"],
    neighborhoods: [
      "Lake Buena Vista",
      "International Drive",
      "Downtown Orlando",
      "Winter Park",
      "Kissimmee",
      "Celebration",
    ],
    localAttractions: [
      "Walt Disney World",
      "Universal Orlando",
      "International Drive",
      "Lake Eola",
      "Kennedy Space Center",
    ],
    travelUseCases: [
      {
        title: "Theme parks",
        description:
          "Minivans and SUVs with space for strollers, coolers, and tired kids after long park days.",
      },
      {
        title: "Airport arrivals",
        description:
          "MCO is one of the busiest arrival points in Florida — book ahead for peak travel weeks.",
      },
      {
        title: "Family SUVs and minivans",
        description:
          "Three-row seating and cargo room for multi-generational trips and vacation rentals.",
      },
      {
        title: "Monthly rentals",
        description:
          "Extended assignments, housing transitions, and seasonal workers benefit from flexible long-term rates.",
      },
      {
        title: "Business travel",
        description:
          "Sedans and SUVs for convention center events, I-Drive meetings, and regional client visits.",
      },
    ],
    pickupOptions: ["MCO airport pickup", "Local pickup", "Hotel delivery", "Resort delivery"],
    deliveryAvailable: true,
    monthlyRentalAvailable: true,
    latitude: 28.5383,
    longitude: -81.3792,
    imageUrl:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&q=80",
    faqs: [
      {
        question: "What is the best vehicle for a Disney trip?",
        answer:
          "Minivans and three-row SUVs are popular for families. Search by vehicle type and passenger count to compare options.",
      },
      {
        question: "Can I pick up at Orlando International Airport?",
        answer:
          "Yes, many Go Orlando vehicles support MCO pickup. Vehicle-specific instructions appear before confirmation.",
      },
      {
        question: "Are monthly rentals available in Orlando?",
        answer:
          "Monthly rentals are available on select vehicles. Visit the monthly rentals page for details and search by location.",
      },
      {
        question: "Can vehicles be delivered to vacation rentals?",
        answer:
          "Delivery to vacation homes and hotels may be available. Options and fees vary — check each vehicle listing.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Peak seasons around holidays and school breaks fill quickly. Booking early improves vehicle choice.",
      },
    ],
    internalLinks: [
      { href: "/monthly-rentals", label: "Monthly rentals in Orlando" },
      { href: "/how-it-works", label: "How Go works" },
      { href: "/locations/tampa", label: "Go Tampa" },
      { href: "/search?type=minivan&location=orlando", label: "Family rentals in Orlando" },
    ],
  },
  {
    slug: "sarasota",
    city: "Sarasota",
    state: "Florida",
    stateAbbreviation: "FL",
    brandName: "Go Sarasota",
    heroTitle: "Go Sarasota car rentals",
    heroSubtitle:
      "Beach-ready convertibles, family SUVs, and monthly rentals for seasonal stays on the Suncoast.",
    metaTitle: "Car Rental in Sarasota, FL | Go Sarasota",
    metaDescription:
      "Book car rentals in Sarasota with Go Sarasota. Find airport pickup, delivery options, SUVs, luxury cars, family vehicles, and monthly rentals.",
    airportName: "Sarasota Bradenton International Airport",
    airportCode: "SRQ",
    airportSlug: "srq",
    popularVehicleTypes: ["convertible", "suv", "car", "minivan", "luxury"],
    neighborhoods: [
      "Downtown Sarasota",
      "Siesta Key",
      "Lido Key",
      "Lakewood Ranch",
      "Bradenton",
      "Longboat Key",
      "Venice",
    ],
    localAttractions: [
      "Siesta Key Beach",
      "Ringling Museum",
      "St. Armands Circle",
      "Marie Selby Botanical Gardens",
      "Myakka River State Park",
    ],
    travelUseCases: [
      {
        title: "Seasonal stays",
        description:
          "Snowbirds and winter residents often choose monthly rentals instead of buying or relying on rideshare.",
      },
      {
        title: "Beach trips",
        description:
          "Convertibles and compact SUVs for Siesta Key, Lido Key, and Anna Maria Island day trips.",
      },
      {
        title: "Airport arrivals",
        description:
          "SRQ is a convenient gateway — pick up near the airport and head straight to the coast.",
      },
      {
        title: "Monthly rentals",
        description:
          "Extended stays for retirees, remote workers, and insurance replacement while your car is in the shop.",
      },
      {
        title: "Family rentals",
        description:
          "Minivans and SUVs for multi-generational visits and golf-and-beach vacations.",
      },
    ],
    pickupOptions: ["SRQ airport pickup", "Local pickup", "Hotel delivery", "Address delivery"],
    deliveryAvailable: true,
    monthlyRentalAvailable: true,
    latitude: 27.3364,
    longitude: -82.5307,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    faqs: [
      {
        question: "Can I rent monthly in Sarasota?",
        answer:
          "Yes. Monthly rentals are popular for seasonal residents. Rates and terms are shown before you confirm.",
      },
      {
        question: "Is SRQ airport pickup available?",
        answer:
          "Select vehicles offer pickup near Sarasota Bradenton International Airport. Check each listing for details.",
      },
      {
        question: "What cars are best for Siesta Key?",
        answer:
          "Convertibles and small SUVs are easy to park and great for beach gear. Search by type and dates.",
      },
      {
        question: "Can I get delivery to Longboat Key or Lakewood Ranch?",
        answer:
          "Delivery zones vary by vehicle. Eligible addresses and fees appear during booking.",
      },
      {
        question: "Are convertibles available year-round?",
        answer:
          "Convertible inventory fluctuates by season. Search your dates to see current availability.",
      },
    ],
    internalLinks: [
      { href: "/monthly-rentals", label: "Monthly rentals in Sarasota" },
      { href: "/how-it-works", label: "How Go works" },
      { href: "/locations/tampa", label: "Go Tampa" },
      { href: "/search?type=convertible&location=sarasota", label: "Convertible rentals in Sarasota" },
    ],
  },
];

export function getLocationContent(slug: string): LocationContent | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}
