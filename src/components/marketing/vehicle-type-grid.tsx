import * as React from "react";
import {
  Car,
  Crown,
  PlugZap,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import { Link } from "@/components/ui/link";
import { VEHICLE_TYPE_OPTIONS } from "@/mock/filters";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  car: <Car className="size-6" aria-hidden="true" />,
  suv: <Truck className="size-6" aria-hidden="true" />,
  truck: <Truck className="size-6" aria-hidden="true" />,
  minivan: <Users className="size-6" aria-hidden="true" />,
  luxury: <Crown className="size-6" aria-hidden="true" />,
  electric: <PlugZap className="size-6" aria-hidden="true" />,
  convertible: <Zap className="size-6" aria-hidden="true" />,
  van: <Users className="size-6" aria-hidden="true" />,
};

export interface VehicleTypeGridProps {
  title?: string;
  className?: string;
}

export function VehicleTypeGrid({
  title = "Browse by vehicle type",
  className,
}: VehicleTypeGridProps) {
  const types = VEHICLE_TYPE_OPTIONS.filter((t) => (t.count ?? 0) > 0);

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <h2 className="mb-8 text-heading-lg font-bold text-go-ink">{title}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {types.map((type) => (
            <Link
              key={type.value}
              href={`/search?type=${type.value}`}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-lg border border-go-border",
                "bg-go-paper p-6 text-center shadow-card transition-shadow hover:shadow-md"
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-go-muted-light text-go-ink transition-colors group-hover:bg-go-gold/30">
                {typeIcons[type.value] ?? <Car className="size-6" />}
              </span>
              <span className="font-semibold text-go-ink">{type.label}</span>
              {type.count !== undefined && (
                <span className="text-body-sm text-go-muted">
                  {type.count} available
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
