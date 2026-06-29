"use client";

import { VehicleCard } from "@/components/booking/vehicle-card";
import { useFavorites } from "@/components/booking/favorites-provider";
import type { Vehicle } from "@/types";

export interface SimilarVehiclesGridProps {
  vehicles: Vehicle[];
  showTripTotal?: boolean;
}

export function SimilarVehiclesGrid({
  vehicles,
  showTripTotal = true,
}: SimilarVehiclesGridProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          href={`/vehicles/${vehicle.id}`}
          showTripTotal={showTripTotal}
          isFavorite={favoriteIds.has(vehicle.id)}
          onFavoriteToggle={() => void toggleFavorite(vehicle.id)}
        />
      ))}
    </div>
  );
}
