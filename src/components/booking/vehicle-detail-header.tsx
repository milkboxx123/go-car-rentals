import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatVehicleName } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Vehicle, VehicleBadgeType } from "@/types";

const badgeVariantMap: Record<
  VehicleBadgeType,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  new: "new",
  verified: "verified",
  airport: "airport",
  delivery: "delivery",
  monthly: "monthly",
  luxury: "luxury",
  electric: "electric",
  discount: "gold",
};

export interface VehicleDetailHeaderProps {
  vehicle: Vehicle;
  className?: string;
}

export function VehicleDetailHeader({
  vehicle,
  className,
}: VehicleDetailHeaderProps) {
  const name = formatVehicleName(vehicle);

  return (
    <header className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {vehicle.badges.map((badge) => (
          <Badge
            key={`${badge.type}-${badge.label}`}
            variant={badgeVariantMap[badge.type] ?? "default"}
          >
            {badge.label}
          </Badge>
        ))}
      </div>

      <h1 className="text-heading-lg font-bold text-go-ink sm:text-heading-xl">
        {name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-body-md text-go-muted">
        <span className="flex items-center gap-1">
          <Star
            className="size-4 fill-go-gold text-go-gold"
            aria-hidden="true"
          />
          <span className="font-semibold text-go-ink">{vehicle.rating}</span>
          <span>({vehicle.reviewCount} reviews)</span>
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="size-4" aria-hidden="true" />
          {vehicle.location}
        </span>
      </div>

      {vehicle.description && (
        <p className="max-w-3xl text-body-md text-go-muted">
          {vehicle.description}
        </p>
      )}
    </header>
  );
}
