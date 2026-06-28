import Image from "next/image";

import { SearchPanel } from "./search-panel";
import { Badge } from "@/components/ui/badge";
import type { Location } from "@/types";
import { cn } from "@/lib/utils";

export interface LocationLandingHeroProps {
  location: Location;
  vehicleCount?: number;
  className?: string;
}

export function LocationLandingHero({
  location,
  vehicleCount,
  className,
}: LocationLandingHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src={location.imageUrl}
          alt={`${location.city}, ${location.state}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-go-ink/80 via-go-ink/50 to-go-ink/30" />
      </div>

      <div className="container-marketing relative py-16 sm:py-20">
        <div className="max-w-2xl">
          <Badge variant="airport" className="mb-4">
            {location.airport.code} · {location.airport.name}
          </Badge>
          <h1 className="text-heading-xl font-bold text-go-paper sm:text-display-md">
            Car rentals in {location.city}, {location.state}
          </h1>
          <p className="mt-3 text-body-lg text-go-paper/85">
            {location.name} serves {location.region} with airport pickup
            {location.deliveryAvailable ? " and delivery" : ""}.
            {vehicleCount !== undefined && (
              <> Browse {vehicleCount} vehicles ready to book.</>
            )}
          </p>
        </div>

        <div className="mt-8 max-w-3xl">
          <SearchPanel
            variant="hero"
            values={{ location: location.slug }}
          />
        </div>
      </div>
    </section>
  );
}
