export const locationsIndexContent = {
  hero: {
    eyebrow: "Locations",
    title: "Car rental locations built around how you travel",
    subtitle: "Find Go rentals by city, airport, and trip type.",
    backgroundImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
    primaryCta: { href: "/locations", label: "Find your city" },
  },
  airportCallout: {
    title: "Airport pickup and delivery",
    description:
      "Arrive and drive. Go locations support airport pickup at major hubs and delivery to hotels and addresses where available.",
  },
  monthlyCallout: {
    title: "Need a car for 30+ days?",
    description:
      "Monthly rentals offer flexible long-term transportation for work, relocation, and seasonal stays.",
    href: "/monthly-rentals",
    label: "Explore monthly rentals",
  },
  howItWorksSteps: [
    { step: 1, title: "Search", description: "Enter your city, airport, and travel dates." },
    { step: 2, title: "Choose your car", description: "Pick the exact vehicle that fits your trip." },
    { step: 3, title: "Pick up or get delivery", description: "Airport, local pickup, or delivery where offered." },
    { step: 4, title: "Drive", description: "Hit the road with clear pricing and support." },
  ],
} as const;

export const monthlyRentalsContent = {
  hero: {
    eyebrow: "Monthly rentals",
    title: "Monthly car rentals made simple",
    subtitle:
      "Flexible long-term rentals for work assignments, extended stays, seasonal travel, and temporary transportation.",
    backgroundImage:
      "https://images.unsplash.com/photo-1485291571159-792bcaa1ff02?w=1600&q=80",
    primaryCta: { href: "/search", label: "Search monthly rentals" },
  },
  valueProps: [
    { title: "Lower effective daily rates", description: "Longer trips often cost less per day than short rentals." },
    { title: "Flexible extensions", description: "Extend when availability allows — subject to vehicle schedule." },
    { title: "Exact vehicle selection", description: "Book the specific car you see, not just a category." },
    { title: "Airport and local pickup", description: "Pickup options vary by city and vehicle." },
    { title: "SUVs, sedans, luxury, and family vehicles", description: "Find the right fit for your monthly needs." },
    { title: "Local support", description: "Get help before, during, and after your rental." },
  ],
  audiences: [
    { title: "Business travelers", description: "Temporary assignments without a long-term lease." },
    { title: "Travel nurses / contract workers", description: "Reliable transportation for multi-week placements." },
    { title: "Families between vehicles", description: "Bridge the gap while shopping or waiting on repairs." },
    { title: "Insurance replacement", description: "Stay mobile while your car is in the shop." },
    { title: "Seasonal residents", description: "Winter or summer stays without buying a second car." },
    { title: "Extended vacations", description: "Explore at your own pace for a month or more." },
    { title: "Students / college visits", description: "Parents and students needing wheels near campus." },
    { title: "Business fleet overflow", description: "Extra capacity when your fleet is at capacity." },
  ],
  pricingPoints: [
    "Base monthly rate shown before confirmation",
    "Mileage allowance varies by vehicle",
    "Optional delivery fees where available",
    "Protection options shown during booking",
    "Extensions subject to availability",
    "Taxes and fees itemized at checkout",
  ],
  comparison: {
    headers: ["", "Go monthly rental", "Traditional rental counter", "Rideshare only"],
    rows: [
      ["Exact vehicle choice", "Yes — book the specific car", "Often category-based", "No — depends on availability"],
      ["Long-term pricing", "Monthly rates on select vehicles", "May require rebooking weekly", "Daily costs add up quickly"],
      ["Airport pickup", "Available on many vehicles", "Counter queues common", "Pickup zones vary"],
      ["Delivery options", "Available in select cities", "Limited at many counters", "Not applicable"],
      ["Best for", "30+ day flexible needs", "Short standardized trips", "Occasional short trips"],
    ],
  },
} as const;

