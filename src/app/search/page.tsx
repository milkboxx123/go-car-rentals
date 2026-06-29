import type { Metadata } from "next";
import { Suspense } from "react";

import { Footer } from "@/components/layout";
import { AppHeaderShell } from "@/components/layout/app-header-shell";
import { SearchPageClient } from "./search-page-client";

export const metadata: Metadata = {
  title: "Search Vehicles — Go Car Rentals",
  description:
    "Browse available cars, SUVs, trucks, and luxury vehicles with airport pickup and delivery.",
};

export default function SearchPage() {
  return (
    <>
      <AppHeaderShell className="bg-go-paper" />
      <Suspense fallback={null}>
        <SearchPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
