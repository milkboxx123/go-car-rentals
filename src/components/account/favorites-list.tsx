"use client";

import * as React from "react";

import { FavoritesEmptyState } from "@/components/account/favorites-empty-state";
import { VehicleCard } from "@/components/booking/vehicle-card";
import { useFavorites } from "@/components/booking/favorites-provider";
import type { Vehicle } from "@/types";

export interface FavoritesListProps {
  vehicles: Vehicle[];
}

export function FavoritesList({ vehicles: initialVehicles }: FavoritesListProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [vehicles, setVehicles] = React.useState(initialVehicles);

  React.useEffect(() => {
    setVehicles(initialVehicles);
  }, [initialVehicles]);

  React.useEffect(() => {
    setVehicles((current) =>
      current.filter((vehicle) => favoriteIds.has(vehicle.id))
    );
  }, [favoriteIds]);

  if (vehicles.length === 0) {
    return <FavoritesEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          href={`/vehicles/${vehicle.id}`}
          isFavorite={favoriteIds.has(vehicle.id)}
          onFavoriteToggle={() => void toggleFavorite(vehicle.id)}
        />
      ))}
    </div>
  );
}