export const howItWorksContent = {
  hero: {
    eyebrow: "How it works",
    title: "How Go car rentals work",
    subtitle:
      "Search by location and dates, choose the exact car you want, and pick it up or request delivery.",
    backgroundImage:
      "https://images.unsplash.com/photo-1568605114967-a813c4e4f1b2?w=1600&q=80",
    primaryCta: { href: "/search", label: "Find a car" },
  },
  steps: [
    { step: 1, title: "Search by location and dates", description: "Enter your city, airport, pickup, and return dates." },
    { step: 2, title: "Choose the exact car", description: "Browse real vehicles with photos, features, and pricing." },
    { step: 3, title: "Select pickup or delivery", description: "Airport, local lot, hotel, or address — where offered." },
    { step: 4, title: "Review pricing and protection", description: "See rates, fees, mileage, and protection options before paying." },
    { step: 5, title: "Confirm your trip", description: "Book with confidence — final total shown before confirmation." },
    { step: 6, title: "Pick up, unlock, and drive", description: "Follow pickup instructions and enjoy your trip." },
  ],
  requirements: [
    { title: "Valid driver's license", description: "A current license in good standing is required." },
    { title: "Payment method", description: "A valid card or approved payment method for the rental." },
    { title: "Minimum age", description: "Age requirements vary by vehicle and location. Shown at checkout." },
    { title: "Insurance / protection", description: "Protection options will be shown during booking." },
    { title: "Identity verification", description: "Verification steps may be required before pickup." },
  ],
  pickupOptions: [
    { title: "Local pickup", description: "Meet at a designated pickup location near you." },
    { title: "Airport pickup", description: "Arrive and get your car near major airports." },
    { title: "Delivery to address", description: "Have the vehicle brought to your home or office." },
    { title: "Hotel delivery", description: "Start your trip from the hotel lobby or valet area." },
    { title: "Custom delivery zones", description: "Delivery availability varies by city and vehicle." },
  ],
  pricingItems: [
    "Daily or monthly rate based on trip length",
    "Trip length and calendar pricing",
    "Delivery fee when applicable",
    "Protection plan options",
    "Taxes and local fees",
    "Promo codes where eligible",
    "Final total before confirmation",
  ],
  supportPhases: [
    { title: "Before your trip", description: "Questions about vehicle, pickup, or changes to your booking." },
    { title: "During your trip", description: "Roadside help and trip support when you need it." },
    { title: "After your trip", description: "Returns, receipts, and follow-up on any issues." },
    { title: "Emergencies", description: "Emergency contact details provided after booking." },
  ],
} as const;

export const contactContent = {
  hero: {
    eyebrow: "Support",
    title: "Contact Go",
    subtitle:
      "Questions about a booking, pickup, or your account? Reach our support team by email, phone, or the form below.",
  },
  hours: {
    title: "Support hours",
    description: "Mon–Fri, 8am–8pm ET. We respond to form submissions within one business day.",
  },
  formIntro: {
    title: "Send us a message",
    description:
      "Tell us what you need help with and we will get back to you as soon as possible.",
  },
  accountNote: {
    text: "Already have an account? For trip-specific questions, you can also message support from",
    href: "/account/messages",
    label: "your messages",
  },
} as const;

export const listWithUsContent = {
  hero: {
    eyebrow: "Partnerships",
    title: "List or partner with Go",
    subtitle:
      "Have vehicles, local fleet capacity, or a property that could support car rentals? Tell us about it.",
    backgroundImage:
      "https://images.unsplash.com/photo-1493238782740-ac1d42e2b240?w=1600&q=80",
    primaryCta: { href: "#partner-form", label: "Start partner inquiry" },
  },
  audiences: [
    { title: "Individual vehicle owners", description: "List a well-maintained vehicle in a Go market." },
    { title: "Small fleet owners", description: "Add local fleet capacity under the Go brand." },
    { title: "Dealerships", description: "Put idle inventory to work with rental demand." },
    { title: "Auto shops", description: "Offer loaner or rental vehicles through a partner channel." },
    { title: "Hotels and short-term rental operators", description: "Support guest transportation needs." },
    { title: "Property managers", description: "Add car access as an amenity for residents or guests." },
    { title: "Local transportation businesses", description: "Expand into rental with Go infrastructure." },
    { title: "Investors with fleet opportunities", description: "Explore strategic fleet partnerships." },
  ],
  partnershipModels: [
    { title: "List a vehicle", description: "Add one or more vehicles to the Go marketplace in your city." },
    { title: "Add a fleet location", description: "Operate a local pickup point under the Go brand." },
    { title: "Hotel or property partnership", description: "Guest-focused rental programs at your property." },
    { title: "Airport-area partnership", description: "Serve travelers arriving at nearby airports." },
    { title: "Maintenance / operations partner", description: "Support fleet readiness and vehicle care." },
    { title: "Strategic local partner", description: "Custom partnerships for high-demand markets." },
  ],
  whyPartner: [
    { title: "Local brand strategy", description: "Go Tampa, Go Boston — location brands renters trust." },
    { title: "Booking and marketing infrastructure", description: "Search, checkout, and discovery built for you." },
    { title: "Operational support", description: "Tools and processes to help partners launch." },
    { title: "Location-based demand", description: "Capture airport, monthly, and local rental intent." },
    { title: "Fleet visibility", description: "Showcase vehicles to travelers searching by city." },
    { title: "Potential recurring revenue", description: "Terms vary — discussed during partnership review." },
  ],
  processSteps: [
    { step: 1, title: "Submit inquiry", description: "Tell us about you, your vehicles, and your market." },
    { step: 2, title: "Share details", description: "Vehicle types, fleet size, and operating location." },
    { step: 3, title: "Review fit", description: "We assess market demand and operational readiness." },
    { step: 4, title: "Discuss terms", description: "Partnership structure tailored to your model." },
    { step: 5, title: "Onboard", description: "Add vehicles or locations to the Go platform." },
    { step: 6, title: "Launch", description: "Start receiving bookings in your market." },
  ],
} as const;
