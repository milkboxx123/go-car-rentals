import type { Metadata } from "next";

import { SearchPageClient } from "./search-page-client";

export const metadata: Metadata = {
  title: "Search Vehicles — Go Car Rentals",
  description:
    "Browse available cars, SUVs, trucks, and luxury vehicles with airport pickup and delivery.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}
