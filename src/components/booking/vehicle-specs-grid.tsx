import {
  Car,
  Fuel,
  Gauge,
  Settings2,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types";

export interface VehicleSpecsGridProps {
  vehicle: Vehicle;
  className?: string;
}

export function VehicleSpecsGrid({ vehicle, className }: VehicleSpecsGridProps) {
  const specs = [
    {
      icon: Users,
      label: "Seats",
      value: `${vehicle.seats} passengers`,
    },
    {
      icon: Car,
      label: "Type",
      value: vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1),
    },
    {
      icon: Settings2,
      label: "Transmission",
      value:
        vehicle.transmission.charAt(0).toUpperCase() +
        vehicle.transmission.slice(1),
    },
    {
      icon: Fuel,
      label: "Fuel",
      value:
        vehicle.fuelType === "plug-in-hybrid"
          ? "Plug-in hybrid"
          : vehicle.fuelType.charAt(0).toUpperCase() +
            vehicle.fuelType.slice(1),
    },
    vehicle.mpg
      ? {
          icon: Gauge,
          label: "MPG",
          value: `${vehicle.mpg} combined`,
        }
      : vehicle.electricRange
        ? {
            icon: Zap,
            label: "Range",
            value: `${vehicle.electricRange} mi`,
          }
        : null,
    {
      icon: Gauge,
      label: "Mileage allowance",
      value: `${vehicle.mileageAllowance} mi/day`,
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-start gap-3 rounded-lg border border-go-border bg-go-paper p-4"
        >
          <spec.icon
            className="mt-0.5 size-5 shrink-0 text-go-gold-dark"
            aria-hidden="true"
          />
          <div>
            <p className="text-caption text-go-muted">{spec.label}</p>
            <p className="font-semibold text-go-ink">{spec.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
