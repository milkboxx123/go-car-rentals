import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "rev-001",
    vehicleId: "veh-rav4-2024",
    locationId: "loc-tampa",
    author: {
      name: "Sarah Mitchell",
      initials: "SM",
    },
    rating: 5,
    title: "Perfect airport pickup",
    content:
      "Picked up the RAV4 right at TPA arrivals. Car was spotless, full tank, and the hybrid saved us money on gas driving around Tampa Bay all week.",
    date: "2026-06-16",
    tripType: "family",
    verified: true,
  },
  {
    id: "rev-002",
    vehicleId: "veh-model-y-2023",
    locationId: "loc-miami",
    author: {
      name: "James Chen",
      initials: "JC",
    },
    rating: 5,
    title: "Smooth electric ride in Miami",
    content:
      "The Model Y was delivered to our hotel within an hour. Quiet, fast, and the charging instructions were crystal clear. Best rental experience I've had in South Florida.",
    date: "2026-06-12",
    tripType: "business",
    verified: true,
  },
  {
    id: "rev-003",
    vehicleId: "veh-bmw-3-2023",
    locationId: "loc-boston",
    author: {
      name: "Emily Rodriguez",
      initials: "ER",
    },
    rating: 5,
    title: "Great for Logan pickups",
    content:
      "Used the 3 Series for a client visit. Curbside pickup at Logan was seamless and the car felt brand new. Will book again for Boston trips.",
    date: "2026-05-28",
    tripType: "business",
    verified: true,
  },
  {
    id: "rev-004",
    vehicleId: "veh-tahoe-2024",
    locationId: "loc-orlando",
    author: {
      name: "Michael Thompson",
      initials: "MT",
    },
    rating: 5,
    title: "Room for the whole family",
    content:
      "Rented the Tahoe for a week at the parks. Third row fit two kids comfortably and we had plenty of cargo space for strollers and bags. Airport pickup was easy to find.",
    date: "2026-06-08",
    tripType: "family",
    verified: true,
  },
  {
    id: "rev-005",
    vehicleId: "veh-camry-2024",
    locationId: "loc-tampa",
    author: {
      name: "Daniel Kim",
      initials: "DK",
    },
    rating: 5,
    title: "Reliable and affordable",
    content:
      "Exactly what I needed for a quick Tampa business trip. Camry was clean, efficient, and the daily rate beat traditional rental counters by a wide margin.",
    date: "2026-06-20",
    tripType: "business",
    verified: true,
  },
  {
    id: "rev-006",
    vehicleId: "veh-escalade-2023",
    locationId: "loc-miami",
    author: {
      name: "Patricia Moore",
      initials: "PM",
    },
    rating: 5,
    title: "VIP arrival done right",
    content:
      "Booked the Escalade for a special occasion weekend. Hotel delivery was on time, the vehicle was immaculate, and the concierge-style service felt genuinely premium.",
    date: "2026-05-15",
    tripType: "leisure",
    verified: true,
  },
  {
    id: "rev-007",
    vehicleId: "veh-pacifica-2022",
    locationId: "loc-tampa",
    author: {
      name: "Jennifer Walsh",
      initials: "JW",
    },
    rating: 4,
    title: "Great minivan for families",
    content:
      "Pacifica had plenty of room for car seats and luggage. Delivery to our Airbnb was convenient. Only wish the pickup time window was a bit more flexible.",
    date: "2026-05-30",
    tripType: "family",
    verified: true,
  },
  {
    id: "rev-008",
    vehicleId: "veh-wrangler-2022",
    locationId: "loc-sarasota",
    author: {
      name: "Chris Navarro",
      initials: "CN",
    },
    rating: 5,
    title: "Beach weekend essential",
    content:
      "Took the Wrangler down to Siesta Key with the top off. Fun to drive, easy pickup at SRQ, and Go's team sent great local driving tips before the trip.",
    date: "2026-06-02",
    tripType: "leisure",
    verified: true,
  },
  {
    id: "rev-009",
    vehicleId: "veh-glc-2023",
    locationId: "loc-miami",
    author: {
      name: "Alexandra Reed",
      initials: "AR",
    },
    rating: 5,
    title: "Luxury without the hassle",
    content:
      "GLC was gorgeous inside and out. MIA airport pickup was well-marked and the return process took less than five minutes. Transparent pricing with no surprise fees.",
    date: "2026-06-10",
    tripType: "airport",
    verified: true,
  },
  {
    id: "rev-010",
    vehicleId: "veh-bronco-2024",
    locationId: "loc-orlando",
    author: {
      name: "Tyler Brooks",
      initials: "TB",
    },
    rating: 4,
    title: "Adventure-ready SUV",
    content:
      "Bronco turned heads everywhere in Orlando. Delivery to our vacation rental was smooth. Solid vehicle — just note it's a taller ride for parking garages.",
    date: "2026-06-18",
    tripType: "leisure",
    verified: true,
  },
  {
    id: "rev-011",
    vehicleId: "veh-rav4-2024",
    locationId: "loc-tampa",
    author: {
      name: "Maria Gonzalez",
      initials: "MG",
    },
    rating: 5,
    title: "Skip the counter",
    content:
      "Love that I could book the exact car I wanted instead of getting whatever was left on the lot. RAV4 hybrid was perfect for our Tampa to Sarasota day trip.",
    date: "2026-05-22",
    tripType: "leisure",
    verified: true,
  },
  {
    id: "rev-012",
    vehicleId: "veh-camry-2024",
    locationId: "loc-tampa",
    author: {
      name: "Kevin O'Brien",
      initials: "KO",
    },
    rating: 4,
    title: "Easy airport rental",
    content:
      "Straightforward TPA pickup, car was ready when I landed. Camry handled highway miles comfortably. Go support answered my question within minutes via text.",
    date: "2026-06-25",
    tripType: "airport",
    verified: true,
  },
];

export const reviewSummary = {
  averageRating: 4.9,
  totalReviews: reviews.length,
  ratingDistribution: {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  },
};

export function getReviewsByVehicle(vehicleId: string): Review[] {
  return reviews.filter((review) => review.vehicleId === vehicleId);
}

export function getReviewsByLocation(locationId: string): Review[] {
  return reviews.filter((review) => review.locationId === locationId);
}
