import { LocationCard, type LocationCardProps } from "./location-card";
import { cn } from "@/lib/utils";

export interface LocationGridProps {
  locations: LocationCardProps[];
  className?: string;
}

export function LocationGrid({ locations, className }: LocationGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {locations.map((location) => (
        <LocationCard key={location.href} {...location} />
      ))}
    </div>
  );
}
