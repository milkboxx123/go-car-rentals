import { Car, MapPin, CalendarCheck } from "lucide-react";

import { AccountEmptyState } from "@/components/account/account-empty-state";
import { AccountSectionCard } from "@/components/account/account-section-card";
import { cn } from "@/lib/utils";

const HELPER_CARDS = [
  {
    icon: Car,
    title: "Choose the exact car",
    description: "Browse vehicles by location, dates, and features.",
  },
  {
    icon: MapPin,
    title: "Pick up or request delivery",
    description: "Select local pickup, airport pickup, or delivery.",
  },
  {
    icon: CalendarCheck,
    title: "Manage your trip here",
    description: "View reservations, pickup details, and trip history.",
  },
] as const;

export function TripsEmptyState() {
  return (
    <div className="space-y-6">
      <AccountSectionCard contentClassName="p-0">
        <AccountEmptyState
          icon={<Car className="size-6" aria-hidden="true" />}
          title="No trips yet"
          description="When you book a vehicle, your reservations, pickup instructions, and trip history will appear here."
          primaryAction={{ label: "Browse vehicles", href: "/search" }}
          secondaryAction={{
            label: "How rentals work",
            href: "/how-it-works",
          }}
        />
      </AccountSectionCard>

      <div className="grid gap-4 sm:grid-cols-3">
        {HELPER_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={cn(
                "rounded-2xl border border-go-border bg-go-paper p-5 shadow-card"
              )}
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-go-gold/15 text-go-gold-dark">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-body-sm font-semibold text-go-ink">
                {card.title}
              </h3>
              <p className="mt-1 text-body-sm text-go-muted">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
