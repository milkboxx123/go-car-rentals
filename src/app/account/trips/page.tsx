import type { Metadata } from "next";

import { NoReservations, TripSummaryCard } from "@/components/booking";
import { AppHeader } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reservations } from "@/mock";
import type { ReservationStatus } from "@/types";

export const metadata: Metadata = {
  title: "My Trips — Go Car Rentals",
  description: "View upcoming, active, and past car rental reservations.",
};

const UPCOMING_STATUSES: ReservationStatus[] = ["confirmed", "pending"];
const ACTIVE_STATUSES: ReservationStatus[] = ["active"];
const PAST_STATUSES: ReservationStatus[] = [
  "completed",
  "cancelled",
  "refunded",
  "no-show",
];

function filterByStatuses(statuses: ReservationStatus[]) {
  return reservations.filter((reservation) => statuses.includes(reservation.status));
}

function TripList({ items }: { items: typeof reservations }) {
  if (items.length === 0) {
    return <NoReservations />;
  }

  return (
    <div className="space-y-4">
      {items.map((reservation) => (
        <TripSummaryCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}

export default function AccountTripsPage() {
  const upcoming = filterByStatuses(UPCOMING_STATUSES);
  const active = filterByStatuses(ACTIVE_STATUSES);
  const past = filterByStatuses(PAST_STATUSES);

  return (
    <div className="min-h-screen bg-go-cream">
      <AppHeader userName="Sarah Mitchell" userInitials="SM" />

      <div className="container-marketing py-8">
        <header className="mb-6">
          <h1 className="text-heading-lg font-bold text-go-ink">My trips</h1>
          <p className="mt-1 text-body-md text-go-muted">
            Manage upcoming reservations and review past rentals.
          </p>
        </header>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({active.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({past.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <TripList items={upcoming} />
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            <TripList items={active} />
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <TripList items={past} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
