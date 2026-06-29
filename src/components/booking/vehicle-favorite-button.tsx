"use client";

import { Heart } from "lucide-react";

import { useFavorites } from "@/components/booking/favorites-provider";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

export interface VehicleFavoriteButtonProps {
  vehicleId: string;
  className?: string;
}

export function VehicleFavoriteButton({
  vehicleId,
  className,
}: VehicleFavoriteButtonProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.has(vehicleId);

  return (
    <IconButton
      type="button"
      variant="favorite"
      size="sm"
      active={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn(className)}
      onClick={() => void toggleFavorite(vehicleId)}
    >
      <Heart className={cn(isFavorite && "fill-current")} aria-hidden="true" />
    </IconButton>
  );
}
