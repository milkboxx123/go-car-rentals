import { getLocationContent } from "@/content/locations";
import type { FaqItem } from "@/lib/structured-data";

export const locationsIndexFaqs: FaqItem[] = [
  {
    question: "Where is Go available?",
    answer:
      "Go currently serves Tampa, Boston, Miami, Orlando, and Sarasota, with more cities planned. Visit our locations page for the latest cities and airport coverage.",
  },
  {
    question: "Can I rent a car at the airport?",
    answer:
      "Many Go locations support airport pickup at major airports like TPA, BOS, MIA, MCO, and SRQ. Availability varies by vehicle — details are shown before you book.",
  },
  {
    question: "Does Go offer monthly rentals?",
    answer:
      "Yes. Monthly and long-term rentals are available in select cities. Visit our monthly rentals page to learn more and search by location.",
  },
  {
    question: "Can I choose the exact car?",
    answer:
      "Go shows the specific vehicle you are booking, including photos and features, so you know what you are getting before confirmation.",
  },
  {
    question: "Are more cities being added?",
    answer:
      "Go is expanding location by location. Check back on our locations page or sign up for updates to hear when new cities launch.",
  },
];

export const monthlyRentalsFaqs: FaqItem[] = [
  {
    question: "Can I rent a car for a month?",
    answer:
      "Yes. Go offers monthly rentals on select vehicles in participating cities. Search by location and choose a 30+ day trip length.",
  },
  {
    question: "Are monthly rentals cheaper than daily rentals?",
    answer:
      "Monthly rates often have a lower effective daily cost than short trips, but pricing depends on vehicle, location, and season. Final pricing is shown before confirmation.",
  },
  {
    question: "Can I extend my monthly rental?",
    answer:
      "Extensions may be available depending on vehicle availability. Contact support or manage your trip in your account when extension options are offered.",
  },
  {
    question: "Is insurance included?",
    answer:
      "Protection options will be shown during booking. Requirements and coverage details vary — review options before you confirm.",
  },
  {
    question: "Can I get airport pickup for a monthly rental?",
    answer:
      "Airport pickup may be available for monthly rentals depending on location and vehicle. Check each listing for pickup options.",
  },
  {
    question: "What vehicles are best for monthly rentals?",
    answer:
      "SUVs, economy sedans, and electric vehicles are popular for long-term use. Families often choose minivans. Search by type and trip length.",
  },
  {
    question: "Is there a mileage limit?",
    answer:
      "Mileage allowances vary by vehicle and rental length. Allowances and overage terms are displayed before checkout.",
  },
];

export const howItWorksFaqs: FaqItem[] = [
  {
    question: "Can I choose the exact car?",
    answer:
      "Yes. Every listing shows the specific vehicle — make, model, photos, and features — so you book what you see.",
  },
  {
    question: "Can I pick up at the airport?",
    answer:
      "Many vehicles support airport pickup. Instructions and meeting points are provided after booking when airport pickup is available.",
  },
  {
    question: "Can the car be delivered?",
    answer:
      "Delivery to hotels, addresses, and other locations may be available. Options and fees vary by city and vehicle.",
  },
  {
    question: "How does monthly rental work?",
    answer:
      "Search with a 30+ day trip length or visit our monthly rentals page. Rates, mileage, and terms are shown before you confirm.",
  },
  {
    question: "What happens if I need to extend?",
    answer:
      "If the vehicle is available, you may be able to extend through your account or by contacting support. Availability is not guaranteed.",
  },
  {
    question: "What if the vehicle is unavailable?",
    answer:
      "If a vehicle becomes unavailable before pickup, we will contact you with alternatives. Refund policies depend on timing and rental terms.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Pet policies vary by vehicle and owner. Check the listing details or contact support before booking with a pet.",
  },
  {
    question: "Is smoking allowed?",
    answer:
      "Smoking is generally not permitted in Go vehicles. Violations may result in cleaning fees per rental policies.",
  },
];

export const contactFaqs: FaqItem[] = [
  {
    question: "How quickly will I hear back?",
    answer:
      "We aim to respond to contact form submissions within one business day. Urgent trip issues during an active rental should use the phone number listed on this page.",
  },
  {
    question: "Can I change or extend my trip through contact support?",
    answer:
      "Yes. Select “Change or extend a trip” as your topic. Extensions depend on vehicle availability — you may also manage changes from your account when options are offered.",
  },
  {
    question: "I have a booking question before I rent. What should I include?",
    answer:
      "Share your pickup city, travel dates, and any airport or delivery preferences. If you already have a reservation, include your confirmation details if available.",
  },
  {
    question: "Should I use the contact form or my account messages?",
    answer:
      "If you are signed in and need help with an active or upcoming trip, account messages keep everything tied to your rental. The contact form works for anyone, including pre-booking questions.",
  },
  {
    question: "What if I need help at the airport or during my trip?",
    answer:
      "For same-day pickup or roadside issues, call the support number on this page. Emergency contact details are also provided in your booking confirmation when applicable.",
  },
];

export const listWithUsFaqs: FaqItem[] = [
  {
    question: "Can I list one vehicle with Go?",
    answer:
      "Yes. Individual vehicle owners can submit a partner inquiry. We review fit, location, and vehicle condition before onboarding.",
  },
  {
    question: "Can fleet owners partner with Go?",
    answer:
      "Go works with small fleet operators and local rental businesses. Tell us about your fleet size, location, and vehicle types.",
  },
  {
    question: "Does Go handle bookings?",
    answer:
      "Go provides booking and marketing infrastructure for partner vehicles. Operational details are discussed during partnership review.",
  },
  {
    question: "What types of vehicles are a good fit?",
    answer:
      "Well-maintained cars, SUVs, minivans, trucks, luxury vehicles, and EVs in high-demand markets are strong candidates. Condition and availability matter.",
  },
  {
    question: "Can hotels or properties partner with Go?",
    answer:
      "Yes. Hotels, short-term rentals, and property managers can explore partnership models that support guest transportation.",
  },
  {
    question: "How are partnership terms determined?",
    answer:
      "Terms depend on partnership type, fleet size, location, and operational model. We discuss specifics after reviewing your inquiry.",
  },
  {
    question: "Is Go available in my city?",
    answer:
      "Go is expanding city by city. Submit an inquiry with your location — we prioritize markets with strong rental demand.",
  },
];

export function getLocationFaqs(slug: string): FaqItem[] {
  const location = getLocationContent(slug);
  return location?.faqs ?? [];
}
